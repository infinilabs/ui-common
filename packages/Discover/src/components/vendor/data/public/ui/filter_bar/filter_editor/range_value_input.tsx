import moment from "moment-timezone";
import { Space, Input, Form } from "antd";
import React from "react";
import { IFieldType } from "../../..";
import { ValueInputType } from "./value_input_type"; 

interface RangeParams {
  from: number | string;
  to: number | string;
}

type RangeParamsPartial = Partial<RangeParams>;

interface Props {
  field?: IFieldType;
  value?: RangeParams;
  onChange: (params: RangeParamsPartial) => void;
}

function RangeValueInputUI(props: Props) {
  const type = props.field ? props.field.type : "string";
  const tzConfig = 'Browser';

  const formatDateChange = (value: string | number | boolean) => {
    if (typeof value !== "string" && typeof value !== "number") return value;

    const momentParsedValue = moment(value).tz(tzConfig);
    if (momentParsedValue.isValid())
      return momentParsedValue.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    return value;
  };

  const handleUpdate = (key: 'from' | 'to', value: string | number | boolean) => {
    if (typeof value !== "string" && typeof value !== "number") {
      throw new Error("Range params must be a string or number");
    }
    props.onChange({ 
      ...props.value, 
      [key]: value 
    });
  };

  return (
    <Form.Item label={props.label} className="!mb-12px">
      <Space.Compact style={{ width: '100%' }}>
        <ValueInputType
          controlOnly
          type={type}
          value={props.value?.from}
          onChange={(val: any) => handleUpdate('from', val)}
          onBlur={(e: any) => {
            const val = e?.target?.value ?? props.value?.from;
            handleUpdate('from', formatDateChange(val));
          }}
          placeholder=""
          className="!w-[calc(50%-15px)]"
        />
        <Input
          style={{
            width: 31,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
            backgroundColor: 'transparent',
            textAlign: 'center',
          }}
          placeholder="→"
          disabled
        />
        <ValueInputType
          controlOnly
          type={type}
          value={props.value?.to}
          onChange={(val: any) => handleUpdate('to', val)}
          onBlur={(e: any) => {
            const val = e?.target?.value ?? props.value?.to;
            handleUpdate('to', formatDateChange(val));
          }}
          placeholder=""
          className="!w-[calc(50%-15px)]"
        />
      </Space.Compact>
    </Form.Item>
  );
}

export const RangeValueInput = RangeValueInputUI;