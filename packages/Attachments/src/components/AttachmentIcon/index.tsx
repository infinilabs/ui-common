import type { FC, HTMLAttributes } from "react";

export interface AttachmentIconProps extends HTMLAttributes<SVGElement> {
  extname?: string;
}

const AttachmentIcon: FC<AttachmentIconProps> = (props) => {
  const { extname, ...rest } = props;

  const getFontName = () => {
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
  };

  return (
    <svg {...rest}>
      <use xlinkHref={`#${getFontName()}`}></use>
    </svg>
  );
};

export default AttachmentIcon;
