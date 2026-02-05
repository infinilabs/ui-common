import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";

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
  dateFormat = 'YYYY-MM-DD H:mm',
  timeRange,
  stateInterval,
  total,
  took,
}: IProps) => {
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
      Found <span style={{ fontWeight: "bold" }}>{total}</span>{" "}
      records {took && (
        <span style={{ marginLeft: 5 }}>
          ({took} milliscond)
        </span>
      )}
      {timeRange && (
        <span style={{ marginLeft: 5 }}>
          {`between ${toMoment(timeRange.from)} and ${toMoment(
            timeRange.to
          )} ${interval !== "auto" ? "" : "" //per
            }`}
        </span>
      )}
      {bucketInterval && (
        <span>{`(${bucketInterval.timeFieldName} per ${bucketInterval.description})`}</span>
      )}
    </div>
  );
}
