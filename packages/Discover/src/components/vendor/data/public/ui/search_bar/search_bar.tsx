/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { compact } from "lodash";
import classNames from "classnames";
import React, { Component } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { get, isEqual, sortBy } from "lodash";

import { withKibana, KibanaReactContextValue } from "../../../../react/public";

import QueryBarTopRow from "../query_string_input/query_bar_top_row";
import {
  TimeHistoryContract,
} from "../../query";
import { IDataPluginServices } from "../../types";
import { TimeRange, Query, Filter, IIndexPattern } from "../../../common";
import { FilterBar } from "../filter_bar/filter_bar";
import IndexPatternSelect from "@/components/IndexPatternSelect";
import FilterActions from "../filter_bar/filter_actions";
import { QuerySuggestion, QuerySuggestionGetFnArgs } from "../../autocomplete/providers/query_suggestion_provider";

interface SearchBarInjectedDeps {
  kibana: KibanaReactContextValue<IDataPluginServices>;
  intl: InjectedIntl;
  timeHistory: TimeHistoryContract;
  // Filter bar
  onFiltersUpdated?: (filters: Filter[]) => void;
  // Autorefresh
  onRefreshChange?: (options: {
    isPaused: boolean;
    refreshInterval: number;
  }) => void;
}

export interface SearchBarOwnProps {
  selectedIndexPattern: IIndexPattern;
  indexPatterns?: IIndexPattern[];
  isLoading?: boolean;
  screenTitle?: string;
  dataTestSubj?: string;
  // Togglers
  showQueryBar?: boolean;
  showQueryInput?: boolean;
  showFilterBar?: boolean;
  showDatePicker?: boolean;
  showAutoRefreshOnly?: boolean;
  filters?: Filter[];
  // Date picker
  isRefreshPaused?: boolean;
  refreshInterval?: number;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  // Query bar - should be in SearchBarInjectedDeps
  query?: Query;
  // Show when user has privileges to save
  showSaveQuery?: boolean;
  onQueryChange?: (payload: { dateRange: TimeRange; query?: Query }) => void;
  onQuerySubmit?: (
    payload: { dateRange: TimeRange; query?: Query },
    isUpdate?: boolean
  ) => void;
  // User has saved the current state as a saved query
  onRefresh?: (payload: { dateRange: TimeRange }) => void;
  indicateNoData?: boolean;
  theme?: string;
}

export type SearchBarProps = SearchBarOwnProps & SearchBarInjectedDeps;

interface State {
  isFiltersVisible: boolean;
  showSaveQueryModal: boolean;
  showSaveNewQueryModal: boolean;
  currentProps?: SearchBarProps;
  query?: Query;
  dateRangeFrom: string;
  dateRangeTo: string;
}

class SearchBarUI extends Component<SearchBarProps, State> {
  public static defaultProps = {
    showQueryBar: true,
    showFilterBar: true,
    showDatePicker: true,
    showAutoRefreshOnly: false,
  };

  public filterBarRef: Element | null = null;
  public filterBarWrapperRef: Element | null = null;

  public static getDerivedStateFromProps(
    nextProps: SearchBarProps,
    prevState: State
  ) {
    if (isEqual(prevState.currentProps, nextProps)) {
      return null;
    }

    let nextQuery = null;
    if (
      nextProps.query &&
      nextProps.query.query !== get(prevState, "currentProps.query.query")
    ) {
      nextQuery = {
        query: nextProps.query.query,
        language: nextProps.query.language,
      };
    } else if (
      nextProps.query &&
      prevState.query &&
      nextProps.query.language !== prevState.query.language
    ) {
      nextQuery = {
        query: "",
        language: nextProps.query.language,
      };
    }

    let nextDateRange = null;
    if (
      nextProps.dateRangeFrom !==
        get(prevState, "currentProps.dateRangeFrom") ||
      nextProps.dateRangeTo !== get(prevState, "currentProps.dateRangeTo")
    ) {
      nextDateRange = {
        dateRangeFrom: nextProps.dateRangeFrom,
        dateRangeTo: nextProps.dateRangeTo,
      };
    }

    const nextState: any = {
      currentProps: nextProps,
    };
    if (nextQuery) {
      nextState.query = nextQuery;
    }
    if (nextDateRange) {
      nextState.dateRangeFrom = nextDateRange.dateRangeFrom;
      nextState.dateRangeTo = nextDateRange.dateRangeTo;
    }
    return nextState;
  }

  /*
   Keep the "draft" value in local state until the user actually submits the query. There are a couple advantages:

    1. Each app doesn't have to maintain its own "draft" value if it wants to put off updating the query in app state
    until the user manually submits their changes. Most apps have watches on the query value in app state so we don't
    want to trigger those on every keypress. Also, some apps (e.g. dashboard) already juggle multiple query values,
    each with slightly different semantics and I'd rather not add yet another variable to the mix.

    2. Changes to the local component state won't trigger an Angular digest cycle. Triggering digest cycles on every
    keypress has been a major source of performance issues for us in previous implementations of the query bar.
    See https://github.com/elastic/kibana/issues/14086
  */
  public state = {
    isFiltersVisible: true,
    showSaveQueryModal: false,
    showSaveNewQueryModal: false,
    currentProps: this.props,
    query: this.props.query ? { ...this.props.query } : undefined,
    dateRangeFrom: get(this.props, "dateRangeFrom", ""),
    dateRangeTo: get(this.props, "dateRangeTo", ""),
  };

  public isDirty = () => {
    if (!this.props.showDatePicker && this.state.query && this.props.query) {
      return this.state.query.query !== this.props.query.query;
    }

    return (
      (this.state.query &&
        this.props.query &&
        this.state.query.query !== this.props.query.query) ||
      this.state.dateRangeFrom !== this.props.dateRangeFrom ||
      this.state.dateRangeTo !== this.props.dateRangeTo
    );
  };

  private shouldRenderQueryBar() {
    const showDatePicker =
      this.props.showDatePicker || this.props.showAutoRefreshOnly;
    const showQueryInput =
      this.props.showQueryInput && this.props.indexPatterns && this.state.query;
    return this.props.showQueryBar && (showDatePicker || showQueryInput);
  }

  private shouldRenderFilterBar() {
    return (
      this.props.showFilterBar &&
      this.props.filters &&
      this.props.indexPatterns &&
      compact(this.props.indexPatterns).length > 0
    );
  }

  public setFilterBarHeight = () => {
    requestAnimationFrame(() => {
      const height =
        this.filterBarRef && this.state.isFiltersVisible && this.props.filters && this.props.filters.length > 0
          ? this.filterBarRef.clientHeight
          : 0;
      if (this.filterBarWrapperRef) {
        this.filterBarWrapperRef.setAttribute("style", `height: ${height}px`);
      }
    });
  };

  // member-ordering rules conflict with use-before-declaration rules
  public ro = new ResizeObserver(this.setFilterBarHeight);

  public onInitiateSave = () => {
    this.setState({
      showSaveQueryModal: true,
    });
  };

  public onInitiateSaveNew = () => {
    this.setState({
      showSaveNewQueryModal: true,
    });
  };

  public onQueryBarChange = (queryAndDateRange: {
    dateRange: TimeRange;
    query?: Query;
  }) => {
    this.setState({
      query: queryAndDateRange.query,
      dateRangeFrom: queryAndDateRange.dateRange.from,
      dateRangeTo: queryAndDateRange.dateRange.to,
    });

    if (this.props.onQueryChange) {
      this.props.onQueryChange(queryAndDateRange);
    }
  };

  public onQueryBarSubmit = (queryAndDateRange: {
    dateRange?: TimeRange;
    query?: Query;
  }) => {
    this.setState(
      {
        query: queryAndDateRange.query,
        dateRangeFrom:
          (queryAndDateRange.dateRange && queryAndDateRange.dateRange.from) ||
          this.state.dateRangeFrom,
        dateRangeTo:
          (queryAndDateRange.dateRange && queryAndDateRange.dateRange.to) ||
          this.state.dateRangeTo,
      },
      () => {
        if (this.props.onQuerySubmit) {
          this.props.onQuerySubmit({
            query: this.state.query,
            dateRange: {
              from: this.state.dateRangeFrom,
              to: this.state.dateRangeTo,
            },
          });
        }
      }
    );
  };

  public componentDidMount() {
    if (this.filterBarRef) {
      this.setFilterBarHeight();
      this.ro.observe(this.filterBarRef);
    }
  }

  public componentDidUpdate() {
    if (this.filterBarRef) {
      this.setFilterBarHeight();
      this.ro.unobserve(this.filterBarRef);
    }
  }

  public render() {
    if (!this.props.selectedIndexPattern) {
      return null
    }
    let queryBar;
    if (this.shouldRenderQueryBar()) {
      queryBar = (
        <QueryBarTopRow
          timeHistory={this.props.timeHistory}
          query={this.state.query}
          screenTitle={this.props.screenTitle}
          onSubmit={this.onQueryBarSubmit}
          indexPatterns={this.props.indexPatterns}
          isLoading={this.props.isLoading}
          prepend={null}
          showDatePicker={this.props.showDatePicker}
          dateRangeFrom={this.state.dateRangeFrom}
          dateRangeTo={this.state.dateRangeTo}
          isRefreshPaused={this.props.isRefreshPaused}
          refreshInterval={this.props.refreshInterval}
          showAutoRefreshOnly={this.props.showAutoRefreshOnly}
          showQueryInput={this.props.showQueryInput}
          onRefresh={this.props.onRefresh}
          onRefreshChange={this.props.onRefreshChange}
          onChange={this.onQueryBarChange}
          isDirty={this.isDirty()}
          dataTestSubj={this.props.dataTestSubj}
          indicateNoData={this.props.indicateNoData}
          storage={this.props.storage}
          services={this.props.services}
          renderTimeField={this.props.renderTimeField}
          timefilterUpdateHandler={this.props.timefilterUpdateHandler}
          timeSetting={this.props.timeSetting}
          locale={this.props.locale}
        />
      );
    }

    let filterBar;
    if (this.shouldRenderFilterBar()) {
      filterBar = (
        <FilterBar
          className="globalFilterGroup__filterBar"
          filters={this.props.filters!}
          onFiltersUpdated={this.props.onFiltersUpdated}
          indexPatterns={this.props.indexPatterns!}
          dateRangeFrom={this.state.dateRangeFrom}
          dateRangeTo={this.state.dateRangeTo}
          timeField={this.props.timeSetting?.timeField}
          services={this.props.services}
          theme={this.props.theme}
        />
      );
    }
    
    return (
      <div className="p-8px">
        <div className="flex items-center gap-8px flex-wrap">
          <IndexPatternSelect
            selectedIndexPattern={this.props.selectedIndexPattern}
            onIndexPatternChange={this.props.setIndexPattern}
            indices={this.props.indices}
            locale={this.props.locale}
          />
          <FilterActions
            filters={this.props.filters!}
            onFiltersUpdated={this.props.onFiltersUpdated}
            indexPatterns={this.props.indexPatterns!}
            dateRangeFrom={this.state.dateRangeFrom}
            dateRangeTo={this.state.dateRangeTo}
            timeField={this.props.selectedIndexPattern.timeFieldName}
            services={this.props.services}
            theme={this.props.theme}
          />
          {queryBar}
        </div>
        {filterBar}
      </div>
    );
  }
}

// Needed for React.lazy
// eslint-disable-next-line import/no-default-export
export default withKibana(SearchBarUI);
