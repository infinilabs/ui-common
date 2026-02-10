import { uniq } from "lodash";
import React from "react";
import { PhraseSuggestorUI, PhraseSuggestorProps } from "./phrase_suggestor";
import { ValueInputType } from "./value_input_type";
import { Form, Select } from "antd";
import { IFieldType } from '../../..';
import { withKibana } from "../../../../../react/public";

interface Props extends PhraseSuggestorProps {
  value?: string;
  onChange: (value: string | number | boolean) => void;
  field: IFieldType | undefined
}

class PhraseValueInputUI extends PhraseSuggestorUI<Props> {
  public render() {
    return (
      <Form.Item label={this.props.label} className="!mb-12px">
        {this.isSuggestingValues() ? (
          this.renderWithSuggestions()
        ) : (
          <ValueInputType
            placeholder=""
            value={this.props.value}
            onChange={this.props.onChange}
            type={this.props.field ? this.props.field.type : "string"}
          />
        )}
      </Form.Item>
    );
  }

  private renderWithSuggestions() {
    const suggestions = Array.isArray(this.state.suggestions) ? this.state.suggestions : [];
    const { value, onChange } = this.props;
    
    const valueAsStr = value !== undefined ? String(value) : undefined;
    
    const uniqueValues = valueAsStr ? uniq([valueAsStr, ...suggestions]) : suggestions;
    const options = uniqueValues.map(opt => ({ label: opt, value: opt }));

    return (
      <Select
        mode="tags" 
        maxCount={1} 
        placeholder=""
        value={valueAsStr}
        onChange={(newValue) => {
          const actualValue = Array.isArray(newValue) ? newValue[newValue.length - 1] : newValue;
          onChange(actualValue);
        }}
        showSearch={{
          onSearch: this.onSearchChange
        }}
        options={options}
        allowClear={false}
        style={{ width: '100%' }}
      />
    );
  }
}

export const PhraseValueInput = withKibana(PhraseValueInputUI);