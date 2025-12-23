import { Button } from "@/components/ui/button";
import { Paperclip, Send, Mic, MicOff } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

type ActionsBarProps = {
  listening: boolean;
  speechSupported: boolean;
  imagesCount: number;
  maxImages: number;
  onVoiceToggle: () => void;
  onAttachClick: () => void;
  onSend: () => void;
};

export default function ActionsBar({
  listening,
  speechSupported,
  imagesCount,
  maxImages,
  onVoiceToggle,
  onAttachClick,
  onSend,
}: ActionsBarProps) {
  const { t } = useI18n();
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("action.attach")}
        onClick={onAttachClick}
        disabled={imagesCount >= maxImages}
      >
        <Paperclip className="size-4" />
      </Button>
      <Button
        variant={listening ? "default" : "ghost"}
        size="icon"
        aria-label={t("action.voiceInput")}
        onClick={onVoiceToggle}
        disabled={!speechSupported}
        title={
          speechSupported
            ? listening
              ? t("voice.stop")
              : t("voice.start")
            : t("voice.unsupported")
        }
      >
        {listening ? <Mic className="size-4" /> : <MicOff className="size-4" />}
      </Button>

      <Button
        variant="default"
        size="icon"
        aria-label={t("action.send")}
        onClick={onSend}
      >
        <Send className="size-4" />
      </Button>
    </>
  );
}
