import { EuiIcon } from "@elastic/eui";
import { Button } from "antd";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  onClick: ()=>void;
}


export function Open({open, onClick}: Props) {
  return (
    <td
      className="kbnDocTableCell__toggleDetails !pt-4px"
    >
      <Button
        type="text"
        size="small"
        className="flex items-center justify-center"
        classNames={{ icon: '!h-14px !leading-14px' }}
        onClick={onClick} 
        icon={
          open ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )
        }
      />
    </td>
  );
};
