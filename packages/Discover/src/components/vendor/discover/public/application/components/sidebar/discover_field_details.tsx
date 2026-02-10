import React, { useState, useEffect, useContext } from "react";
import { DiscoverFieldBucket } from "./discover_field_bucket";
import { getWarnings } from "./lib/get_warnings";
import { Bucket, FieldDetails } from "./types";
import { IndexPatternField, IndexPattern } from "../../../../../data/public";
import "./discover_field_details.scss";
import { Typography } from "antd";
import { GlobalConfigContext } from "@/components";

interface DiscoverFieldDetailsProps {
  field: IndexPatternField;
  indexPattern: IndexPattern;
  details: FieldDetails;
  onAddFilter: (
    field: IndexPatternField | string,
    value: string,
    type: "+" | "-"
  ) => void;
}

export function DiscoverFieldDetails({
  field,
  indexPattern,
  details,
  onAddFilter,
}: DiscoverFieldDetailsProps) {

  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  return (
    <>
      <div className="dscFieldDetails !p-12px">
        {details.error && (
          <Typography.Text className="text-xs mb-12px" type="danger">
            {details.error}
          </Typography.Text>
        )}
        {!details.error && (
          <>
            {details?.buckets?.map((bucket: Bucket, idx: number) => (
              <DiscoverFieldBucket
                key={`bucket${idx}`}
                bucket={bucket}
                field={field}
                onAddFilter={onAddFilter}
              />
            ))}
            <Typography.Text>
              {`${i18nField['top_result_prefix'] || "Calculated from"} ${details.total} ${i18nField['top_result_suffix'] || "sample records"}`}
            </Typography.Text>
          </>
        )}
      </div>
    </>
  );
}
