import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { validateParams } from './lib/filter_editor_utils';
import { Input, InputNumber, Select } from 'antd';

interface Props {
  value?: string | number;
  type: string;
  onChange: (value: string | number | boolean) => void;
  onBlur?: (value: string | number | boolean) => void;
  placeholder: string;
  controlOnly?: boolean;
  className?: string;
}

class ValueInputTypeUI extends Component<Props> {
  public render() {
    const value = this.props.value;
    let inputElement: React.ReactNode;
    switch (this.props.type) {
      case 'string':
        inputElement = (
          <Input
            placeholder={this.props.placeholder}
            value={value}
            onChange={this.onChange}
            className={this.props.className}
          />
        );
        break;
      case 'number':
        inputElement = (
          <InputNumber
            placeholder={this.props.placeholder}
            value={typeof value === 'string' ? parseFloat(value) : value}
            onChange={(val) => this.props.onChange(val !== null ? `${val}` : '')}
            className={`w-full ${this.props.className}`}
          />
        );
        break;
      case 'date':
      case 'ip':
        const isValid = isEmpty(value) || validateParams(value, this.props.type);
        inputElement = (
          <Input
            placeholder={this.props.placeholder}
            value={value}
            status={isValid ? '' : 'error'}
            onChange={this.onChange}
            onBlur={this.onBlur}
            className={this.props.className}
          />
        );
        break;
      case 'boolean':
        inputElement = (
          <Select
            placeholder={this.props.placeholder}
            value={value === undefined ? undefined : String(value)}
            onChange={(val) => {
              const boolValue = val === 'true';
              this.props.onChange(boolValue);
            }}
            className={`w-full ${this.props.className}`}
            options={[
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ]}
            allowClear
          />
        );
        break;
      default:
        break;
    }

    return inputElement;
  }

  private onBoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const boolValue = event.target.value === 'true';
    this.props.onChange(boolValue);
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = event.target.value;
    this.props.onChange(params);
  };

  private onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      const params = event.target.value;
      this.props.onBlur(params);
    }
  };
}

export const ValueInputType = ValueInputTypeUI;
