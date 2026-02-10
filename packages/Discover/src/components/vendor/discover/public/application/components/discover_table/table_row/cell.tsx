import { useContext, useMemo } from "react";
import { EuiIcon } from "@elastic/eui";
import { Button, Space, Tooltip } from "antd";
import { CircleMinus, CirclePlus } from "lucide-react";
import { GlobalConfigContext } from "@/components";

interface Props {
  timefield: boolean;
  sourcefield?: boolean;
  formatted: any;
  filterable: boolean;
  inlineFilter: (field: any, values: any, operation: any) => void;
  column: string;
  row: any;
  indexPattern: any;
  filterIconRender?: (children: any, params: { field: any, values: any, operation: any }) => any;
}

export function Cell({
  timefield,
  sourcefield,
  formatted,
  filterable,
  inlineFilter,
  column,
  row,
  indexPattern,
  filterIconRender
}: Props) {

  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  const renderFilterIcon = (children: any, operation: any) => {
    if (filterIconRender) {
      const flattened = indexPattern.flattenHit(row);
      if (flattened) {
        inlineFilter(column, flattened[column], operation);
        return filterIconRender(children, { field: column, values: flattened[column], operation })
      }
      return children;
    } else {
      return children
    }
  }

  const attributes = useMemo(() => {
    let attributes = {};
    if (timefield) {
      attributes = {
        className: "eui-textNoWrap",
        width: "1%",
      };
    } else if (sourcefield) {
      attributes = {
        className: "eui-textBreakAll eui-textBreakWord",
      };
    } else {
      attributes = {
        className:
          "kbnDocTableCell__dataField eui-textBreakAll eui-textBreakWord",
      };
    }
    return attributes;
  }, [timefield, sourcefield]);

  return (
    <td {...attributes} data-test-subj="docTableField">
      {formatted}
      <span className="kbnDocTableCell__filter">
        {filterable ? (
          <Space.Compact>
            {renderFilterIcon((
              <Tooltip title={i18nField['filter_for_value'] || "Filter for value"} placement="bottom">
                <Button
                  color="primary"
                  variant="filled"
                  size="small"
                  className="kbnDocTableRowFilterButton !w-24px !h-24px"
                  classNames={{ icon: '!h-14px !leading-14px' }}
                  icon={<CirclePlus className="w-14px h-14px" />}
                  onClick={() => {
                    const flattened = indexPattern.flattenHit(row);
                    if (flattened) {
                      inlineFilter(column, flattened[column], '+');
                    }
                  }}
                  data-column={column}
                />
              </Tooltip>
            ), '+')}
            {
              renderFilterIcon((
                <Tooltip title={i18nField['filter_out_value'] || "Filter out value"} placement="bottom">
                  <Button
                    color="primary"
                    variant="filled"
                    size="small"
                    className="kbnDocTableRowFilterButton !w-24px !h-24px"
                    classNames={{ icon: '!h-14px !leading-14px' }}
                    icon={<CircleMinus className="w-14px h-14px" />}
                    onClick={() => {
                      const flattened = indexPattern.flattenHit(row);
                      if (flattened) {
                        // 注意這裡傳入的是 '-'
                        inlineFilter(column, flattened[column], '-');
                      }
                    }}
                    data-column={column}
                    aria-label="Filter out value"
                  />
                </Tooltip>
              ), '-')
            }
          </Space.Compact>
        ) : null}
      </span>
    </td>
  );
};
