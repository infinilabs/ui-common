import React, { useContext, useRef, useCallback } from 'react';
import { Tooltip, Button } from 'antd';
import { SortOrder } from './helpers';
import { MoveDown, MoveLeft, MoveRight, MoveUp, X } from 'lucide-react';
import { GlobalConfigContext } from '@/components';

interface Props {
  colLeftIdx: number;
  colRightIdx: number;
  displayName: string;
  isRemoveable: boolean;
  isSortable: boolean;
  name: string;
  onChangeSortOrder?: (sortOrder: SortOrder[]) => void;
  onMoveColumn?: (name: string, idx: number) => void;
  onRemoveColumn?: (name: string) => void;
  sortOrder: SortOrder[];
  columnWidth?: number;
  onColumnResize?: (name: string, width: number) => void;
}

export function TableHeaderColumn({
  colLeftIdx,
  colRightIdx,
  displayName,
  isRemoveable,
  isSortable,
  name,
  onChangeSortOrder,
  onMoveColumn,
  onRemoveColumn,
  sortOrder,
  columnWidth,
  onColumnResize
}: Props) {
  const { i18n } = useContext(GlobalConfigContext);
  const i18nField = i18n?.field || {};
  const thRef = useRef<HTMLTableCellElement>(null);
  const [, sortDirection = ''] =
    sortOrder.find((sortPair) => name === sortPair[0]) || [];
  const currentSortWithoutColumn = sortOrder.filter((pair) => pair[0] !== name);
  const currentColumnSort = sortOrder.find((pair) => pair[0] === name);
  const currentColumnSortDirection =
    (currentColumnSort && currentColumnSort[1]) || '';

  const handleChangeSortOrder = () => {
    if (!onChangeSortOrder) return;
    if (currentColumnSort === undefined) {
      onChangeSortOrder([...currentSortWithoutColumn, [name, 'asc']]);
    } else if (currentColumnSortDirection === 'asc') {
      onChangeSortOrder([...currentSortWithoutColumn, [name, 'desc']]);
    } else if (
      currentColumnSortDirection === 'desc' &&
      currentSortWithoutColumn.length === 0
    ) {
      onChangeSortOrder([[name, 'asc']]);
    } else {
      onChangeSortOrder(currentSortWithoutColumn);
    }
  };

  const getSortButtonAriaLabel = () => {
    if (currentColumnSort === undefined)
      return i18nField['ascending'] || `Sort ${name} ascending`;
    if (sortDirection === 'asc')
      return i18nField['descending'] || `Sort ${name} descending`;
    if (sortDirection === 'desc' && currentSortWithoutColumn.length === 0)
      return i18nField['ascending'] || `Sort ${name} ascending`;
    return i18nField['stop_sorting'] || `Stop sorting on ${name}`;
  };

  const getSortIcon = () => {
    if (sortDirection === 'asc') return <MoveUp className="w-12px h-12px" />;
    if (sortDirection === 'desc') return <MoveDown className="w-12px h-12px" />;
    return <MoveUp className="w-12px h-12px" />;
  };

  const buttons = [
    {
      active: isSortable && typeof onChangeSortOrder === 'function',
      ariaLabel: getSortButtonAriaLabel(),
      onClick: handleChangeSortOrder,
      testSubject: `docTableHeaderFieldSort_${name}`,
      tooltip: getSortButtonAriaLabel(),
      icon: getSortIcon()
    },
    {
      active: isRemoveable && typeof onRemoveColumn === 'function',
      ariaLabel: i18nField['remove_column'] || `Remove ${name} column`,
      onClick: () => onRemoveColumn && onRemoveColumn(name),
      testSubject: `docTableRemoveHeader-${name}`,
      tooltip: i18nField['remove_column'] || 'Remove Column',
      icon: <X className="w-12px h-12px" />
    },
    {
      active: colLeftIdx >= 0 && typeof onMoveColumn === 'function',
      ariaLabel: i18nField['move_to_left'] || `Move ${name} column to the left`,
      onClick: () => onMoveColumn && onMoveColumn(name, colLeftIdx),
      testSubject: `docTableMoveLeftHeader-${name}`,
      tooltip: i18nField['move_to_left'] || `Move ${name} column to the left`,
      icon: <MoveLeft className="w-12px h-12px" />
    },
    {
      active: colRightIdx >= 0 && typeof onMoveColumn === 'function',
      ariaLabel:
        i18nField['move_to_right'] || `Move ${name} column to the right`,
      onClick: () => onMoveColumn && onMoveColumn(name, colRightIdx),
      testSubject: `docTableMoveRightHeader-${name}`,
      tooltip: i18nField['move_to_right'] || `Move ${name} column to the right`,
      icon: <MoveRight className="w-12px h-12px" />
    }
  ];

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const th = thRef.current;
      if (!th) return;
      const startWidth = th.offsetWidth;

      const onMouseMove = (ev: MouseEvent) => {
        const newWidth = Math.max(50, startWidth + (ev.clientX - startX));
        onColumnResize?.(name, newWidth);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [name, onColumnResize]
  );

  const thStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    position: 'relative'
  };
  if (columnWidth !== undefined) {
    thStyle.width = columnWidth;
    thStyle.minWidth = columnWidth;
    thStyle.maxWidth = columnWidth;
  }

  return (
    <th
      ref={thRef}
      data-test-subj="docTableHeaderField"
      style={thStyle}
    >
      <span data-test-subj={`docTableHeader-${name}`}>
        {displayName}
        {buttons
          .filter((button) => button.active)
          .map((button, idx) => (
            <Tooltip
              title={button.tooltip}
              key={`button-${idx}`}
            >
              <Button
                type="text"
                size="small"
                classNames={{ icon: '!w-12px !h-12px !leading-12px' }}
                icon={button.icon}
                onClick={button.onClick}
                aria-label={button.ariaLabel}
                data-test-subj={button.testSubject}
                className="!w-20px !h-20px ml-4px"
              />
            </Tooltip>
          ))}
      </span>
      {onColumnResize && (
        <div
          className="column-resize-handle"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </th>
  );
}
