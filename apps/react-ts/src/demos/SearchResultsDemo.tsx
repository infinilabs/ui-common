import SearchResults, {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
  type SearchResultImageGroupItem,
  type SearchResultListItem,
  type SearchResultVideoGroupItem,
  type SearchResultsItem,
  type SearchResultsRecord
} from "@infinilabs/search-results";
import clsx from "clsx";
import { useState } from "react";

const searchResultItems: SearchResultsItem[] = [
  {
    type: "result",
    id: "result-0",
    title: "云原生知识检索平台：接入与使用指南",
    href: "https://example.com/docs/search-guide",
    thumbnailUrl: "https://picsum.photos/seed/ai-summary-thumb/320/180",
    thumbnailAlt: "缩略图",
    fileType: "word",
    source: "Google",
    description:
      "AI 摘要：本文档介绍如何配置数据源、设置分类与权限，并通过语义检索与过滤器快速定位知识内容；同时支持摘要生成与高亮片段匹配。",
    onClick: () => window.alert("点击：result-0（有 onClick 时不走 href）")
  },
  {
    type: "result",
    id: "result-1",
    title: "12306网上订火车票官网 【高铁网】_12306铁路客服中心网站",
    href: "https://www.12306.cn/index/",
    description:
      "铁路12306网站（含手机客户端）是中国铁路唯一官方火车票网络售票平台，从未授权任何第三方平台发售火车票……",
    thumbnailUrl: "https://picsum.photos/seed/12306-result-1/320/180",
    breadcrumbs: ["数据源", "Categories"],
    author: "zouweinan",
    date: "2024-12-10",
    fileType: "word",
  },
  {
    type: "result",
    id: "result-2",
    title: "Q3 Business Report",
    href: "https://drive.google.com/file/d/abc123/view",
    description: "An overview of the company financial performance for Q3.",
    thumbnailUrl: "https://picsum.photos/seed/report-result-2/320/180",
    breadcrumbs: ["My Hugo Site", "business / quarterly_reports"],
    author: "editor123",
    date: "2024-11-01",
    fileType: "pdf",
  },
  {
    type: "imageGroup",
    id: "image-group-1",
    title: "图片",
    columns: 3,
    items: [
      {
        type: "media",
        id: "img-1",
        mediaType: "image",
        title: "云原生技术架构白皮书",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-1/800/600",
        sourceLabel: "Google Drive",
        categoryLabel: "素材",
        onClick: () => window.alert("点击：img-1（有 onClick 时不走 href）")
      },
      {
        type: "media",
        id: "img-2",
        mediaType: "image",
        title: "云原生搜索平台合作方案",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-2/800/600",
        sourceLabel: "Google Drive",
        categoryLabel: "检索白皮",
      },
      {
        type: "media",
        id: "img-3",
        mediaType: "image",
        title: "AI 搜索在企业知识管理中的应用",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-3/800/600",
        sourceLabel: "Confluence",
        categoryLabel: "调研报告",
      },
    ],
  },
  {
    type: "videoGroup",
    id: "video-group-1",
    title: "视频",
    columns: 3,
    items: [
      {
        type: "media",
        id: "vid-1",
        mediaType: "video",
        title: "如何使用搜索：从查询到洞察",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/video-group-1/800/600",
        matchCountText: "匹配片段数量 12",
        sourceLabel: "视频库",
        categoryLabel: "教程",
        onClick: () => window.alert("点击：vid-1（有 onClick 时不走 href）")
      },
      {
        type: "media",
        id: "vid-2",
        mediaType: "video",
        title: "企业知识库治理最佳实践",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/video-group-2/800/600",
        matchCountText: "匹配片段数量 6",
        sourceLabel: "视频库",
        categoryLabel: "培训",
      },
      {
        type: "media",
        id: "vid-3",
        mediaType: "video",
        title: "向量检索与 RAG 实战",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/video-group-3/800/600",
        matchCountText: "匹配片段数量 18",
        sourceLabel: "视频库",
        categoryLabel: "技术",
      },
    ],
  },
];

export default function SearchResultsDemo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDark = theme === "dark";

  const listResults = searchResultItems.filter((item): item is SearchResultListItem => item.type === "result");
  const imageGroup = searchResultItems.find((item): item is SearchResultImageGroupItem => item.type === "imageGroup");
  const videoGroup = searchResultItems.find((item): item is SearchResultVideoGroupItem => item.type === "videoGroup");

  const recordImageItems: SearchResultsRecord[] = [
    {
      id: "record-image-0",
      type: "image",
      title: "记录图片：示例 0",
      cover: "https://picsum.photos/seed/record-image-0/800/600",
      url: "https://example.com/record-image-0",
      source: { name: "Records" },
      category: "图片",
      metadata: { has_thumbnail: true }
    },
    {
      id: "record-image-1",
      type: "image",
      title: "记录图片：示例 1",
      cover: "https://picsum.photos/seed/record-image-1/800/600",
      url: "https://example.com/record-image-1",
      source: { name: "Records" },
      category: "图片",
      metadata: { has_thumbnail: true }
    }
  ];

  const recordVideoItems: SearchResultsRecord[] = [
    {
      id: "record-video-0",
      type: "video",
      title: "记录视频：示例 0",
      cover: "https://picsum.photos/seed/record-video-0/800/600",
      url: "https://example.com/record-video-0",
      source: { name: "Records" },
      category: "视频",
      metadata: { has_thumbnail: true }
    },
    {
      id: "record-video-1",
      type: "video",
      title: "记录视频：示例 1",
      cover: "https://picsum.photos/seed/record-video-1/800/600",
      url: "https://example.com/record-video-1",
      source: { name: "Records" },
      category: "视频",
      metadata: { has_thumbnail: true }
    }
  ];

  return (
    <div
      className={clsx(
        "space-y-10 rounded-xl border p-6 transition-colors",
        isDark ? "border-slate-800 bg-slate-950 text-slate-100" : "border-slate-200 bg-white text-slate-900"
      )}
    >
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
        section={listResults}
        theme={theme}
        onItemClick={(item) => window.alert(`onItemClick: ${item.type} / ${item.id}`)}
      />

      {imageGroup ? (
        <SearchResultsImageGroup
          section={imageGroup}
          theme={theme}
          footerAction={{ label: "所有图片 >", onClick: () => window.alert("所有图片") }}
          onItemClick={(item) => window.alert(`onItemClick: ${item.type} / ${item.id}`)}
        />
      ) : null}

      {videoGroup ? (
        <SearchResultsVideoGroup
          section={videoGroup}
          theme={theme}
          footerAction={{ label: "所有视频 >", onClick: () => window.alert("所有视频") }}
          onItemClick={(item) => window.alert(`onItemClick: ${item.type} / ${item.id}`)}
        />
      ) : null}

      <SearchResultsImageGroup
        section={recordImageItems}
        theme={theme}
        footerAction={{ label: "记录图片 >", onClick: () => window.alert("记录图片 footer") }}
        onRecordClick={(record, index) => window.alert(`onRecordClick: image / ${record.title} / ${index}`)}
      />

      <SearchResultsVideoGroup
        section={recordVideoItems}
        theme={theme}
        footerAction={{ label: "记录视频 >", onClick: () => window.alert("记录视频 footer") }}
        onRecordClick={(record, index) => window.alert(`onRecordClick: video / ${record.title} / ${index}`)}
      />
    </div>
  );
}
