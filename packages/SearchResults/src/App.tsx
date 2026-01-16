import SearchResults, {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
} from "./components";
import clsx from "clsx";
import { useState } from "react";
import type {
  SearchResultImageGroupItem,
  SearchResultVideoGroupItem,
} from "./components";
import { dataDemo } from "./data";

const viewAllImagesAction = {
  label: "所有图片 >",
  onClick: () => window.alert("所有图片"),
};

const viewAllVideosAction = {
  label: "所有视频 >",
  onClick: () => window.alert("所有视频"),
};

const item1 = {
  source: {
    type: "connector",
    name: "My Hugo Site",
    id: "e806831dacc3",
  },
  category: "report",
  categories: ["business", "quarterly_reports"],
  cover: "https://example.com/images/report_cover.jpg",
  title: "Q3 Business Report",
  summary: "An overview of the company financial performance for Q3.",
  type: "PDF",
  lang: "en",
  content:
    "This quarters revenue increased by 15%, driven by strong sales in the APAC region...",
  icon: "https://example.com/images/icon.png",
  thumbnail: "https://example.com/images/report_thumbnail.jpg",
  tags: ["finance", "quarterly", "business", "report"],
  url: "https://drive.google.com/file/d/abc123/view",
  size: 1048576,
  owner: {
    avatar: "https://example.com/images/user_avatar.jpg",
    username: "jdoe",
    userid: "user123",
  },
  metadata: {
    version: "1.2",
    department: "Finance",
    last_reviewed: "2024-10-20",
    file_extension: "pdf",
    icon_link: "https://example.com/images/file_icon.png",
    has_thumbnail: true,
    kind: "drive#file",
    parents: ["folder123"],
    properties: { shared: "true" },
    spaces: ["drive"],
    starred: false,
    driveId: "drive123",
    thumbnail_link: "https://example.com/images/file_thumbnail.jpg",
    video_media_metadata: {
      durationMillis: "60000",
      width: 1920,
      height: 1080,
    },
    image_media_metadata: { width: 1024, height: 768 },
  },
  last_updated_by: {
    user: {
      avatar: "https://example.com/images/editor_avatar.jpg",
      username: "editor123",
      userid: "editor123@example.com",
    },
    timestamp: "2024-11-01T15:30:00Z",
  },
  isActive: true,
};

const item2 = [
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju0",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "黑色壁纸全屏🌌,探索星空的奥秘✨",
    metadata: { content_type: "image" },
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://gips1.baidu.com/it/u=3579958525,4293415030&fm=3074&app=3074&f=PNG?w=2560&h=1440",
    url: "https://gips1.baidu.com/it/u=3579958525,4293415030&fm=3074&app=3074&f=PNG?w=2560&h=1440",
  },
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju1",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "摄影壁纸创意图,捕捉山水间的灵动之美🏞️",
    metadata: { content_type: "image" },
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://img1.baidu.com/it/u=3879890807,997649473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    url: "https://img1.baidu.com/it/u=3879890807,997649473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  },
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju0",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "摄影壁纸创意图,捕捉山水间的灵动之美🏞️",
    metadata: { content_type: "image" },
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://img2.baidu.com/it/u=1088560728,493918909&fm=253&app=138&f=JPEG?w=889&h=500",
    url: "https://img2.baidu.com/it/u=1088560728,493918909&fm=253&app=138&f=JPEG?w=889&h=500",
  },
];

const item3 = [
  {
    category: "视频",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "video-0",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "connector-video",
      name: "视频库",
      type: "connector",
    },
    summary: "",
    tags: ["视频"],
    title: "城市夜景延时摄影",
    metadata: { content_type: "video" },
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail: "https://picsum.photos/seed/video-thumb-0/640/360",
    url: "https://example.com/video/0",
  },
  {
    category: "视频",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "video-1",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "connector-video",
      name: "视频库",
      type: "connector",
    },
    summary: "",
    tags: ["视频"],
    title: "海边日落慢镜头",
    metadata: { content_type: "video" },
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail: "https://picsum.photos/seed/video-thumb-1/640/360",
    url: "https://example.com/video/1",
  },
];

const item4: SearchResultImageGroupItem = {
  type: "imageGroup",
  id: "image-group-0",
  title: "图片组",
  columns: 3,
  footerAction: viewAllImagesAction,
  items: [
    {
      type: "image",
      id: "img-group-0",
      title: "黑色壁纸全屏",
      imageUrl:
        "https://gips1.baidu.com/it/u=3579958525,4293415030&fm=3074&app=3074&f=PNG?w=2560&h=1440",
      subtitle: "壁纸",
    },
    {
      type: "image",
      id: "img-group-1",
      title: "摄影壁纸创意图",
      imageUrl:
        "https://img1.baidu.com/it/u=3879890807,997649473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
      subtitle: "壁纸",
    },
    {
      type: "image",
      id: "img-group-2",
      title: "摄影壁纸创意图",
      imageUrl:
        "https://img2.baidu.com/it/u=1088560728,493918909&fm=253&app=138&f=JPEG?w=889&h=500",
      subtitle: "壁纸",
    },
  ],
};

const item5: SearchResultVideoGroupItem = {
  type: "videoGroup",
  id: "video-group-0",
  title: "视频组",
  columns: 3,
  footerAction: viewAllVideosAction,
  items: [
    {
      type: "media",
      id: "video-group-item-0",
      mediaType: "video",
      title: "城市夜景延时摄影",
      href: "https://example.com/video/0",
      cover: "https://picsum.photos/seed/video-thumb-0/640/360",
      sourceLabel: "视频库",
      categoryLabel: "视频",
    },
    {
      type: "media",
      id: "video-group-item-1",
      mediaType: "video",
      title: "海边日落慢镜头",
      href: "https://example.com/video/1",
      cover: "https://picsum.photos/seed/video-thumb-1/640/360",
      sourceLabel: "视频库",
      categoryLabel: "视频",
    },
  ],
};

const item6 = [
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju7",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "黑色壁纸全屏🌌,探索星空的奥秘✨",
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://gips1.baidu.com/it/u=3579958525,4293415030&fm=3074&app=3074&f=PNG?w=2560&h=1440",
    url: "https://gips1.baidu.com/it/u=3579958525,4293415030&fm=3074&app=3074&f=PNG?w=2560&h=1440",
    metadata: {
      content_type: "image",
    },
  },
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju1",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "摄影壁纸创意图,捕捉山水间的灵动之美🏞️",
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://img1.baidu.com/it/u=3879890807,997649473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    url: "https://img1.baidu.com/it/u=3879890807,997649473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    metadata: {
      content_type: "image",
    },
  },
  {
    category: "壁纸",
    content: "",
    created: "2025-08-08T02:17:29.394215628Z",
    icon: "",
    id: "d2alse8qlqbca26pbju8",
    lang: "cn",
    last_updated_by: {
      timestamp: "2025-08-08T02:25:00Z",
      user: {
        username: "test",
      },
    },
    owner: {
      username: "test",
    },
    size: 1048576,
    source: {
      id: "d2aloi8qlqbca26pbilg",
      name: "壁纸",
      type: "connector",
    },
    summary: "",
    tags: ["壁纸"],
    title: "摄影壁纸创意图,捕捉山水间的灵动之美🏞️",
    updated: "2025-08-08T02:45:38.382266717Z",
    thumbnail:
      "https://img2.baidu.com/it/u=1088560728,493918909&fm=253&app=138&f=JPEG?w=889&h=500",
    url: "https://img2.baidu.com/it/u=1088560728,493918909&fm=253&app=138&f=JPEG?w=889&h=500",
    metadata: {
      content_type: "image",
    },
  },
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
    ) {
      return "dark";
    }
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  const isDark = theme === "dark";
  return (
    <div
      className={clsx(
        "min-h-screen p-6",
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      )}
    >
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="flex items-center justify-end">
          <button
            type="button"
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={clsx(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition",
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 focus-visible:ring-slate-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300",
              "focus:outline-none focus-visible:ring-2"
            )}
          >
            切换到{isDark ? "浅色" : "深色"}
          </button>
        </div>

        <SearchResults
          section={{
    "id": "d5b157162feae57f8546013628eed5a8",
    "created": "2026-01-09T02:06:26.883Z",
    "updated": "2026-01-09T02:06:26.883Z",
    "_system": {
        "owner_id": "d5g7fuk61mdm7gqr6lv0",
        "parent_path": "/",
        "tenant_id": "d44nbqs61mdjqgtg51jg"
    },
    "metadata": {
        "ai_insights": "# Document Analysis: \"103451680.jpg\"\n\n## Overview\nThis document is a detailed metadata record for a digital image file titled \"103451680.jpg,\" depicting an indoor social scene. The analysis reveals a structured digital asset management system with comprehensive contextual information about the image's content, origin, and technical properties.\n\n## Key Insights & Themes\n\n### 1. **Content & Visual Analysis**\nThe core of the document is the detailed textual description of the image content, generated through automated analysis. The scene captures two men in a casual indoor setting—likely a market or food court—with industrial-style architecture. Key visual elements include:\n- **Foreground Subjects:** Two men (Zhang San and Li Si) engaged with personal devices; one in a pink polo, the other in a blue T-shirt with a smiley face.\n- **Atmosphere & Setting:** Dim ambient lighting, exposed ceilings with ductwork, and a moderately busy public space suggesting social interaction.\n- **Cultural Context:** Visible Chinese characters in the background indicate a Chinese-speaking location, while the style suggests urban commercial recreation.\n\n### 2. **Digital Asset Management**\nThe document exemplifies systematic digital archiving with multiple layers of metadata:\n- **Technical Metadata:** Includes image dimensions (3648×2736), MIME type, file size (~2MB), and color palette (black, gray, pink).\n- **Administrative Metadata:** Creation/update timestamps (2026), ownership details, tenant/parent path identifiers, and source attribution (\"公司活动图片\" – Company Event Photos).\n- **User Attribution:** Links two individuals (Zhang San and Li Si) to the image via avatar data and naming, suggesting the photo is associated with them or their profiles within the system.\n\n### 3. **System Integration & Workflow**\nThe structure indicates integration within a larger content management or collaboration platform:\n- The `source` field specifies a \"connector\" named \"公司活动图片,\" implying automated ingestion from a defined channel for company event photos.\n- Chunked document text with embeddings suggests the description is vectorized for search or AI retrieval.\n- Attachment references (thumbnail, cover) point to a dedicated storage system for preview generation.\n\n### 4. **Thematic Relationships**\n- **Human-Centric Documentation:** The image is not just a file but is contextualized by the people in it (Zhang San, Li Si) and the owner (\"rustfs\"), weaving a narrative of company activity and social documentation.\n- **Space & Interaction:** The description emphasizes the casual, informal interaction in a semi-public commercial space, aligning with the \"company event\" source—possibly a team outing or informal gathering.\n- **Technology & Observation:** Both subjects are handling devices (smartphone, possibly a wallet/phone), highlighting the role of personal technology in modern social environments and the act of recording or being recorded.\n\n## Structural Relationships\nThe document bridges raw digital data (pixels, metadata) with human-readable context (descriptions, user associations, titles). It serves both archival and retrieval purposes, enabling not just storage but also discoverability through rich annotations. The focus on visual details, participant identification, and ambient atmosphere transforms a simple image file into a documented moment with social and operational significance.\n\n```mermaid\nmindmap\n  root(103451680.jpg Analysis)\n    Content & Visual Analysis\n      Foreground Subjects\n        Zhang San (pink polo, glasses)\n        Li Si (smiley T-shirt, glasses)\n        Device interaction\n      Setting & Atmosphere\n        Indoor commercial/recreational space\n        Industrial-style interior\n        Chinese-language context\n      Visual Composition\n        Depth of field focus\n        Color contrast (bright vs. dark)\n        Casual social interaction\n    Digital Asset Management\n      Technical Metadata\n        Image dimensions: 3648×2736\n        MIME type: image/jpeg\n        Color palette: black, gray, pink\n      Administrative Metadata\n        Timestamps (2026-01-09)\n        Ownership & tenant IDs\n        Source: \"公司活动图片\" connector\n      User Attribution\n        Zhang San (avatar linked)\n        Li Si (avatar linked)\n        Owner: \"rustfs\"\n    System Integration & Workflow\n      Automated Ingestion\n        Connector source for company events\n        Chunked text with embeddings\n      Storage & Retrieval\n        Thumbnail & cover attachments\n        Vectorized description for search\n        Structured JSON metadata\n    Thematic Relationships\n      Human-Centric Documentation\n        Associates individuals with image\n        Suggests company activity narrative\n      Space & Interaction\n        Informal gathering context\n        Public indoor social environment\n      Technology & Observation\n        Subjects using personal devices\n        Act of recording/being recorded\n    Structural Significance\n      Bridges digital data & human context\n      Enables archival & AI retrieval\n      Transforms image into documented moment\n```",
        "colors": [
            "black",
            "gray",
            "pink"
        ],
        "content_type": "image",
        "height": 2736,
        "mime_type": "image/jpeg",
        "url_is_raw_content": true,
        "users": [
            {
                "avatar": "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",
                "name": "张三"
            },
            {
                "avatar": "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",
                "name": "李四"
            }
        ],
        "width": 3648
    },
    "source": {
        "type": "connector",
        "name": "公司活动图片",
        "id": "d5g7jgp4d9vd7p1tok1g",
        "icon": "font_infinilabs"
    },
    "type": "file",
    "category": "/",
    "title": "103451680.jpg",
    "summary": "This document analyzes metadata for an image file, detailing a casual indoor scene of two men at a company event. It exemplifies systematic digital asset management, linking technical file data with human context for archival and retrieval purposes.",
    "icon": "https://dev.infini.cloud:27200/assets/icons/connector/s3/file.png",
    "thumbnail": "https://dev.infini.cloud:27200/attachment/d5irq494d9v3mq6otn80",
    "cover": "https://dev.infini.cloud:27200/attachment/d5irq494d9v3mq6otn7g",
    "owner": {
        "username": "v0.1",
        "userid": "rustfs"
    },
    "tags": [
        "indoor",
        "scene",
        "foreground subjects",
        "atmosphere",
        "setting",
        "cultural",
        "technical metadata",
        "image dimensions"
    ],
    "url": "https://dev.infini.cloud:27200//#/preview/document/d5b157162feae57f8546013628eed5a8",
    "size": 2089214
}}
          theme={theme}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        {/* <SearchResults
          section={dataDemo.map((hit) => hit._source)}
          theme={theme}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        <SearchResultsImageGroup
          section={item2}
          theme={theme}
          footerAction={viewAllImagesAction}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        <SearchResultsImageGroup
          section={item6}
          theme={theme}
          footerAction={viewAllImagesAction}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        <SearchResultsVideoGroup
          section={item3}
          theme={theme}
          footerAction={viewAllVideosAction}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        <SearchResultsImageGroup
          section={item4}
          theme={theme}
          onItemClick={(item) => {
            const href = "href" in item ? item.href : undefined;
            if (typeof href === "string") window.open(href);
          }}
        />

        <SearchResultsVideoGroup
          section={item5}
          theme={theme}
          onItemClick={(item) => {
            const href = "href" in item ? item.href : undefined;
            if (typeof href === "string") window.open(href);
          }}
        /> */}
      </div>
    </div>
  );
}
