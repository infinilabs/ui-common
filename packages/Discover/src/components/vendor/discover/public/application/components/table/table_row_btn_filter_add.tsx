import React, { useContext } from 'react';
import { ZoomIn } from 'lucide-react';
import { Button, Tooltip } from 'antd';
import { GlobalConfigContext } from '@/components';

export interface Props {
  onClick: () => void;
  disabled: boolean;
}

export function DocViewTableRowBtnFilterAdd({ onClick, disabled = false }: Props) {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

  const tooltipContent = disabled ? (
    i18nField['unindexed_field_warning'] || "Unindexed fields can not be searched"
  ) : (
    i18nField['filter_for_value'] || "Filter for value"
  );

  return (
    <Tooltip title={tooltipContent}>
      <Button
        size="small"
        className="kbnDocViewer__actionButton !flex-inline !items-center !justify-center"
        classNames={{ icon: '!h-14px !leading-14px' }}
        icon={<ZoomIn className="w-14px h-14px" />}
        onClick={onClick}
        color="primary"
        variant="text"
        disabled={disabled}
      />
    </Tooltip>
  );
}
