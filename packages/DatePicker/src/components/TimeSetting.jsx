import { InputNumber, Select, Switch } from "antd";
import { useMemo, useRef, useState } from "react";

import Apply from "./Apply";

import styles from "./TimeSetting.module.less";

const timeIntervals = [
  // { label: 'Millisecond', value: 'ms' },
  { label: "Second", value: "s" },
  { label: "Minute", value: "m" },
  { label: "Hour", value: "h" },
  { label: "Day", value: "d" },
  { label: "Week", value: "w" },
  { label: "Month", value: "M" },
  { label: "Year", value: "y" },
];

const TimeSetting = (props) => {
  const {
    currentLocales,
    timeFields = [],
    showTimeField,
    showTimeInterval,
    onTimeSettingChange,
    onCancel,
  } = props;

  const [isAuto, setIsAuto] = useState(!props.timeInterval);
  const [timeField, setTimeField] = useState(props.timeField);
  const [timeInterval, setTimeInterval] = useState(props.timeInterval);
  const timeIntervalCache = useRef("");

  const handleApply = () => {
    onTimeSettingChange({ timeField, timeInterval });
    onCancel();
  };

  const timeIntervalObject = useMemo(() => {
    if (!timeInterval) return;
    const value = parseInt(timeInterval);
    return {
      value,
      unit: timeInterval.replace(`${value}`, ""),
    };
  }, [timeInterval]);

  return (
    <div className={styles.timeSetting}>
      <div className={styles.title}>
        {currentLocales[`datepicker.time_setting`]}
      </div>
      {showTimeField && (
        <div className={styles.formItem}>
          <div className={styles.label}>
            {currentLocales[`datepicker.time_setting.time_field`]}
          </div>
          <Select
            value={timeField}
            onChange={setTimeField}
            style={{ width: "100%" }}
          >
            {timeFields.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
      {showTimeInterval && (
        <div className={styles.formItem}>
          <div className={styles.label}>
            {currentLocales[`datepicker.time_setting.time_interval`]}
            <div className={styles.auto}>
              <Switch
                size="small"
                checked={isAuto}
                onChange={(checked) => {
                  setIsAuto(checked);
                  if (checked) {
                    timeIntervalCache.current = timeInterval;
                    setTimeInterval();
                  } else {
                    setTimeInterval(
                      timeIntervalCache.current || props.timeInterval || "10s"
                    );
                  }
                }}
              />{" "}
              {currentLocales[`datepicker.time_setting.time_interval.auto`]}
            </div>
          </div>
          <div className={styles.form}>
            {!isAuto && timeIntervalObject && (
              <>
                <InputNumber
                  min={1}
                  value={timeIntervalObject.value}
                  style={{ width: "100%" }}
                  step={1}
                  precision={0}
                  onChange={(value) => {
                    if (Number.isInteger(value)) {
                      setTimeInterval(`${value}${timeIntervalObject.unit}`);
                    }
                  }}
                />
                <Select
                  value={timeIntervalObject.unit}
                  onChange={(value) =>
                    setTimeInterval(`${timeIntervalObject.value}${value}`)
                  }
                  style={{ width: "100%" }}
                >
                  {timeIntervals.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {
                        currentLocales[
                          `datepicker.time_setting.time_interval.${item.value}`
                        ]
                      }
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
          </div>
        </div>
      )}
      <div className={styles.apply}>
        <Apply
          currentLocales={currentLocales}
          onApply={handleApply}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default TimeSetting;
