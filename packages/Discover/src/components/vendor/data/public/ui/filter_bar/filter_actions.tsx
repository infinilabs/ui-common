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

import {
  EuiFlexItem,
  EuiPopover,
} from "@elastic/eui";
import React, { useState } from "react";

import { FilterEditor } from "./filter_editor";
import { FilterOptions } from "./filter_options";
import { IIndexPattern } from "../..";
import {
  buildEmptyFilter,
  Filter,
  enableFilter,
  disableFilter,
  pinFilter,
  toggleFilterDisabled,
  toggleFilterNegated,
  unpinFilter,
} from "../../../common";
import { Button, Popover, Space } from "antd";
import { CirclePlus, Plus } from "lucide-react";

interface Props {
  filters: Filter[];
  onFiltersUpdated?: (filters: Filter[]) => void;
  className: string;
  indexPatterns: IIndexPattern[];
  intl: InjectedIntl;
}

export default function FilterActions(props: Props) {
  const [isAddFilterPopoverOpen, setIsAddFilterPopoverOpen] = useState(false);

  function renderAddFilter() {
    const isPinned = true; //uiSettings!.get(UI_SETTINGS.FILTERS_PINNED_BY_DEFAULT);
    const [indexPattern] = props.indexPatterns;
    const index = indexPattern && indexPattern.id;
    const newFilter = buildEmptyFilter(isPinned, index);

    return (
      <Popover
        classNames={{
          container: "!p-0 !overflow-hidden w-400px",
          title: "!p-12px !mb-0 !border-b-1px !border-b-solid !border-[var(--ant-color-border)]"
        }}
        placement="bottom"
        open={isAddFilterPopoverOpen}
        onOpenChange={setIsAddFilterPopoverOpen}
        content={(
          <FilterEditor
            filter={newFilter}
            indexPatterns={props.indexPatterns}
            onSubmit={onAdd}
            onCancel={() => setIsAddFilterPopoverOpen(false)}
            key={JSON.stringify(newFilter)}
            services={props.services}
            dateRangeFrom={props.dateRangeFrom}
            dateRangeTo={props.dateRangeTo}
            timeField={props.timeField}
          />
        )}
        title={null}
        trigger="click"
        destroyOnHidden
        arrow={false}
      >
        <Button icon={<CirclePlus className="w-14px h-14px" />} />
      </Popover>
    )
  }

  function onFiltersUpdated(filters: Filter[]) {
    if (props.onFiltersUpdated) {
      props.onFiltersUpdated(filters);
    }
  }

  function onAdd(filter: Filter) {
    setIsAddFilterPopoverOpen(false);
    const filters = [...props.filters, filter];
    onFiltersUpdated(filters);
  }

  function onEnableAll() {
    const filters = props.filters.map(enableFilter);
    onFiltersUpdated(filters);
  }

  function onDisableAll() {
    const filters = props.filters.map(disableFilter);
    onFiltersUpdated(filters);
  }

  function onPinAll() {
    const filters = props.filters.map(pinFilter);
    onFiltersUpdated(filters);
  }

  function onUnpinAll() {
    const filters = props.filters.map(unpinFilter);
    onFiltersUpdated(filters);
  }

  function onToggleAllNegated() {
    const filters = props.filters.map(toggleFilterNegated);
    onFiltersUpdated(filters);
  }

  function onToggleAllDisabled() {
    const filters = props.filters.map(toggleFilterDisabled);
    onFiltersUpdated(filters);
  }

  function onRemoveAll() {
    onFiltersUpdated([]);
  }

  return (
    <Space.Compact>
      <FilterOptions
        onEnableAll={onEnableAll}
        onDisableAll={onDisableAll}
        onPinAll={onPinAll}
        onUnpinAll={onUnpinAll}
        onToggleAllNegated={onToggleAllNegated}
        onToggleAllDisabled={onToggleAllDisabled}
        onRemoveAll={onRemoveAll}
      />
      {renderAddFilter()}
    </Space.Compact>
  )

}
