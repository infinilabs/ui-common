import React, { useContext } from 'react';
import { StringFieldProgressBar } from './string_progress_bar';
import { Bucket } from './types';
import { IndexPatternField } from '../../../../../data/public';
import './discover_field_bucket.scss';
import { Button, Tooltip, Typography } from 'antd';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { GlobalConfigContext } from '@/components';

interface Props {
  bucket: Bucket;
  field: IndexPatternField;
  onAddFilter: (field: IndexPatternField | string, value: string, type: '+' | '-') => void;
}

export function DiscoverFieldBucket({ field, bucket, onAddFilter }: Props) {
  const emptyTxt = 'Empty string';
  const { i18n } = useContext(GlobalConfigContext)
  const i18nField = i18n?.field || {}

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
          <Tooltip title={i18nField['filter_for_value'] || "Filter for value"} placement="top">
            <Button
              color="primary"
              variant="text"
              size="small"
              className="!w-24px !h-24px"
              classNames={{ icon: '!h-14px !leading-14px' }}
              icon={<CirclePlus className="w-14px h-14px" />}
              onClick={() => onAddFilter(field, bucket.value, '+')}
            />
          </Tooltip>
          <Tooltip title={i18nField['filter_out_value'] || "Filter out value"} placement="top">
            <Button
              color="primary"
              variant="text"
              size="small"
              className="!w-24px !h-24px"
              classNames={{ icon: '!h-14px !leading-14px' }}
              icon={<CircleMinus className="w-14px h-14px" />}
              onClick={() => onAddFilter(field, bucket.value, '-')}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
