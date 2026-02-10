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
import React from 'react';
import { EuiToolTip, EuiButtonIcon } from '@elastic/eui';
import { Button, Tooltip } from 'antd';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface Props {
  onClick: () => void;
  isCollapsed: boolean;
}

export function DocViewTableRowBtnCollapse({ onClick, isCollapsed }: Props) {
  const label = 'Toggle field details';
  return (
    <Tooltip title={label}>
      <Button
        size="small"
        className="!flex-inline !items-center !justify-center !h-20px !w-20px"
        classNames={{ icon: '!h-14px !leading-14px' }}
        icon={isCollapsed ? <ChevronRight className="w-14px h-14px" /> : <ChevronDown className="w-14px h-14px" />}
        onClick={() => onClick()}
        color="primary"
        variant="link"
      />
    </Tooltip>
  );
}
