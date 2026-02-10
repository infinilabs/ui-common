import React, { useContext } from 'react';
import { FilePlusCorner } from 'lucide-react';
import { Button, Tooltip } from 'antd';
import { GlobalConfigContext } from '@/components';

export interface Props {
  onClick: () => void;
  disabled?: boolean;
  scripted?: boolean;
}

export function DocViewTableRowBtnFilterExists({
  onClick,
  disabled = false,
  scripted = false,
}: Props) {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  const tooltipContent = disabled ? (
    scripted ? (
      i18nField['scripted_field_presence_error'] || "Unable to filter for presence of scripted fields"
    ) : (
      i18nField['meta_field_presence_error'] || "Unable to filter for presence of meta fields"
    )
  ) : (
    i18nField['filter_for_field_present'] || "Filter for field present"
  );

  return (
    <Tooltip title={tooltipContent}>
      <Button
        size="small"
        className="kbnDocViewer__actionButton !flex-inline !items-center !justify-center"
        classNames={{ icon: '!h-14px !leading-14px' }}
        icon={<FilePlusCorner className="w-14px h-14px" />}
        onClick={onClick}
        color="primary"
        variant="text"
        disabled={disabled}
      />
    </Tooltip>
  );
}
