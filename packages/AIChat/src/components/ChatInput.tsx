import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSize } from "ahooks";
import clsx from "clsx";
import { X, Loader2, AlertCircle } from "lucide-react";

import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import AutoResizeTextarea from "./AutoResizeTextarea";
import ChatIcons, { type SendMessageParams } from "./ChatIcons";
import InputControls from "./InputControls";
import { useChatStore } from "../stores/chatStore";
import { Upload } from "../api/axiosRequest";

function getAttachmentIconId(extname?: string) {
  switch (extname) {
    case "ts":
      return "font_file_typescript";
    case "js":
      return "font_file_javascript";
    case "rs":
      return "font_file_rustscript1";
    case "xml":
      return "font_file_xml";
    case "yaml":
    case "yml":
      return "font_file_yaml";
    case "go":
      return "font_file_golang";
    case "php":
      return "font_file_php";
    case "css":
      return "font_file_css";
    case "jsx":
    case "tsx":
      return "font_file_react";
    case "svg":
      return "font_file_svg";
    case "rb":
      return "font_file_ruby";
    case "html":
    case "htm":
      return "font_file_html";
    case "epub":
      return "font_file_epub";
    case "java":
      return "font_file_java";
    case "sql":
      return "font_file_sql";
    case "vue":
      return "font_file_vue";
    case "json":
      return "font_file_json";
    case "py":
      return "font_file_python";
    case "sass":
    case "scss":
      return "font_file_sass";
    case "toml":
      return "font_file_toml";
    case "c":
    case "cpp":
    case "cc":
    case "cxx":
    case "h":
    case "hpp":
      return "font_file_csource";
    case "md":
      return "font_file_markdown";
    case "txt":
      return "font_file_txt";
    case "xlsx":
    case "xls":
      return "font_file_spreadsheet_excel";
    case "csv":
      return "font_file_csv";
    case "pptx":
    case "ppt":
      return "font_file_presentation_powerpoint";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
    case "webm":
    case "mkv":
      return "font_file_video";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "webp":
    case "ico":
      return "font_file_image";
    case "zip":
    case "rar":
    case "7z":
    case "tar":
    case "gz":
      return "font_file_zip";
    case "pdf":
      return "font_file_document_pdf";
    case "docx":
    case "doc":
      return "font_file_document_word";
    case "mp3":
    case "wav":
    case "flac":
    case "aac":
    case "ogg":
    case "wma":
      return "font_file_audio";
    case "ai":
      return "font_file_adobe_ai";
    case "xd":
      return "font_file_adobe_xd";
    case "fl":
      return "font_file_adobe_fl";
    case "pr":
    case "pre":
      return "font_file_adobe_pr";
    case "lr":
      return "font_file_adobe_lr";
    case "ae":
      return "font_file_adobe_ae";
    case "id":
    case "indd":
      return "font_file_adobe_id";
    case "dmg":
      return "font_file_dmg";
    case "au":
      return "font_file_adobe_au";
    case "psd":
      return "font_file_adobe_psd";
    case "sketch":
      return "font_file_sketch";
    case "sh":
    case "bash":
    case "zsh":
    case "fish":
      return "font_file_erminalsettings1";
    default:
      return "font_file_unknown";
  }
}

function AttachmentPreviewIcon({ extname }: { extname?: string }) {
  return (
    <svg className="w-5 h-5 shrink-0" aria-hidden="true">
      <use xlinkHref={`#${getAttachmentIconId(extname)}`} />
    </svg>
  );
}

interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  chatPlaceholder?: string;
  /** Max number of attachments allowed in a single message. Defaults to 5. */
  maxAttachments?: number;
  /** Endpoint used to upload attachments. Defaults to `/attachment/_upload`. */
  attachmentUploadUrl?: string;
  /** Accepted file types for the file picker (e.g. "image/*,.pdf"). */
  attachmentAccept?: string;
}

interface PendingAttachment {
  /** Local id used for list reconciliation; replaced by server id after upload. */
  localId: string;
  /** Server-assigned attachment id. Present after successful upload. */
  id?: string;
  name: string;
  size: number;
  status: "uploading" | "uploaded" | "error";
  error?: string;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

type UploadResponse = {
  acknowledged?: boolean;
  result?: { attachments?: string[] };
  attachments?: string[];
};
import type { TFunction } from "i18next";

interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  chatPlaceholder?: string;
  t?: TFunction;
  locale?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  inputValue,
  changeInput,
  chatPlaceholder,
  maxAttachments = 5,
  attachmentUploadUrl = "/attachment/_upload",
  attachmentAccept,
  t: tProp,
  locale,
}: ChatInputProps) {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  const curChatEnd = useChatStore((state) => state.curChatEnd);
  const currentAssistant = useChatStore((state) => state.currentAssistant);

  // TODO: Check if the assistant supports deep thinking and deep research
  // Currently defaulting to true as per requirements
  const isDeepThinkActive = !!(currentAssistant?._source?.deep_think_enabled ?? true);
  const deepResearchActive = !!(currentAssistant?._source?.deep_research_enabled ?? true);

  const textareaRef = useRef<{ reset: () => void; focus: () => void }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);

  const [lineCount, setLineCount] = useState(1);
  const committedRef = useRef("");
  const {
    supported: speechSupported,
    listening,
    start,
    stop,
  } = useSpeechRecognition({
    lang: locale || "zh-CN",
    autoRestart: true,
    onInterim: (interim) => {
      const composed =
        committedRef.current +
        (interim ? (committedRef.current ? " " : "") + interim : "");
      changeInput(composed);
    },
    onFinal: (finalText) => {
      if (finalText) {
        committedRef.current =
          (committedRef.current ? committedRef.current + " " : "") + finalText;
        changeInput(committedRef.current);
      }
    },
  });

  const handleVoiceToggle = () => {
    if (listening) {
      stop();
      changeInput(committedRef.current);
    } else {
      committedRef.current = inputValue;
      start();
    }
  };

  // -------------------- Attachments --------------------
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);

  const uploadingCount = attachments.filter((a) => a.status === "uploading").length;
  const uploadedIds = attachments
    .filter((a) => a.status === "uploaded" && a.id)
    .map((a) => a.id as string);
  const hasUploaded = uploadedIds.length > 0;

  const openFilePicker = useCallback(() => {
    if (disabled) return;
    if (attachments.length >= maxAttachments) return;
    fileInputRef.current?.click();
  }, [disabled, attachments.length, maxAttachments]);

  const removeAttachment = useCallback((localId: string) => {
    setAttachments((list) => list.filter((a) => a.localId !== localId));
  }, []);

  const uploadFile = useCallback(
    async (file: File, localId: string) => {
      const [err, res] = await Upload<UploadResponse>(attachmentUploadUrl, [file]);
      const serverIds =
        (res?.result?.attachments as string[] | undefined) ??
        (res?.attachments as string[] | undefined) ??
        [];
      setAttachments((list) =>
        list.map((a) => {
          if (a.localId !== localId) return a;
          if (err || serverIds.length === 0) {
            return {
              ...a,
              status: "error",
              error:
                (err as { message?: string } | undefined)?.message ||
                t("search.input.attachment_upload_failed") ||
                "Upload failed",
            };
          }
          return { ...a, status: "uploaded", id: serverIds[0] };
        })
      );
    },
    [attachmentUploadUrl, t]
  );

  const handleFilesPicked = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const remaining = maxAttachments - attachments.length;
      const picked = Array.from(files).slice(0, Math.max(0, remaining));
      const additions: PendingAttachment[] = picked.map((f) => ({
        localId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
        status: "uploading",
      }));
      setAttachments((list) => [...list, ...additions]);
      picked.forEach((file, i) => {
        const localId = additions[i].localId;
        // Fire-and-forget; uploadFile updates state on completion.
        void uploadFile(file, localId);
      });
      // Reset the input so picking the same file again still fires onChange.
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [attachments.length, maxAttachments, uploadFile]
  );
  // -----------------------------------------------------

  const handleSubmit = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (uploadingCount > 0) return; // wait for uploads to finish
    if (!trimmedValue && uploadedIds.length === 0) return;
    changeInput("");
    setAttachments([]);
    onSend({
      message: trimmedValue,
      attachments: uploadedIds.length > 0 ? uploadedIds : undefined,
      deep_thinking: isDeepThinkActive,
      search: deepResearchActive,
    });
  }, [
    inputValue,
    onSend,
    changeInput,
    isDeepThinkActive,
    deepResearchActive,
    uploadingCount,
    uploadedIds,
  ]);

  const handleInputChange = useCallback(
    (value: string) => {
      changeInput(value);
      if (listening) {
        committedRef.current = value;
      }
    },
    [changeInput, listening]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderTextarea = () => {
    return (
      <AutoResizeTextarea
        ref={textareaRef}
        input={inputValue}
        setInput={handleInputChange}
        handleKeyDown={handleKeyDown}
        chatPlaceholder={chatPlaceholder}
        lineCount={lineCount}
        onLineCountChange={setLineCount}
        firstLineMaxWidth={containerSize?.width ?? 0}
        disabled={disabled}
      />
    );
  };

  const handleIconSend = (params: SendMessageParams) => {
    if (uploadingCount > 0) return;
    const trimmedValue = (params.message ?? "").trim();
    if (!trimmedValue && uploadedIds.length === 0) return;
    changeInput("");
    setAttachments([]);
    onSend({
      ...params,
      message: trimmedValue,
      attachments: uploadedIds.length > 0 ? uploadedIds : params.attachments,
      deep_thinking: isDeepThinkActive,
      search: deepResearchActive,
    });
  };

  const renderExtraIcon = () => (
    <div className="flex items-center gap-2 w-fit">
      <ChatIcons
        curChatEnd={curChatEnd}
        inputValue={inputValue}
        onSend={handleIconSend}
        speechSupported={speechSupported}
        listening={listening}
        onVoiceToggle={handleVoiceToggle}
        onAttachClick={
          attachments.length >= maxAttachments ? undefined : openFilePicker
        }
        attachmentCount={attachments.length}
        canSendWithoutText={hasUploaded}
        disableSend={uploadingCount > 0}
        t={t}
      />
    </div>
  );

  return (
    <div
      className={`w-full p-1 relative rounded-xl overflow-hidden border-[#F0F0F0] dark:border-[#303030]`}
      style={{
        backgroundColor: 'var(--ant-color-bg-container)',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={attachmentAccept}
        style={{ display: "none" }}
        onChange={(e) => handleFilesPicked(e.target.files)}
      />
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-1 pt-1 pb-1">
          {attachments.map((a) => (
            <div
              key={a.localId}
              className={`border-1px border-solid border-[#F0F0F0] dark:border-[#303030] ${a.status === "error" ? "!border-[var(--ant-color-error)]" : ""} flex items-center gap-1.5 px-2 py-1 rounded-md text-xs max-w-[240px]`}
              style={{
                backgroundColor: "var(--ant-color-fill-quaternary)",
                color: "var(--ant-color-text)",
              }}
              title={
                a.status === "error"
                  ? a.error || "Upload failed"
                  : `${a.name} (${formatBytes(a.size)})`
              }
            >
              {a.status === "uploading" && (
                <Loader2 size={12} className="animate-spin shrink-0" />
              )}
              {(a.status === "uploaded" || a.status === "error") && (
                <AttachmentPreviewIcon
                  extname={a.name.split(".").pop()?.toLowerCase()}
                />
              )}
              {a.status === "error" && (
                <AlertCircle
                  size={12}
                  className="shrink-0"
                  style={{ color: "var(--ant-color-error)" }}
                />
              )}
              <span className="truncate max-w-[180px]">{a.name}</span>
              <span
                className="text-[10px] opacity-60 shrink-0"
                style={{ color: "var(--ant-color-text-tertiary)" }}
              >
                {formatBytes(a.size)}
              </span>
              <button
                type="button"
                className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer shrink-0"
                onClick={() => removeAttachment(a.localId)}
                title={t("search.input.attachment_remove") || "Remove"}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div
        ref={containerRef}
        className={`rounded-sm flex items-center transition-all relative`}
        style={{
          backgroundColor: 'var(--ant-color-fill-quaternary)',
          color: 'var(--ant-color-text)',
        }}
      >
        <div
          className={clsx("min-h-[48px] w-full p-2 bg-transparent", {
            "flex items-center gap-2": lineCount === 1,
          })}
        >
          {renderTextarea()}

          {lineCount === 1 && renderExtraIcon()}

          {lineCount > 1 && (
            <div className="flex items-center mt-2">
              <div className="flex-1"></div>
              <div className="self-end">{renderExtraIcon()}</div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-2">
        <InputControls
          isDeepThinkActive={isDeepThinkActive}
          isDeepResearchActive={deepResearchActive}
        />
      </div>
    </div>
  );
}
