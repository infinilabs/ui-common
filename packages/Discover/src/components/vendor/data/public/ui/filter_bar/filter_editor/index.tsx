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
  // @ts-ignore
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiSwitchEvent,
} from '@elastic/eui';
import Editor from '@monaco-editor/react';
import { get } from 'lodash';
import React, { Component, useContext } from 'react';
import { GenericComboBox, GenericComboBoxProps } from './generic_combo_box';
import {
  getFieldFromFilter,
  getFilterableFields,
  getOperatorFromFilter,
  getOperatorOptions,
  isFilterValid,
} from './lib/filter_editor_utils';
import { Operator } from './lib/filter_operators';
import { PhraseValueInput } from './phrase_value_input';
import { PhrasesValuesInput } from './phrases_values_input';
import { RangeValueInput } from './range_value_input';
import { IIndexPattern, IFieldType } from '../../..';
import {
  Filter,
  getIndexPatternFromFilter,
  FieldFilter,
  buildFilter,
  buildCustomFilter,
  cleanFilter,
  getFilterParams,
} from '../../../../common';
import { Button, Form, Input, Select, Switch } from 'antd';
import { GlobalConfigContext, II18nProps } from '@/components';

interface Props {
  filter: Filter;
  indexPatterns: IIndexPattern[];
  onSubmit: (filter: Filter) => void;
  onCancel: () => void;
  title: string;
  i18n: II18nProps
}

interface State {
  selectedIndexPattern?: IIndexPattern;
  selectedField?: IFieldType;
  selectedOperator?: Operator;
  params: any;
  useCustomLabel: boolean;
  customLabel: string | null;
  queryDsl: string;
  isCustomEditorOpen: boolean;
}

class FilterEditorUI extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndexPattern: this.getIndexPatternFromFilter(),
      selectedField: this.getFieldFromFilter(),
      selectedOperator: this.getSelectedOperator(),
      params: getFilterParams(props.filter),
      useCustomLabel: props.filter.meta.alias !== null,
      customLabel: props.filter.meta.alias,
      queryDsl: JSON.stringify(cleanFilter(props.filter), null, 2),
      isCustomEditorOpen: this.isUnknownFilterType(),
    };
  }

  public render() {

    const i18nFilterItem = this.props.i18n?.filter?.item || {}

    return (
      <div>
        <div className='ant-popover-title !p-12px !uppercase !mb-0 !border-b-1px !border-b-solid !border-[var(--ant-color-border)] flex items-center justify-between'>
          <div>{this.props.title}</div>
          <Button className='h-auto px-0' type="link" onClick={this.toggleCustomEditor}>
            {this.state.isCustomEditorOpen ? (
              i18nFilterItem['edit_values'] || "Edit filter values"
            ) : (
              i18nFilterItem['edit_dsl'] || "Edit as Query DSL"
            )}
          </Button>
        </div>

        <div className="globalFilterItem__editorForm">
          <Form layout="vertical">
            {this.renderIndexPatternInput()}

            {this.state.isCustomEditorOpen ? this.renderCustomEditor() : this.renderRegularEditor()}

            <Form.Item className="!mb-12px">
              <div className="flex items-center gap-8px">
                <Switch
                  size='small'
                  id="filterEditorCustomLabelSwitch"
                  checked={this.state.useCustomLabel}
                  onChange={this.onCustomLabelSwitchChange}
                />
                <span className="text-[var(--ant-form-label-color)] text-[var(--ant-form-label-font-size)]">{i18nFilterItem['create_label'] || "Create custom label?"}</span>
              </div>
            </Form.Item>

            {this.state.useCustomLabel && (
              <Form.Item className="!mb-12px" label={i18nFilterItem['custom_label'] || 'Custom label'}>
                <Input value={`${this.state.customLabel}`} onChange={this.onCustomLabelChange} />
              </Form.Item>
            )}

            <div className="text-right">
              <Button className="w-80px" type="text" onClick={this.props.onCancel}>{i18nFilterItem['cancel'] || "Cancel"}</Button>
              <Button className="w-80px" type="primary" onClick={this.onSubmit} disabled={!this.isFilterValid()}>{i18nFilterItem['save'] || "Save"}</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  private renderIndexPatternInput() {
    if (
      this.props.indexPatterns.length <= 1 &&
      this.props.indexPatterns.find(
        (indexPattern) => indexPattern === this.getIndexPatternFromFilter()
      )
    ) {
      /**
       * Don't render the index pattern selector if there's just one \ zero index patterns
       * and if the index pattern the filter was LOADED with is in the indexPatterns list.
       **/

      return '';
    }
    const { selectedIndexPattern } = this.state;
    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            label={'Index Pattern'}
          >
            <IndexPatternComboBox
              placeholder={'Select an index pattern'}
              options={this.props.indexPatterns}
              selectedOptions={selectedIndexPattern ? [selectedIndexPattern] : []}
              getLabel={(indexPattern) => indexPattern.title}
              onChange={this.onIndexPatternChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
              data-test-subj="filterIndexPatternsSelect"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  private renderRegularEditor() {
    return (
      <>
        {this.renderFieldInput()}
        {this.renderOperatorInput()}
        {this.renderParamsEditor()}
      </>
    );
  }

  private renderFieldInput() {
    const { selectedIndexPattern, selectedField } = this.state;
    const fields = selectedIndexPattern ? getFilterableFields(selectedIndexPattern) : [];
    const i18nFilterItem = this.props.i18n?.filter?.item || {}

    return (
      <Form.Item
        label={i18nFilterItem['field'] || "Field"}
        className="!mb-12px"
      >
        <Select
          id="fieldInput"
          showSearch
          disabled={!selectedIndexPattern}
          value={selectedField?.name}
          onChange={(value) => {
            const field = fields.find(f => f.name === value);
            this.onFieldChange([field]);
          }}
          options={fields.map(field => ({
            label: field.name,
            value: field.name,
          }))}
          allowClear={false}
          style={{ width: '100%' }}
        />
      </Form.Item>
    );
  }

  private renderOperatorInput() {
    const { selectedField, selectedOperator } = this.state;
    const operators = selectedField ? getOperatorOptions(selectedField) : [];
    const i18nFilterItem = this.props.i18n?.filter?.item || {}
    const i18nFilterOperators = this.props.i18n?.filter?.operators || {}
    return (
      <Form.Item
        label={i18nFilterItem['operator'] || "Operator"}
        className="!mb-12px"
      >
        <Select
          id="fieldInput"
          showSearch
          disabled={!selectedField}
          value={selectedOperator?.message}
          onChange={(value) => {
            const operator = operators.find(f => f.message === value);
            this.onOperatorChange([operator]);
          }}
          options={operators.map(field => ({
            label: i18nFilterOperators[`${field.type}${field.negate ? '_false' : '_true'}`] || field.message,
            value: field.message,
          }))}
          allowClear={false}
          style={{ width: '100%' }}
        />
      </Form.Item>
    );
  }

  private renderCustomEditor() {
    const i18nFilterItem = this.props.i18n?.filter?.item || {}
    return (
      <Form.Item label={i18nFilterItem['dsl'] || 'Query DSL'} className="!mb-12px">
        <Editor
          value={this.state.queryDsl}
          onChange={(value) => this.onQueryDslChange(value || '')}
          language="json"
          width="100%"
          height="250px"
          theme={this.props.theme === 'dark' ? 'vs-dark' : 'light'}
          className="border border-solid border-[var(--ant-color-border)] rounded-6px overflow-hidden"
        />
      </Form.Item>
    );
  }

  private renderParamsEditor() {
    const indexPattern = this.state.selectedIndexPattern;
    if (!indexPattern || !this.state.selectedOperator) {
      return '';
    }

    const i18nFilterItem = this.props.i18n?.filter?.item || {}

    switch (this.state.selectedOperator.type) {
      case 'exists':
        return '';
      case 'phrase':
        return (
          <PhraseValueInput
            indexPattern={indexPattern}
            field={this.state.selectedField}
            value={this.state.params}
            onChange={this.onParamsChange}
            data-test-subj="phraseValueInput"
            services={this.props.services}
            dateRangeFrom={this.props.dateRangeFrom}
            dateRangeTo={this.props.dateRangeTo}
            timeField={this.props.timeField}
            label={i18nFilterItem['value'] || 'Value'}
          />
        );
      case 'phrases':
        return (
          <PhrasesValuesInput
            indexPattern={indexPattern}
            field={this.state.selectedField}
            values={this.state.params}
            onChange={this.onParamsChange}
            services={this.props.services}
            dateRangeFrom={this.props.dateRangeFrom}
            dateRangeTo={this.props.dateRangeTo}
            timeField={this.props.timeField}
            label={i18nFilterItem['values'] || 'Values'}
          />
        );
      case 'range':
        return (
          <RangeValueInput
            field={this.state.selectedField}
            value={this.state.params}
            onChange={this.onParamsChange}
            services={this.props.services}
            dateRangeFrom={this.props.dateRangeFrom}
            dateRangeTo={this.props.dateRangeTo}
            timeField={this.props.timeField}
            label={i18nFilterItem['range'] || 'Range'}
          />
        );
    }
  }

  private toggleCustomEditor = () => {
    const isCustomEditorOpen = !this.state.isCustomEditorOpen;
    this.setState({ isCustomEditorOpen });
  };

  private isUnknownFilterType() {
    const { type } = this.props.filter.meta;
    return !!type && !['phrase', 'phrases', 'range', 'exists'].includes(type);
  }

  private getIndexPatternFromFilter() {
    return getIndexPatternFromFilter(this.props.filter, this.props.indexPatterns);
  }

  private getFieldFromFilter() {
    const indexPattern = this.getIndexPatternFromFilter();
    return indexPattern && getFieldFromFilter(this.props.filter as FieldFilter, indexPattern);
  }

  private getSelectedOperator() {
    return getOperatorFromFilter(this.props.filter);
  }

  private isFilterValid() {
    const {
      isCustomEditorOpen,
      queryDsl,
      selectedIndexPattern: indexPattern,
      selectedField: field,
      selectedOperator: operator,
      params,
    } = this.state;

    if (isCustomEditorOpen) {
      try {
        return Boolean(JSON.parse(queryDsl));
      } catch (e) {
        return false;
      }
    }

    return isFilterValid(indexPattern, field, operator, params);
  }

  private onIndexPatternChange = ([selectedIndexPattern]: IIndexPattern[]) => {
    const selectedField = undefined;
    const selectedOperator = undefined;
    const params = undefined;
    this.setState({ selectedIndexPattern, selectedField, selectedOperator, params });
  };

  private onFieldChange = ([selectedField]: IFieldType[]) => {
    const selectedOperator = undefined;
    const params = undefined;
    this.setState({ selectedField, selectedOperator, params });
  };

  private onOperatorChange = ([selectedOperator]: Operator[]) => {
    // Only reset params when the operator type changes
    const params =
      get(this.state.selectedOperator, 'type') === get(selectedOperator, 'type')
        ? this.state.params
        : undefined;
    this.setState({ selectedOperator, params });
  };

  private onCustomLabelSwitchChange = (checked: boolean) => {
    const useCustomLabel = checked;
    const customLabel = checked ? '' : null;
    this.setState({ useCustomLabel, customLabel });
  };

  private onCustomLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const customLabel = event.target.value;
    this.setState({ customLabel });
  };

  private onParamsChange = (params: any) => {
    this.setState({ params });
  };

  private onQueryDslChange = (queryDsl: string) => {
    this.setState({ queryDsl });
  };

  private onSubmit = () => {
    const {
      selectedIndexPattern: indexPattern,
      selectedField: field,
      selectedOperator: operator,
      params,
      useCustomLabel,
      customLabel,
      isCustomEditorOpen,
      queryDsl,
    } = this.state;

    const { $state } = this.props.filter;
    if (!$state || !$state.store) {
      return; // typescript validation
    }
    const alias = useCustomLabel ? customLabel : null;

    if (isCustomEditorOpen) {
      const { index, disabled, negate } = this.props.filter.meta;
      const newIndex = index || this.props.indexPatterns[0].id!;
      const body = JSON.parse(queryDsl);
      const filter = buildCustomFilter(newIndex, body, disabled, negate, alias, $state.store);
      this.props.onSubmit(filter);
    } else if (indexPattern && field && operator) {
      const filter = buildFilter(
        indexPattern,
        field,
        operator.type,
        operator.negate,
        this.props.filter.meta.disabled,
        params ?? '',
        alias,
        $state.store
      );
      this.props.onSubmit(filter);
    }
  };
}

function IndexPatternComboBox(props: GenericComboBoxProps<IIndexPattern>) {
  return GenericComboBox(props);
}

function FieldComboBox(props: GenericComboBoxProps<IFieldType>) {
  return GenericComboBox(props);
}

function OperatorComboBox(props: GenericComboBoxProps<Operator>) {
  return GenericComboBox(props);
}

export const FilterEditor = (props: Props) => {

  const { i18n } = useContext(GlobalConfigContext)

  return <FilterEditorUI {...props} i18n={i18n}/>
};