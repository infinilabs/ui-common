import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import { ZoomOut } from 'lucide-react';
import { GlobalConfigContext } from '@/components';

export interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export function DocViewTableRowBtnFilterRemove({ onClick, disabled = false }: Props) {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  const tooltipContent = disabled ? (
    i18nField['unindexed_field_warning'] || "Unindexed fields can not be searched"
  ) : (
    i18nField['filter_out_value'] || "Filter out value"
  );

  return (
    <Tooltip title={tooltipContent}>
      <Button
        size="small"
        className="kbnDocViewer__actionButton !flex-inline !items-center !justify-center"
        classNames={{ icon: '!h-14px !leading-14px' }}
        icon={<ZoomOut className="w-14px h-14px" />}
        onClick={onClick}
        color="primary"
        variant="text"
        disabled={disabled}
      />
    </Tooltip>
  );
}
