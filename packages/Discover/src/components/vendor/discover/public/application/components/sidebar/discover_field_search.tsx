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
import React, { Fragment, OptionHTMLAttributes, ReactNode, useState } from 'react';
import {
  EuiFacetButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelect,
  EuiSwitch,
  EuiSwitchEvent,
  EuiForm,
  EuiFormRow,
  EuiButtonGroup,
  EuiOutsideClickDetector,
  EuiNotificationBadge,
} from '@elastic/eui';
import { Button, Input, Popover, Space, Switch } from 'antd';
import { ListFilter, PanelRightOpen, Search } from 'lucide-react';

export interface State {
  searchable: string;
  aggregatable: string;
  type: string;
  missing: boolean;
  [index: string]: string | boolean;
}

export interface Props {
  /**
   * triggered on input of user into search field
   */
  onChange: (field: string, value: string | boolean | undefined) => void;

  /**
   * the input value of the user
   */
  value?: string;

  /**
   * types for the type filter
   */
  types: string[];
  onCollapseToggle: () => void;
}

/**
 * Component is Discover's side bar to  search of available fields
 * Additionally there's a button displayed that allows the user to show/hide more filter fields
 */
export function DiscoverFieldSearch({ onChange, value, types, onCollapseToggle }: Props) {
  const searchPlaceholder = 'Search field names';
  const aggregatableLabel = 'Aggregatable';
  const searchableLabel = 'Searchable';
  const typeLabel = 'Type';
  const typeOptions = types
    ? types.map((type) => {
        return { value: type, text: type };
      })
    : [{ value: 'any', text: 'any' }];

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [values, setValues] = useState<State>({
    searchable: 'any',
    aggregatable: 'any',
    type: 'any',
    missing: true,
  });

  if (typeof value !== 'string') {
    // at initial rendering value is undefined (angular related), this catches the warning
    // should be removed once all is react
    return null;
  }

  const applyFilterValue = (id: string, filterValue: string | boolean) => {
    switch (filterValue) {
      case 'any':
        if (id !== 'type') {
          onChange(id, undefined);
        } else {
          onChange(id, filterValue);
        }
        break;
      case 'true':
        onChange(id, true);
        break;
      case 'false':
        onChange(id, false);
        break;
      default:
        onChange(id, filterValue);
    }
  };

  const isFilterActive = (name: string, filterValue: string | boolean) => {
    return name !== 'missing' && filterValue !== 'any';
  };

  const handleValueChange = (name: string, filterValue: string | boolean) => {
    const previousValue = values[name];
    updateFilterCount(name, previousValue, filterValue);
    const updatedValues = { ...values };
    updatedValues[name] = filterValue;
    setValues(updatedValues);
    applyFilterValue(name, filterValue);
  };

  const updateFilterCount = (
    name: string,
    previousValue: string | boolean,
    currentValue: string | boolean
  ) => {
    const previouslyFilterActive = isFilterActive(name, previousValue);
    const filterActive = isFilterActive(name, currentValue);
    const diff = Number(filterActive) - Number(previouslyFilterActive);
    setActiveFiltersCount(activeFiltersCount + diff);
  };

  const handleMissingChange = (checked: boolean) => {
    handleValueChange('missing', checked);
  };

  const select = (
    id: string,
    selectOptions: Array<{ text: ReactNode } & OptionHTMLAttributes<HTMLOptionElement>>,
    selectValue: string
  ) => {
    return (
      <EuiSelect
        id={`${id}-select`}
        options={selectOptions}
        value={selectValue}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleValueChange(id, e.target.value)
        }
        aria-label={ `Selection of ${id} filter options`}
        data-test-subj={`${id}Select`}
        compressed
      />
    );
  };

  const toggleButtons = (id: string) => {
    return [
      {
        id: `${id}-any`,
        label: 'any',
      },
      {
        id: `${id}-true`,
        label: 'yes',
      },
      {
        id: `${id}-false`,
        label: 'no',
      },
    ];
  };

  const buttonGroup = (id: string, legend: string) => {
    return (
      <EuiButtonGroup
        legend={legend}
        options={toggleButtons(id)}
        idSelected={`${id}-${values[id]}`}
        onChange={(optionId) => handleValueChange(id, optionId.replace(`${id}-`, ''))}
        buttonSize="compressed"
        isFullWidth
        data-test-subj={`${id}ButtonGroup`}
      />
    );
  };

  const selectionPanel = (
    <div className="dscFieldSearch__formWrapper">
      <EuiForm data-test-subj="filterSelectionPanel">
        <EuiFormRow fullWidth label={aggregatableLabel} display="columnCompressed">
          {buttonGroup('aggregatable', aggregatableLabel)}
        </EuiFormRow>
        <EuiFormRow fullWidth label={searchableLabel} display="columnCompressed">
          {buttonGroup('searchable', searchableLabel)}
        </EuiFormRow>
        <EuiFormRow fullWidth label={typeLabel} display="columnCompressed">
          {select('type', typeOptions, values.type)}
        </EuiFormRow>
      </EuiForm>
    </div>
  );

  return (
    <Fragment>
      <div className="flex items-center gap-8px mb-8px">
          <Button 
              onClick={() => onCollapseToggle()} 
              className="flex-shrink-0" 
              icon={<PanelRightOpen className="w-14px h-14px"/>}
          />
          <Space.Compact className="flex-1" >
              <Input 
                prefix={<Search className="w-14px h-14px"/>}
                placeholder={searchPlaceholder}
                onChange={(event) => onChange('name', event.currentTarget.value)}
                value={value}
              />
              <Popover
                classNames={{
                  container: "!p-0 !overflow-hidden w-300px",
                  title: "!p-12px !uppercase !mb-0 !border-b-1px !border-b-solid !border-[var(--ant-color-border)]"
                }}
                placement="bottom"
                content={(
                  <>
                    {selectionPanel}
                    <div className="!p-12px !border-t-1px !border-t-solid !border-[var(--ant-color-border)] flex items-center gap-8px">
                      <Switch
                        size='small' 
                        id="filterEditorCustomLabelSwitch"
                        checked={values.missing}
                        onChange={handleMissingChange}
                      />
                      <span >Hide missing fields</span>
                    </div>
                  </>
                )}
                title={'Filter by type'}
                trigger="click"
                destroyOnHidden
                arrow={false}
              >
                <Button className="flex-shrink-0 p-0 w-56px" icon={<ListFilter className="w-14px h-14px"/>}>
                  <EuiNotificationBadge size='s' color={activeFiltersCount > 0 ? 'accent' : 'subdued'} className={activeFiltersCount > 0 ? '' : '!bg-transparent'}>
                    {activeFiltersCount}
                  </EuiNotificationBadge>
                </Button>
              </Popover>
          </Space.Compact>
      </div>
    </Fragment>
  );
}
