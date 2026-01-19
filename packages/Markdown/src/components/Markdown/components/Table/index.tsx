import { Table as AntTable } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import type { ColumnsType } from "antd/es/table";
import { Children, isValidElement, type FC, type ReactNode } from "react";

interface TableProps {
  children?: ReactNode;
}

const extractText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (isValidElement(node)) {
    return extractText(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  return "";
};

const parseTableChildren = (children: ReactNode) => {
  const columns: ColumnsType = [];
  const dataSource: AnyObject[] = [];

  const childArray = Children.toArray(children);

  for (const child of childArray) {
    if (!isValidElement(child)) continue;

    const tagName = child.type;

    if (tagName === "thead") {
      const trArray = Children.toArray(child.props.children);

      for (const tr of trArray) {
        if (!isValidElement(tr)) continue;

        const thArray = Children.toArray(tr.props.children);

        let index = 0;

        for (const th of thArray) {
          if (!isValidElement(th)) continue;

          const title = extractText(th.props.children);

          columns.push({
            title,
            dataIndex: `col_${index}`,
            key: `col_${index}`,
          });

          index++;
        }
      }
    }

    if (tagName === "tbody") {
      const trArray = Children.toArray(child.props.children);

      let rowIndex = 0;

      for (const tr of trArray) {
        if (!isValidElement(tr)) continue;

        const row: AnyObject = { key: `row_${rowIndex}` };

        const tdArray = Children.toArray(tr.props.children);

        let colIndex = 0;

        for (const td of tdArray) {
          if (!isValidElement(td)) continue;

          row[`col_${colIndex}`] = td.props.children;

          colIndex++;
        }

        dataSource.push(row);

        rowIndex++;
      }
    }
  }

  return { columns, dataSource };
};

const Table: FC<TableProps> = ({ children }) => {
  const { columns, dataSource } = parseTableChildren(children);

  return (
    <AntTable
      className="[&_table]:(w-full! table!)"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      bordered
    />
  );
};

export default Table;
