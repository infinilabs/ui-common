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

import dateMath from "@elastic/datemath";
import React, { useState } from "react";

import { IIndexPattern, TimeRange, TimeHistoryContract, Query } from "../..";
import { withKibana } from "../../../../react/public";
import QueryStringInputUI from "./query_string_input";
import DatePicker from "@/common/src/DatePicker";
import styles from "./query_bar_top_row.module.less";
import { ArrowRightToLine, RefreshCw } from "lucide-react";
import { Button } from "antd";

const QueryStringInput = withKibana(QueryStringInputUI);

// @internal
export interface QueryBarTopRowProps {
  query?: Query;
  onSubmit: (payload: { dateRange: TimeRange; query?: Query }) => void;
  onChange: (payload: { dateRange: TimeRange; query?: Query }) => void;
  onRefresh?: (payload: { dateRange: TimeRange }) => void;
  dataTestSubj?: string;
  disableAutoFocus?: boolean;
  screenTitle?: string;
  indexPatterns?: Array<IIndexPattern | string>;
  isLoading?: boolean;
  prepend?: React.ReactNode;
  showQueryInput?: boolean;
  showDatePicker?: boolean;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  isRefreshPaused?: boolean;
  refreshInterval?: number;
  showAutoRefreshOnly?: boolean;
  onRefreshChange?: (options: {
    isPaused: boolean;
    refreshInterval: number;
  }) => void;
  isDirty: boolean;
  timeHistory?: TimeHistoryContract;
  indicateNoData?: boolean;
}

// Needed for React.lazy
// eslint-disable-next-line import/no-default-export
export default function QueryBarTopRow(props: QueryBarTopRowProps) {
  const [isDateRangeInvalid, setIsDateRangeInvalid] = useState(false);
  const [isQueryInputFocused, setIsQueryInputFocused] = useState(false);

  // const kibana = useKibana<IDataPluginServices>();
  // const { uiSettings, notifications, storage, appName, docLinks } = kibana.services;
  const { showQueryInput = true, showDatePicker = true, storage } = props;
  const appName = "discover";

  // const kueryQuerySyntaxLink: string = docLinks!.links.query.kueryQuerySyntax;

  const queryLanguage = props.query && props.query.language;
  // const persistedLog: PersistedLog | undefined = React.useMemo(
  //   () =>
  //     queryLanguage && uiSettings && storage && appName
  //       ? getQueryLog(uiSettings!, storage, appName, queryLanguage)
  //       : undefined,
  //   [appName, queryLanguage, uiSettings, storage]
  // );

  function onClickSubmitButton(event: React.MouseEvent<HTMLButtonElement>) {
    // if (persistedLog && props.query) {
    //   persistedLog.add(props.query.query);
    // }
    event.preventDefault();
    onSubmit({ query: props.query, dateRange: getDateRange() });
  }

  function getDateRange() {
    // const defaultTimeSetting = uiSettings!.get(UI_SETTINGS.TIMEPICKER_TIME_DEFAULTS);
    const defaultTimeSetting = {
      from: "",
      to: "",
    };
    return {
      from: props.dateRangeFrom || defaultTimeSetting.from,
      to: props.dateRangeTo || defaultTimeSetting.to,
    };
  }

  function onQueryChange(query: Query) {
    props.onChange({
      query,
      dateRange: getDateRange(),
    });
  }

  function onChangeQueryInputFocus(isFocused: boolean) {
    setIsQueryInputFocused(isFocused);
  }

  function onTimeChange({
    start,
    end,
    isInvalid,
    isQuickSelection,
  }: {
    start: string;
    end: string;
    isInvalid: boolean;
    isQuickSelection: boolean;
  }) {
    setIsDateRangeInvalid(isInvalid);
    const retVal = {
      query: props.query,
      dateRange: {
        from: start,
        to: end,
      },
    };

    if (isQuickSelection) {
      props.onSubmit(retVal);
    } else {
      props.onChange(retVal);
    }
  }

  function onSubmit({
    query,
    dateRange,
  }: {
    query?: Query;
    dateRange: TimeRange;
  }) {

    if (props.timeHistory) {
      props.timeHistory.add(dateRange);
    }

    props.onSubmit({ query, dateRange });
  }

  function onInputSubmit(query: Query) {
    onSubmit({
      query,
      dateRange: getDateRange(),
    });
  }

  function toAbsoluteString(value: string, roundUp = false) {
    const valueAsMoment = dateMath.parse(value, { roundUp });
    if (!valueAsMoment) {
      return value;
    }
    return valueAsMoment.toISOString();
  }

  function renderQueryInput() {
    if (!shouldRenderQueryInput()) return;
    return (
      <QueryStringInput
        disableAutoFocus={props.disableAutoFocus}
        indexPatterns={props.indexPatterns!}
        prepend={props.prepend}
        query={props.query!}
        screenTitle={props.screenTitle}
        onChange={onQueryChange}
        onChangeQueryInputFocus={onChangeQueryInputFocus}
        onSubmit={onInputSubmit}
        // persistedLog={persistedLog}
        dataTestSubj={props.dataTestSubj}
        services={props.services}
      />
    );
  }

  function shouldRenderQueryInput(): boolean {
    return Boolean(
      showQueryInput && props.indexPatterns && props.query && storage
    );
  }

  function renderUpdateButton() {
    return (
      <Button 
        onClick={onClickSubmitButton}
        disabled={isDateRangeInvalid} 
        loading={props.isLoading} 
        icon={props.isDirty ? <ArrowRightToLine  className="w-14px h-14px"/> : <RefreshCw className="w-14px h-14px"/>} 
        color={props.isDirty ? "cyan" : "primary"}
        variant="solid"
      >
          {props.isDirty ? 'Update' : 'Refresh'}
      </Button>
    );
  }

  function renderDatePicker() {
    if(isQueryInputFocused) return null

    return (
      <DatePicker
        className={styles.datePicker}
        // locale={getLocale()}
        start={props.dateRangeFrom}
        end={props.dateRangeTo}
        onRangeChange={({ start, end }) => {
          onTimeChange({ start, end });
        }}
        isRefreshPaused={props.isRefreshPaused}
        refreshInterval={props.refreshInterval}
        onRefreshChange={({ isRefreshPaused, refreshInterval }) =>
          props.onRefreshChange({
            isPaused: isRefreshPaused,
            refreshInterval,
          })
        }
        showTimeSetting={true}
        {...(props.timeSetting || {})}
        recentlyUsedRangesKey={"discover"}
      />
    );
  }

  return (
    <div
      className={`flex items-center gap-2 justify-end w-full ${showDatePicker ? 'flex-wrap' : ''}`}
    >
      <div className="flex-1">
        {renderQueryInput()}
      </div>
      <div className="flex-grow-0">{renderDatePicker()}</div>
      <div className="flex-grow-0">{renderUpdateButton()}</div>
    </div>
  );
}
