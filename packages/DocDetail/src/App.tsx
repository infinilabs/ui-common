import { Bot } from "lucide-react";
import { ActionButton, DocDetail } from "./components";

const App = () => {
  return (
    <div className="h-screen">
      <DocDetail
        data={{
          source: {
            type: "connector",
            name: "My Hugo Site",
            id: "e806831dacc3",
          },
          category: "report",
          categories: ["business", "quarterly_reports"],
          cover: "https://picsum.photos/seed/report-cover/640/360",
          title: "Q3 Business Report",
          summary: "An overview of the company financial performance for Q3.",
          type: "PDF",
          lang: "en",
          content:
            "This quarters revenue increased by 15%, driven by strong sales in the APAC region...",
          icon: "https://picsum.photos/seed/file-icon/40/40",
          thumbnail: "https://picsum.photos/seed/report-thumb/320/180",
          tags: ["finance", "quarterly", "business", "report"],
          url: "https://drive.google.com/file/d/abc123/view",
          size: 1048576,
          owner: {
            avatar: "https://picsum.photos/seed/user-avatar/64/64",
            username: "jdoe",
            userid: "user123",
          },
          metadata: {
            version: "1.2",
            department: "Finance",
            last_reviewed: "2024-10-20",
            file_extension: "pdf",
            icon_link: "https://picsum.photos/seed/filetype-icon/40/40",
            has_thumbnail: true,
            kind: "drive#file",
            parents: ["folder123"],
            properties: { shared: "true" },
            spaces: ["drive"],
            starred: false,
            driveId: "drive123",
            thumbnail_link: "https://picsum.photos/seed/file-thumb/320/180",
            video_media_metadata: {
              durationMillis: "60000",
              width: 1920,
              height: 1080,
            },
            image_media_metadata: { width: 1024, height: 768 },
            mime_type: "",

            // content_type: "markdown",
            // preview_url: "http://192.168.3.181:9101/coco-server/README.md",

            // content_type: "pdf",
            // preview_url: "http://192.168.3.181:9101/coco-server/test.pdf",

            // content_type: "docx",
            // preview_url:
            //   "http://192.168.3.181:9101/coco-server/OPHTHA_Listofacceptablefiletypes.docx",

            content_type: "pptx",
            preview_url:
              "http://192.168.3.181:9101/coco-server/Processes-file-tables.pptx",

            // content_type: "xlsx",
            // preview_url:
            //   "http://192.168.3.181:9101/coco-server/SaezZucman2020JEPData.xlsx",

            // content_type: "image",
            // preview_url: "http://192.168.3.181:9101/coco-server/a.jpg",

            // content_type: "video",
            // preview_url:
            //   "http://192.168.3.181:9101/coco-server/Screen Recording 2026-01-05 at 12.06.10 PM.mov",

            ai_insights: `# AI Interpretation\n### Welcome to XMarkdown！\n- Project 1 \n- Project 2\n- Project 3`,
          },
          last_updated_by: {
            user: {
              avatar: "https://picsum.photos/seed/editor-avatar/64/64",
              username: "editor123",
              userid: "editor123@example.com",
            },
            timestamp: "2024-11-01T15:30:00Z",
          },
        }}
        extraButtons={[
          <ActionButton icon={<Bot />}>Continue Chat</ActionButton>,
        ]}
      />
    </div>
  );
};

export default App;
