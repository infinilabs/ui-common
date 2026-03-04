import React, { useState, useEffect, useCallback, useContext } from "react";
import moment from "moment";
import { GlobalConfigContext } from "..";

export interface IProps {
  /**
   * Format of date to be displayed
   */
  dateFormat?: string;
  /**
   * Interval for the buckets of the recent request
   */
  bucketInterval?: {
    scaled?: boolean;
    description?: string;
    scale?: number;
    timeFieldName: string;
  };
  /**
   * Range of dates to be displayed
   */
  timeRange?: {
    from: string;
    to: string;
  };
  /**
   * selected interval
   */
  stateInterval: string;
  total: number;
  took?: number;
}

export default ({
  bucketInterval,
  dateFormat = 'YYYY-MM-DD HH:mm:ss',
  timeRange,
  stateInterval,
  total,
  took,
}: IProps) => {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nResult = i18n?.result || {}

  const [interval, setInterval] = useState(stateInterval);
  const toMoment = useCallback(
    (datetime: string) => {
      if (!datetime) {
        return "";
      }
      if (!dateFormat) {
        return datetime;
      }
      return moment(datetime).format(dateFormat);
    },
    [dateFormat]
  );

  useEffect(() => {
    setInterval(stateInterval);
  }, [stateInterval]);

  return (
    <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: 12 }}>
      {i18nResult['found'] || "Found"} <span style={{ fontWeight: "bold" }}>{total}</span>{" "}
      {i18nResult['records'] || "records"} {took && (
        <span style={{ marginLeft: 5 }}>
          ({took} {i18nResult['milliscond'] || "milliscond"})
        </span>
      )}
      {timeRange && (
        <span style={{ marginLeft: 5 }}>
          {`${i18nResult['between'] || 'between'} ${toMoment(timeRange.from)} ~ ${toMoment(
            timeRange.to
          )} ${interval !== "auto" ? "" : "" 
            }`}
        </span>
      )}
      {bucketInterval && (
        <span>{`(${bucketInterval.timeFieldName} per ${bucketInterval.description})`}</span>
      )}
    </div>
  );
}
