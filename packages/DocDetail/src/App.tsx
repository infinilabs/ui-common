import { Bot } from "lucide-react";
import { ActionButton, DocDetail } from "./components";

const App = () => {
  return (
    <div className="h-screen">
      <DocDetail
        data={{
          type: "file",
          source: {
            name: "My Hugo Site",
          },
          category: "report",
          title: "Q3 Business Report",
          icon: "https://picsum.photos/seed/file-icon/40/40",
          size: 1048576,
          url: "http://192.168.3.181:9101/coco-server/test.pdf",
          metadata: {
            content_type: "pdf",
            ai_insights: `# AI Interpretation\n### Welcome to XMarkdown！\n- Project 1 \n- Project 2\n- Project 3`,
          },
          owner: {
            title: "Alice Johnson",
          },
          created: "2026-01-09T02:30:10.188Z",
          updated: "2026-01-09T02:30:10.188Z",
        }}
        extraButtons={[
          <ActionButton key="bot" icon={<Bot />}>
            Continue Chat
          </ActionButton>,
        ]}
      />
    </div>
  );
};

export default App;
