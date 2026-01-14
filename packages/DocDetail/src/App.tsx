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
            ai_insights: `
# Document Analysis: "106862408.jpg"

## Overview
This document is a detailed textual description of a corporate event photograph titled \`106862408.jpg.\` The analysis describes an indoor professional setting during INFINI.com's 2023 All Hands Meeting, capturing the environment, participants, and cultural elements.

## Key Insights & Themes

### 1. **Event Context & Purpose**
The image documents a formal company-wide gathering ("All Hands Meeting") for an organization named INFINI. The timing is significant—2023, the Year of the Rabbit—as reflected in the celebratory banner. The meeting appears to be a collaborative or informational session, likely for strategic planning or a new year kickoff, emphasizing organizational unity and forward momentum.

### 2. **Professional Environment & Atmosphere**
The setting is a modern, well-lit conference room designed for corporate functions. The structured seating, professional lighting, and presence of technology (laptops, a projector) indicate a prepared, business-focused environment. However, the casual postures of participants and personal belongings suggest a balanced atmosphere that is formal yet not overly rigid, promoting focused engagement.

### 3. **Cultural and Symbolic Elements**
A bilingual banner (English and Chinese) serves as a central visual motif. The Chinese phrase “兔飞猛进” (Rabbits leaping forward rapidly) is a culturally specific metaphor tied to the lunar year, symbolizing rapid progress and advancement. This highlights the organization's possible multicultural nature or global outlook, blending corporate identity with traditional symbolism.

### 4. **Visual Composition and Details**
The description notes a cohesive color palette (dominant blues, neutral tones, wood accents) and a clean, organized composition. The image perspective provides depth, drawing attention from the uniformly dressed participants toward the symbolic banner. Details like abstract artwork, branded attire, and patterned carpeting contribute to a narrative of a thoughtfully designed corporate space.

### 5. **Human Element and Team Identity**
Approximately ten individuals, mostly men with one woman visible, are depicted wearing uniform blue jackets with logos, signaling team or organizational belonging. Their engagement with laptops, notebooks, and personal items suggests active participation. The arrangement fosters a sense of collective purpose, underscoring themes of teamwork and shared enterprise.

## Relationships and Synthesis
The document intertwines physical setting, human activity, and symbolic communication to portray a snapshot of corporate culture. The environment supports the event's purpose, the participants' uniformity reflects organizational cohesion, and the banner bridges corporate messaging with cultural tradition. Together, these elements construct a narrative of a modern, globally-aware company marking a moment of collective planning and aspirational growth.

\`\`\`mermaid
mindmap
  root("Document Analysis: 106862408.jpg")
    Event Context & Purpose
      INFINI.com All Hands Meeting
      2023 – Year of the Rabbit
      Corporate gathering for strategy/kickoff
      Theme of progress and unity
    Professional Environment & Atmosphere
      Modern conference room
      Structured seating with technology
      Balanced formal yet relaxed tone
      Professional lighting & layout
    Cultural & Symbolic Elements
      Bilingual banner (English/Chinese)
      “兔飞猛进” – Rabbits leaping forward
      Metaphor for rapid advancement
      Blends corporate and traditional motifs
    Visual Composition & Details
      Dominant color palette: blues, neutrals, wood
      Organized perspective with depth
      Details: artwork, branded attire, carpet pattern
      Even, professional lighting
    Human Element & Team Identity
      ~10 participants in uniform attire
      Active engagement with tools
      Sense of collective purpose
      Represents organizational cohesion
\`\`\``,
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
