import { DocDetail } from "./components";

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
            mime_type: "text/markdown",
            preview_url: "http://192.168.3.181:9101/coco-server/README.md",

            // mime_type:'application/pdf',
            // preview_url: "http://192.168.3.181:9101/coco-server/test.pdf",

            // mime_type:
            //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
            // preview_url: "http://192.168.3.181:9101/coco-server/代码片段.docx",

            // mime_type:
            //   "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            // preview_url: "http://192.168.3.181:9101/coco-server/Processes-file-tables.pptx",

            // mime_type:
            //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            // preview_url:
            //   "http://192.168.3.181:9101/coco-server/SaezZucman2020JEPData.xlsx",

            // mime_type: "image/jpg",
            // preview_url: "http://192.168.3.181:9101/coco-server/a.jpg",

            // mime_type: "video/mov",
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
      />
    </div>
  );
};

export default App;
