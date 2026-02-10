import { uniq } from "lodash";
import React from "react";
import { PhraseSuggestorUI, PhraseSuggestorProps } from "./phrase_suggestor";
import { withKibana } from "../../../../../react/public";
import { Form, Select } from "antd";

interface Props extends PhraseSuggestorProps {
  values?: string[];
  onChange: (values: string[]) => void;
}

class PhrasesValuesInputUI extends PhraseSuggestorUI<Props> {
  public render() {
    const { suggestions } = this.state;
    const { values, onChange } = this.props;
    const uniqueOptions = values ? uniq([...values, ...suggestions]) : suggestions;
    const options = uniqueOptions.map((opt) => ({
      label: opt,
      value: opt,
    }));
    return (
      <Form.Item label={this.props.label} className="!mb-12px">
        <Select
          mode="tags"
          placeholder=""
          value={values || []}
          options={options}
          onChange={(newValues: string[]) => {
            onChange(newValues);
          }}
          showSearch={{
            onSearch: this.onSearchChange
          }}
          allowClear={false}
          style={{ width: '100%' }}
          tokenSeparators={[',']} 
        />
      </Form.Item>
    );
  }
}

export const PhrasesValuesInput = withKibana(PhrasesValuesInputUI);
