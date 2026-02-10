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
import React, { useContext } from 'react';
import { EuiToolTip, EuiButtonIcon } from '@elastic/eui';
import { Button, Tooltip } from 'antd';
import { Columns3 } from 'lucide-react';
import { GlobalConfigContext } from '@/components';

export interface Props {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function DocViewTableRowBtnToggleColumn({ onClick, active, disabled = false }: Props) {
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}
  const tooltipContent = disabled ? null : (
    i18nField['toggle_column_in_table'] || "Toggle column in table"
  );
  return (
    <Tooltip title={tooltipContent}>
      <Button
        size="small"
        className={`kbnDocViewer__actionButton !flex-inline !items-center !justify-center ${active ? '!bg-[var(--ant-btn-bg-color-hover)]' : ''}`}
        classNames={{ icon: '!h-14px !leading-14px' }}
        icon={<Columns3 className="w-14px h-14px" />}
        onClick={onClick}
        color="primary"
        variant="text"
        disabled={disabled}
      />
    </Tooltip>
  );
}
