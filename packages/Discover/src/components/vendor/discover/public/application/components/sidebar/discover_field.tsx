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
import React, { useState, useCallback, useContext } from "react";
import {
  EuiPopover,
  EuiPopoverTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiToolTip,
} from "@elastic/eui";
import { DiscoverFieldDetails } from "./discover_field_details";
import { FieldIcon, FieldButton } from "../../../../../react/public";
import { FieldDetails } from "./types";
import { IndexPatternField, IndexPattern } from "../../../../../data/public";
import { shortenDottedString } from "../../helpers";
import { getFieldTypeName } from "./lib/get_field_type_name";
import "./discover_field.scss";
import Spin from "antd/lib/spin";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip } from "antd";
import { CirclePlus, CircleX, Zap } from "lucide-react";
import { GlobalConfigContext } from "@/components";

export interface DiscoverFieldProps {
  /**
   * The displayed field
   */
  field: IndexPatternField;
  /**
   * The currently selected index pattern
   */
  indexPattern: IndexPattern;
  /**
   * Callback to add/select the field
   */
  onAddField: (fieldName: string) => void;
  /**
   * Callback to add a filter to filter bar
   */
  onAddFilter: (
    field: IndexPatternField | string,
    value: string,
    type: "+" | "-"
  ) => void;
  /**
   * Callback to remove/deselect a the field
   * @param fieldName
   */
  onRemoveField: (fieldName: string) => void;
  /**
   * Retrieve details data for the field
   */
  getDetails: (field: IndexPatternField) => FieldDetails;
  /**
   * Determines whether the field is selected
   */
  selected?: boolean;
  /**
   * Determines whether the field name is shortened test.sub1.sub2 = t.s.sub2
   */
  useShortDots?: boolean;
  whetherToSample?: boolean;
  sampleSize?: number;
  topNumber?: number;
}

export function DiscoverField({
  field,
  indexPattern,
  onAddField,
  onRemoveField,
  onAddFilter,
  getDetails,
  selected,
  useShortDots,
  setLastPopoverField,
  lastPopoverField,
  onFieldAgg,
  columns,
  whetherToSample,
  sampleSize,
  topNumber
}: DiscoverFieldProps) {
  const addLabelAria = `Add ${field.name} to table`;
  const removeLabelAria = `Remove ${field.name} to table`;

  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({ buckets: [], columns: columns });
  const [loading, setLoading] = useState(false);
  const [lightningToggleLocal, setLightningToggleLocal] = useState(true); //true:local, false:remote

  const toggleDisplay = useCallback(
    (f: IndexPatternField) => {
      if (selected) {
        onRemoveField(f.name);
      } else {
        onAddField(f.name);
      }
    },
    [selected]
  );

  function togglePopover() {
    setOpen((isOpen) => {
      return !isOpen;
    });
  }

  function wrapOnDot(str?: string) {
    // u200B is a non-width white-space character, which allows
    // the browser to efficiently word-wrap right after the dot
    // without us having to draw a lot of extra DOM elements, etc
    return str ? str.replace(/\./g, ".\u200B") : "";
  }

  const dscFieldIcon = (
    <FieldIcon
      type={field.type}
      label={getFieldTypeName(field.type)}
      scripted={field.scripted}
    />
  );

  const fieldName = (
    <span
      data-test-subj={`field-${field.name}`}
      title={field.name}
      className="dscSidebarField__name"
    >
      {useShortDots
        ? wrapOnDot(shortenDottedString(field.name))
        : wrapOnDot(field.displayName)}
    </span>
  );

  let actionButton;
  if (field.name !== "_source" && !selected) {
    actionButton = (
      <Tooltip
        title={i18nField['add_field_to_column'] || "Add field as column"}
      >
        <Button
          size="small"
          className="dscSidebarItem__action !flex !items-center !justify-center"
          classNames={{ icon: '!h-14px !leading-14px' }}
          icon={<CirclePlus className="w-14px h-14px" />}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.preventDefault();
            ev.stopPropagation();
            toggleDisplay(field);
          }}
          color="primary"
          variant="text"
        />
      </Tooltip>
    );
  } else if (field.name !== "_source" && selected) {
    actionButton = (
      <Tooltip
        title={i18nField['remove_field_from_column'] || "Remove field from table"}
      >
        <Button
          color="danger"
          variant="text"
          size="small"
          className="dscSidebarItem__action !flex !items-center !justify-center"
          classNames={{ icon: '!h-14px !leading-14px' }}
          // cross 对应 Antd 的 CloseOutlined
          icon={<CircleX className="w-14px h-14px" />}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.preventDefault();
            ev.stopPropagation();
            toggleDisplay(field);
          }}
        />
      </Tooltip>
    );
  }

  if (field.type === "_source") {
    return (
      <FieldButton
        size="s"
        className="dscSidebarItem"
        dataTestSubj={`field-${field.name}-showDetails`}
        fieldIcon={dscFieldIcon}
        fieldAction={actionButton}
        fieldName={fieldName}
      />
    );
  }

  const fetchFieldAgg = (isLocal, field) => {
    if (isLocal) {
      const ds = getDetails(field);
      setDetails({
        ...details,
        buckets: ds.buckets,
        exists: ds.exists,
        total: ds.total,
        columns: ds.columns,
      });
    } else {
      onFieldAgg(
        field,
        () => {
          setLoading(true);
        },
        (buckets, total) => {
          setDetails({
            ...details,
            buckets: (buckets || []).map((item) => ({
              display: indexPattern
                .getFormatterForField(field)
                .convert(item.key),
              value: item.key,
              count: item.doc_count,
              percent: ((item.doc_count / total) * 100).toFixed(1),
            })),
            exists: (buckets || [])
              .map((item) => item.doc_count)
              .reduce((a, b) => a + b),
            total,
            columns,
          });
          setLoading(false);
        }
      );
    }
  };

  return (
    <Popover
      classNames={{
        container: "!p-0 !overflow-hidden !min-w-260px !max-w-300px",
        title: "!p-12px !mb-0 !border-b-1px !border-b-solid !border-[var(--ant-color-border)]"
      }}
      placement="rightTop"
      trigger="click"
      title={(
        <div className="!flex !items-center !justify-between">
          <div className="!uppercase">
            Top {details?.buckets?.length || 5} values
          </div>
          {whetherToSample || whetherToSample === undefined ? (
            <Tooltip title={`Toggle ${lightningToggleLocal ? "remote" : "local"} top values`}>
              <Button
                size="small"
                className="!flex !items-center !justify-center"
                classNames={{ icon: '!h-14px !leading-14px' }}
                icon={<Zap className="w-14px h-14px" />}
                onClick={() => {
                  setLightningToggleLocal((state) => {
                    fetchFieldAgg(!state, field);
                    return !state;
                  });
                }}
                variant="text"
                color="default"
              />
            </Tooltip>
          ): null}
        </div>
      )}
      open={open}
      onOpenChange={(visible) => {
        if (!visible) setOpen(false);
      }}
      content={
        <Spin spinning={loading}>
          {field.isMulti || field.spec?.aggregatable === true ? (
            <DiscoverFieldDetails
              indexPattern={indexPattern}
              field={field}
              details={details}
              onAddFilter={onAddFilter}
            />
          ) : (
            `No field data found for field ${field.displayName}`
          )}
        </Spin>
      }
      destroyOnHidden
    >
      <div onClick={() => {
        setLastPopoverField(field.name);
        togglePopover();
        !open && fetchFieldAgg(lightningToggleLocal, field);
      }}>

        <FieldButton
          size="s"
          className="dscSidebarItem"
          isActive={open && lastPopoverField == field.name}
          dataTestSubj={`field-${field.name}-showDetails`}
          fieldIcon={dscFieldIcon}
          fieldAction={actionButton}
          fieldName={fieldName}
        />
      </div>
    </Popover>
  );
}
