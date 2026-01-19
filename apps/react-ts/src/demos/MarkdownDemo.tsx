import Markdown from "@infinilabs/markdown";

const content = `
# Hello World

This is a sample markdown content.

- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third

[Link to Coco](https://coco.rs)

| Name   | Age | City      |
|--------|-----|-----------|
| Alice  | 30  | New York  |
| Bob    | 25  | San Francisco |
| Charlie| 35  | Los Angeles |

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

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
\`\`\`
`;

export default function MarkdownDemo() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Markdown Demo</h2>
      <Markdown content={content} />
    </div>
  );
}
