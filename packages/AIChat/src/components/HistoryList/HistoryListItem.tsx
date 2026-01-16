import {
  type FC,
  useRef,
  useCallback,
  useState,
  useEffect,
  type KeyboardEvent,
  type FocusEvent,
} from "react";
import { Ellipsis } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { Pencil, Trash2 } from "lucide-react";
import { Popover } from "antd";

import { Input } from "@/components/ui/input";
import type { Chat } from "@/types/chat";

interface HistoryListItemProps {
  item: Chat;
  active?: Chat;
  onSelect: (chat: Chat) => void;
  onRename: (chatId: string, title: string) => void;
  onMouseEnter: () => void;
  handleDelete: () => void;
  highlightId: string;
  t?: TFunction;
}

const HistoryListItem: FC<HistoryListItemProps> = ({
  item,
  active,
  onSelect,
  onRename,
  onMouseEnter,
  highlightId,
  handleDelete,
  t: tProp,
}) => {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const { _id, _source } = item;
  const title = (_source?.title ?? _id) as string;
  const isSelected = item._id === active?._id;
  const isHovered = item._id === highlightId;

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      moreButtonRef.current?.click();
    },
    [moreButtonRef]
  );

  const handleRename = useCallback(() => {
    if (highlightId) {
      setIsEdit(true);
    }
  }, [highlightId]);

  const menuItems = [
    // {
    //   label: "history_list.menu.share",
    //   icon: Share2,
    //   onClick: () => {},
    // },
    {
      label: "history_list.menu.rename",
      icon: Pencil,
      shortcut: "R",
      onClick: handleRename,
    },
    {
      label: "history_list.menu.delete",
      icon: Trash2,
      shortcut: "D",
      iconColor: "#FF2018",
      onClick: handleDelete,
    },
  ];

  useEffect(() => {
    if (open && isEdit) {
      requestAnimationFrame(() => setOpen(false));
    }
  }, [isEdit, open]);

  const popoverContent = (
    <div
      className="flex flex-col gap-1"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {menuItems.map((menuItem) => {
        const { label, icon: Icon, iconColor, onClick } = menuItem;

        return (
          <button
            key={label}
            className="flex items-center gap-2 p-1 text-sm rounded-md hover:bg-muted transition text-left cursor-pointer"
            onClick={() => {
              onClick();
              setOpen(false);
            }}
          >
            <Icon
              className="size-4"
              style={{
                color: iconColor,
              }}
            />

            <span>{t(label)}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <li
      key={_id}
      id={_id}
      className={clsx(
        "group flex w-full items-center mt-1 h-10 rounded-lg cursor-pointer hover:bg-[#EDEDED] dark:hover:bg-[#353F4D] transition-colors relative",
        {
          "bg-[#E5E7EB] dark:bg-[#2B3444]": isSelected,
          "bg-[#EDEDED] dark:bg-[#353F4D]": isHovered && !isSelected,
        }
      )}
      onClick={() => {
        if (!isSelected) {
          setIsEdit(false);
        }

        onSelect(item);
      }}
      onMouseEnter={onMouseEnter}
      onContextMenu={onContextMenu}
    >
      <div
        className={clsx("w-1 h-6 rounded-sm bg-[#0072FF]", {
          "opacity-0": item._id !== active?._id,
        })}
      />

      <div className="flex-1 flex items-center justify-between gap-2 px-2 overflow-hidden">
        {isEdit && isSelected ? (
          <Input
            autoFocus
            defaultValue={title}
            className="flex-1 -mx-px h-7"
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key !== "Enter") return;

              event.stopPropagation();

              const value = event.currentTarget.value;

              onRename(item._id || "", value);

              setIsEdit(false);
            }}
            onBlur={(event: FocusEvent<HTMLInputElement>) => {
              const value = event.currentTarget.value;

              onRename(item._id || "", value);

              setIsEdit(false);
            }}
          />
        ) : (
          <span className="truncate">{title}</span>
        )}

        <div
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Popover
            open={open}
            onOpenChange={setOpen}
            content={popoverContent}
            trigger="click"
            placement="bottomRight"
            arrow={false}
            getPopupContainer={(trigger) => trigger.closest("li") || document.body}
          >
            <button
              ref={moreButtonRef}
              className={clsx(
                "flex gap-2 bg-transparent border-none p-0 cursor-pointer outline-none",
                {
                  "opacity-100 pointer-events-auto":
                    open || (!isEdit && (isSelected || isHovered)),
                  "opacity-0 pointer-events-none": !(
                    open ||
                    (!isEdit && (isSelected || isHovered))
                  ),
                }
              )}
            >
              <Ellipsis className="size-4 text-[#979797]" />
            </button>
          </Popover>
        </div>
      </div>
    </li>
  );
};

export default HistoryListItem;
