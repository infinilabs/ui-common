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
          section={item1}
          theme={theme}
          onRecordClick={(record) => {
            if (typeof record.url === "string") window.open(record.url);
          }}
        />

        <SearchResults
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
        />
      </div>
    </div>
  );
}
