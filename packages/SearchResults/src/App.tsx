import SearchResults, { type SearchResultsItem } from "./components";

const items: SearchResultsItem[] = [
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
    fileType: "word"
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
    fileType: "pdf"
  },
  {
    type: "imageGroup",
    id: "image-group-1",
    title: "图片",
    columns: 3,
    footerAction: { label: "所有图片 >", href: "#" },
    items: [
      {
        type: "media",
        id: "img-1",
        mediaType: "image",
        title: "云原生技术架构白皮书",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-1/800/600",
        sourceLabel: "Google Drive",
        categoryLabel: "素材"
      },
      {
        type: "media",
        id: "img-2",
        mediaType: "image",
        title: "云原生搜索平台合作方案",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-2/800/600",
        sourceLabel: "Google Drive",
        categoryLabel: "检索白皮"
      },
      {
        type: "media",
        id: "img-3",
        mediaType: "image",
        title: "AI 搜索在企业知识管理中的应用",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-3/800/600",
        sourceLabel: "Confluence",
        categoryLabel: "调研报告"
      }
    ]
  },
  {
    type: "videoGroup",
    id: "video-group-1",
    title: "视频",
    columns: 3,
    footerAction: { label: "所有视频 >", href: "#" },
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
        categoryLabel: "教程"
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
        categoryLabel: "培训"
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
        categoryLabel: "技术"
      }
    ]
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl">
        <SearchResults items={items} />
      </div>
    </div>
  );
}
