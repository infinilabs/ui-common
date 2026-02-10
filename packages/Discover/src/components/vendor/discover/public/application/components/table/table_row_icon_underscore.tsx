import React from 'react';
import { Tooltip } from 'antd';
import { AlertTriangle } from 'lucide-react'; 

export function DocViewTableRowIconUnderscore() {
  const ariaLabel = 'Warning';
  const tooltipContent = 'Field names beginning with _ are not supported';

  return (
    <Tooltip title={tooltipContent}>
      <span 
        className="inline-flex items-center justify-center cursor-pointer h-20px" 
      >
        <AlertTriangle 
          className="kbnDocViewer__warning !text-[var(--ant-color-warning)]"
          size={14} 
          data-test-subj="underscoreWarning"
          strokeWidth={2.5} 
        />
      </span>
    </Tooltip>
  );
}
