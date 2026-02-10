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
import React, { Fragment, OptionHTMLAttributes, ReactNode, useContext, useState } from 'react';
import { Badge, Button, Form, Input, Popover, Radio, Select, Space, Switch } from 'antd';
import { ListFilter, PanelRightOpen, Search } from 'lucide-react';
import { GlobalConfigContext } from '@/components';

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
  const { i18n } = useContext(GlobalConfigContext)
  const i18nFieldSearch = i18n?.field?.search || {}
  const searchPlaceholder = i18nFieldSearch['placeholder'] || 'Search field names';
  const aggregatableLabel = i18nFieldSearch['aggregatable'] || 'Aggregatable';
  const searchableLabel = i18nFieldSearch['searchable'] || 'Searchable';
  const typeLabel = i18nFieldSearch['type'] || 'Type';
  const typeOptions = types
    ? types.map((type) => {
      return { value: type, text: i18nFieldSearch[type] || type };
    })
    : [{ value: 'any', text: i18nFieldSearch['any'] || 'any' }];

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
  const options = selectOptions.map(({ text, value, ...rest }) => ({
    label: text,
    value: value as string,
    ...rest,
  }));

  return (
    <Select
      id={`${id}-select`}
      options={options}
      value={selectValue}
      onChange={(value: string) => handleValueChange(id, value)}
      aria-label={`Selection of ${id} filter options`}
      data-test-subj={`${id}Select`}
      className="w-full" 
    />
  );
};

  const toggleButtons = (id: string) => {
    return [
      {
        id: `${id}-any`,
        label: i18nFieldSearch['any'] || 'any',
      },
      {
        id: `${id}-true`,
        label: i18nFieldSearch['yes'] || 'yes',
      },
      {
        id: `${id}-false`,
        label: i18nFieldSearch['no'] || 'no',
      },
    ];
  };

  const buttonGroup = (id: string, legend: string) => {
    const options = toggleButtons(id).map(opt => ({
      label: opt.label,
      value: opt.id.replace(`${id}-`, '')
    }));

    return (
      <Radio.Group
        block
        optionType="button"
        buttonStyle="solid"
        value={values[id]}
        onChange={(e) => handleValueChange(id, e.target.value)}
      >
        {options.map((opt) => (
          <Radio.Button 
            key={opt.value} 
            value={opt.value}
          >
            {opt.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  };

  const selectionPanel = (
    <div className="dscFieldSearch__formWrapper">
      <Form
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label={aggregatableLabel}
          className='!mb-12px'
        >
          {buttonGroup('aggregatable', aggregatableLabel)}
        </Form.Item>
        <Form.Item
          label={searchableLabel}
          className='!mb-12px'
        >
          {buttonGroup('searchable', searchableLabel)}
        </Form.Item>
        <Form.Item
          label={typeLabel}
          className='!mb-12px'
        >
          {select('type', typeOptions, values.type)}
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Fragment>
      <div className="flex items-center gap-8px mb-8px">
        <Button
          onClick={() => onCollapseToggle()}
          className="flex-shrink-0"
          icon={<PanelRightOpen className="w-14px h-14px" />}
        />
        <Space.Compact className="flex-1" >
          <Input
            prefix={<Search className="w-14px h-14px" />}
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
                  <span >{i18nFieldSearch['hide_missing_fields'] || "Hide missing fields"}</span>
                </div>
              </>
            )}
            title={i18nFieldSearch['title'] || 'Filter by type'}
            trigger="click"
            destroyOnHidden
            arrow={false}
          >
            <Button className="flex-shrink-0 p-0 w-56px" icon={<ListFilter className="w-14px h-14px" />}>
              <Badge
                key={activeFiltersCount}
                count={activeFiltersCount}
                size='small'
                showZero
                status={activeFiltersCount > 0 ? 'error' : 'default'}
                classNames={{
                  root: `${activeFiltersCount > 0 ? '' : '!text-inherit'}`,
                  indicator: `!rounded-4px ${activeFiltersCount > 0 ? '!text-10px !leading-12px' : '!bg-transparent !text-inherit'}`
                }}
              />
            </Button>
          </Popover>
        </Space.Compact>
      </div>
    </Fragment>
  );
}
