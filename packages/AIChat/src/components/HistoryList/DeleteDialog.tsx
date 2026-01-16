import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";

import { type Chat } from "@/types/chat";
import { type KeyboardEvent } from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  active?: Chat;
  setIsOpen: (isOpen: boolean) => void;
  handleRemove: () => void;
  t?: TFunction;
}

const DeleteDialog = ({
  isOpen,
  active,
  setIsOpen,
  handleRemove,
  t: tProp,
}: DeleteDialogProps) => {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  const handleEnter = (event: KeyboardEvent, cb: () => void) => {
    if (event.code !== "Enter") return;

    event.stopPropagation();
    event.preventDefault();

    cb();
  };

  return (
    <Dialog
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      width={360}
      title={t("history_list.delete_modal.title")}
    >
      <div className="flex flex-col justify-between">
        <div className="text-sm mb-4">
          {t("history_list.delete_modal.description", {
            replace: [
              active?._source?.title ||
                active?._source?.message ||
                active?._id,
            ],
          })}
        </div>

        <div className="flex gap-4 self-end">
          <Button
              variant="outline"
              autoFocus
              onClick={() => setIsOpen(false)}
              onKeyDown={(event) => {
                handleEnter(event, () => {
                  setIsOpen(false);
                });
              }}
            >
              {t("history_list.delete_modal.button.cancel")}
            </Button>

          <Button
              variant="destructive"
              className="text-white"
              onClick={handleRemove}
              onKeyDown={(event) => {
                handleEnter(event, handleRemove);
              }}
            >
              {t("history_list.delete_modal.button.delete")}
            </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
