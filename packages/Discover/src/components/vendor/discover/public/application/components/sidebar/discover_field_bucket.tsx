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
import { StringFieldProgressBar } from './string_progress_bar';
import { Bucket } from './types';
import { IndexPatternField } from '../../../../../data/public';
import './discover_field_bucket.scss';
import { Button, Tooltip, Typography } from 'antd';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface Props {
  bucket: Bucket;
  field: IndexPatternField;
  onAddFilter: (field: IndexPatternField | string, value: string, type: '+' | '-') => void;
}

export function DiscoverFieldBucket({ field, bucket, onAddFilter }: Props) {
  const emptyTxt = 'Empty string';
  const addLabel = `Filter for ${field.name}: "${bucket.value}"`;
  const removeLabel = `Filter out ${field.name}: "${bucket.value}"`;

  return (
    <div className='flex justify-between gap-8px mb-12px'>
      <div className='flex-1 max-w-[calc(100%-48px-8px)]'>
        <div className="flex items-center justify-between gap-1 w-full min-w-0">
          <div className="flex-1 min-w-0">
            <Typography.Text
              className="text-xs truncate block"
              aria-label={bucket.display}
            >
              {bucket.display === '' ? emptyTxt : bucket.display}
            </Typography.Text>
          </div>

          <div className="flex-none">
            <Typography.Text
              type="secondary"
              className="text-xs whitespace-nowrap"
            >
              {bucket.percent}%
            </Typography.Text>
          </div>
        </div>
        <StringFieldProgressBar
          value={bucket.value}
          percent={bucket.percent}
          count={bucket.count}
        />
      </div>
      {field.filterable && (
        <div>
          <Button
            color="primary"
            variant="text"
            size="small"
            className="!w-24px !h-24px"
            classNames={{ icon: '!h-14px !leading-14px' }}
            icon={<CirclePlus className="w-14px h-14px" />}
            onClick={() => onAddFilter(field, bucket.value, '+')}
          />
          <Button
            color="primary"
            variant="text"
            size="small"
            className="!w-24px !h-24px"
            classNames={{ icon: '!h-14px !leading-14px' }}
            icon={<CircleMinus className="w-14px h-14px" />}
            onClick={() => onAddFilter(field, bucket.value, '-')}
          />
        </div>
      )}
    </div>
  );
}
