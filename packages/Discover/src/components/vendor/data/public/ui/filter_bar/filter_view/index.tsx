import { useInnerText } from '@elastic/eui';
import React, { FC } from 'react';
import { FilterLabel } from '../';
import { Filter, isFilterPinned } from '../../../../common';
import type { FilterLabelStatus } from '../filter_item';
import { Tag } from 'antd';

interface Props {
  filter: Filter;
  valueLabel: string;
  filterLabelStatus: FilterLabelStatus;
  errorMessage?: string;
  [propName: string]: any;
}

export const FilterView: FC<Props> = ({
  filter,
  iconOnClick,
  onClick,
  valueLabel,
  errorMessage,
  filterLabelStatus,
  className,
  ...rest
}: Props) => {
  const [ref, innerText] = useInnerText();

  let title =
    errorMessage || `Filter: ${innerText}. Select for more filter actions.`;

  if (isFilterPinned(filter)) {
    title = `'Pinned', ${title}`;
  }
  if (filter.meta.disabled) {
    title = `'Disabled', ${title}`;
  }

  return (
    <Tag
      title={title}
      closable
      onClose={(e) => {
        e.preventDefault();
        iconOnClick();
      }}
      onClick={onClick}
      className={`${className} !bg-transparent !p-0 !text-14px flex items-center`}
      {...rest}
    >
      <span ref={ref}>
        <FilterLabel
          filter={filter}
          valueLabel={valueLabel}
          filterLabelStatus={filterLabelStatus}
        />
      </span>
    </Tag>
  );
};
