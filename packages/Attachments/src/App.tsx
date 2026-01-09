import { nanoid } from "nanoid";
import type {
  AttachmentProps,
  AttachmentStatus,
} from "./components/Attachment";
import Attachments from "./components/Attachments";

const getRandomSize = (): string => {
  const units = ["B", "KB", "MB", "GB"];
  const unit = units[Math.floor(Math.random() * units.length)];
  const size = Math.floor(Math.random() * 1000) + 1;
  return `${size}${unit}`;
};

const App = () => {
  const data: AttachmentProps[] = [
    "ts",
    "js",
    "rs",
    "xml",
    "yaml",
    "yml",
    "go",
    "php",
    "css",
    "jsx",
    "tsx",
    "svg",
    "rb",
    "html",
    "htm",
    "epub",
    "java",
    "sql",
    "vue",
    "json",
    "py",
    "sass",
    "scss",
    "toml",
    "c",
    "cpp",
    "cc",
    "cxx",
    "h",
    "hpp",
    "md",
    "txt",
    "xlsx",
    "xls",
    "csv",
    "pptx",
    "ppt",
    "mp4",
    "avi",
    "mov",
    "wmv",
    "flv",
    "webm",
    "mkv",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "bmp",
    "webp",
    "ico",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "pdf",
    "docx",
    "doc",
    "mp3",
    "wav",
    "flac",
    "aac",
    "ogg",
    "wma",
    "ai",
    "xd",
    "fl",
    "pr",
    "pre",
    "lr",
    "ae",
    "id",
    "indd",
    "dmg",
    "au",
    "psd",
    "sketch",
    "sh",
    "bash",
    "zsh",
    "fish",
    "unknown",
  ].map((extname) => {
    const id = nanoid();

    return {
      id,
      filename: `${id}.${extname}`,
      extname,
      size: getRandomSize(),
      status: ["uploading", "analyzing", "failed", "uploaded"][
        Math.floor(Math.random() * 4)
      ] as AttachmentStatus,
    };
  });

  return <Attachments data={data} />;
};

export default App;
