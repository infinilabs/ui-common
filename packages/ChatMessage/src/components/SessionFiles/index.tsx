import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, Checkbox, Typography } from "antd";
import { Trash, X } from "lucide-react";
import { Attachment } from "@infinilabs/attachments";

import Icon from "./components/Icon";

const { Text } = Typography;

const SessionFiles = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="[&_.ant-btn-icon]:flex">
      <Button
        type="primary"
        className="fixed! top-21 right-5"
        icon={<Icon className="block size-5 text-white" />}
        onClick={toggleOpen}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-1000 top-20 bottom-20 right-4 flex flex-col rounded-xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.1)]"
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
              padding: 0,
            }}
            animate={{
              width: 800,
              height: "auto",
              opacity: 1,
              padding: 24,
            }}
            exit={{
              width: 0,
              height: 0,
              opacity: 0,
              padding: 0,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">Files in the conversation</span>

              <Button
                type="text"
                icon={<X className="size-5" />}
                onClick={toggleOpen}
              />
            </div>

            <div className="flex items-center justify-between gap-2 my-3">
              <Text type="secondary">
                Only the selected files will participate in the current
                conversation
              </Text>

              <div className="inline-flex items-center gap-3 pr-3">
                <span>All</span>

                <Checkbox />
              </div>
            </div>

            <div className="flex-1 overflow-auto flex flex-col gap-2">
              {[
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
              ].map((item) => (
                <Attachment
                  key={item}
                  id={item}
                  status="uploaded"
                  filename={`uploaded-${item}-file.${item}`}
                  extname={item}
                  size="1MB"
                  className="w-full! p-0!"
                  extra={
                    <div className="inline-flex items-center gap-3">
                      <Text
                        type="secondary"
                        className="cursor-pointer transition hover:text-[#ff4d4f]!"
                      >
                        <Trash className="size-4" />
                      </Text>

                      <Checkbox />
                    </div>
                  }
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SessionFiles;
