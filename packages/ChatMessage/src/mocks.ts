import type { IChunkData } from "./types/chat";

export const deepResearchMockChunks: IChunkData[] = [
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "system",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "reply_start",
    message_chunk: "",
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_planner_start",
    message_chunk: "",
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_planner_end",
    message_chunk: JSON.stringify([
      "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础",
      "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势",
      "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势",
      "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现",
      "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径",
      "第六步：汇总所有信息，形成对Coco AI的全面认知和总结"
    ]),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "TDBC 2025 大会聚焦 AI 与数据库融合，极限科技发布新一代 Coco AI 搜索平台",
              "url": "http://infinilabs.cn/blog/2025/infinilabs-appeared-at-TDBC-2025-sharing-coco-ai/",
              "content": "2025 年 7 月 17 日 在北京召开的 TDBC 2025 可信数据库发展大会·人工智能与数据库融合发展分论坛 上，国内领先的搜索数据库及解决方案提供商 极限科技（INFINI Labs）正式发布其创新产品 —— Coco AI，一款面向企业的 AI 智能搜索与高效协作平台。极限数据（北京）科技有限公司创始人曾勇在《下一代企业搜索与 AI 的融合探索》主题演讲中，深入探讨了企业搜索的未来趋势及 Coco AI 的核心价值。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技通过国家高新技术企业认定",
              "url": "http://infinilabs.cn/blog/2024/news-20241129/",
              "content": "2024 年 10 月 29 日，国家高新技术企业认定管理工作网公示了北京市认定机构 2024 年认定报备的第一批高新技术企业备案名单，极限数据（北京）科技有限公司 顺利通过本次高新技术企业评审，并首次获得 国家级“高新技术企业”认定。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜讯！极限科技荣获 2023 年第一批“北京大数据企业”认定！",
              "url": "http://infinilabs.cn/blog/2023/news-20230510/",
              "content": "近日，极限数据（北京）科技有限公司顺利通过北京大数据协会 2023 年第一批大数据企业认定，并正式获得北京大数据协会颁发的《大数据企业证书》。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI v0.7.0 发布 - 全新的文件搜索体验与全屏化的集成功能",
              "url": "http://infinilabs.cn/blog/2025/release-20250728/",
              "content": "INFINI Labs 产品更新发布！此次更新主要包括 Coco AI v0.7.0 新增 macOS Spotlight 和 Windows 文件搜索支持、语音输入功能，以及全屏集成模式；Easysearch v1.14.0 引入完整文本嵌入模型、语义检索 API 和搜索管道功能等，全面提升产品性能和稳定性。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技新获得一项国家发明专利授权：《搜索数据库的正排索引处理方法、装置、介质和设备》",
              "url": "http://infinilabs.cn/blog/2024/news-20240622/",
              "content": "近日，极限数据（北京）科技有限公司（简称：极限科技）新获得一项国家发明专利授权，专利名为 “搜索数据库的正排索引处理方法、装置、介质和设备”，专利号：ZL 2024 1 0479400.9，授权日为 2024 年 6 月 21 日，标志着极限科技在数据库搜索技术领域的自主创新能力再次得到国家级认可。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Easysearch 时序数据的基于时间范围的合并策略",
              "url": "http://infinilabs.cn/blog/2025/time-range-mergepolicy-for-easysearch/",
              "content": "Easysearch 新功能：使用时间范围合并策略优化你的时序索引",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技再获国家发明专利：《一种超大规模分布式集群架构的数据处理方法》，引领大数据处理技术创新",
              "url": "http://infinilabs.cn/blog/2024/news-20240712/",
              "content": "近日，极限数据（北京）科技有限公司（简称：极限科技）传来喜讯，公司再次斩获国家发明专利授权。这项名为&quot;一种超大规模分布式集群架构的数据处理方法&quot;的专利（专利号：ZL 2024 1 0479402.8）于 2024 年 7 月 12 日正式获得授权，彰显了极限科技在大数据处理技术领域的创新实力。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "为 Kibana 添加代理和基础安全",
              "url": "http://infinilabs.cn/blog/2023/proxy_kibana/",
              "content": "如果你的 Kibana 版本比较多或者比较旧，或者没有设置 TLS 和身份信息，那么任何人都有可能直接访问 Kibana，而使用极限网关可以快速的进行修复。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Tauri（一）——更适合 Web 开发人员的桌面应用开发解决方案 ✅",
              "url": "http://infinilabs.cn/blog/2024/Tauri-1/",
              "content": "背景 #  我们最近决定开发一个开源的桌面端应用程序（先卖个关子，会尽快推出，敬请期待！关注一下不迷路！），并选择了 Tauri 作为技术方案。可能只有少部分人了解过它，感兴趣的朋友们可以一起深入探讨！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读",
              "url": "http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/",
              "content": "4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第一步：确定Coco AI的基本定义和背景信息，包括其开发公司、发布时间和技术基础"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读",
              "url": "http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/",
              "content": "4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】Coco AI 全景解读：开源智能搜索与知识管理革新",
              "url": "http://infinilabs.cn/blog/2025/live-event-oschina-with-coco-0523/",
              "content": "📣 INFINI Labs &amp; 开源中国 联合举办 Coco AI 专场直播活动来袭！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "极限科技 Coco AI 荣获 2025 首届人工智能应用创新大赛全国一等奖",
              "url": "http://infinilabs.cn/blog/2025/coco-ai-won-first-prize-at-the-2025-AI-innovation-competition/",
              "content": "由中国技术经济学会主办的 2025 首届全国人工智能应用创新大赛 总决赛于 6 月 22 日在湖南大学圆满落幕。该赛事以“场景驱动・创新创业”为主题，旨在考察参赛选手设计 AI 智能体（AI Agent）、应用人工智能大模型技术解决实际问题的能力。本届大赛吸引了全国 632 所高校及 210 家企业的 4913 支团队参赛，经过层层选拔，最终 689 支团队晋级全国总决赛。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "极限科技携企业搜索与 AI 搜索创新产品亮相 “2025 中国石油石化人工智能创新应用交流大会”",
              "url": "http://infinilabs.cn/blog/2025/infinilabs-appeared-at-2025-china-petrochemical-ai-innovation-conferency/",
              "content": "北京，2025 年 12 月 3 日 —— 为积极响应国家“人工智能+”行动号召，推动人工智能技术与油气行业深度融合，由中国石油学会油气数字化智能化专业委员会、中国石油、中国石化、中国海油、国家管网、中国中化等中央企业数字化部门联合主办的“2025 中国石油石化人工智能创新应用交流大会”在北京隆重开幕。本次大会以“AI 赋能石油石化高质量创新发展”为主题，汇聚了众多两院院士、行业专家及领军企业，共同探讨人工智能在能源领域的创新应用与未来路径。作为专注于智能数据与分析领域的高新技术企业，极限科技（北京）科技有限公司（以下简称“极限科技”）受邀参会，并正式向行业展示其自主研发的两款核心产品 —— 企业搜索引擎 “ INFINI Easysearch” 与 企业 AI 搜索与智能中心 “ Coco AI”，旨在为石油石化行业的数字化转型与智能化升级提供坚实的技术底座和场景化解决方案。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "大量索引场景下 Easysearch 和 Elasticsearch 的吞吐量差异",
              "url": "http://infinilabs.cn/blog/2023/throughput-difference-between-easysearch-and-es/",
              "content": "最近有客户在使用 Elasticsearch 搜索服务时发现集群有掉节点，并且有 master 收集节点信息超时的日志，节点的负载也很高，不只是 data 节点，master 和协调节点的 cpu 使用率都很高，看现象集群似乎遇到了性能瓶颈。 查看了 Hot_threads, 发现大量线程被权限验证相关的类和方法占用，主要在 RBACEngine 和 AuthorizationService 两个类。并且不止协调节点和数据节点，master 节点居然也有那么多权限验证的操作？",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "从 Redis 开源协议变更到 ES 国产化：一次技术自主的机遇",
              "url": "http://infinilabs.cn/blog/2024/redis-es-alternative/",
              "content": "引言 #  近日，Redis Labs 宣布其主导的开源项目 Redis 将采用双重源代码可用许可证（RSALv2）和服务器端公共许可证（SSPLv1）。这一重大决策标志着 Redis 从传统的 BSD 许可证向更加严格的控制权转变，同时也引发了广泛的社区和行业讨论。这不仅是一个关于许可证变更的故事，更是关于开源社区如何响应，以及这一变化如何激发对国产技术探索和发展的深刻思考。Redis，作为最受欢迎的开源键值存储数据库之一，其开源协议的变更反映了开源软件在商业化道路上的挑战和压力。Redis Labs 的 CEO Rowan Trollope 指出，这一变化旨在防止云服务提供商免费使用 Redis 代码，同时促进 Redis 社区的可持续发展和创新。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI – 增强 AI 搜索、API 管理与性能优化等",
              "url": "http://infinilabs.cn/blog/2025/release-20250314/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 、Easysearch 等产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Easysearch 优化字段压缩提升写入速度，Console 优化数据迁移和校验等功能",
              "url": "http://infinilabs.cn/blog/2023/release-20231020/",
              "content": "INFINI Labs 产品又更新啦~。本次更新概要如下：Easysearch 增强 source_reuse 压缩功能，并大幅提升写入速度；Console 优化了数据迁移和校验功能，新增了通用的数据列表和下拉等标准组件，化繁为简，实现可复用。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Coco AI 参选 Gitee 2025 最受欢迎开源软件！您的每一票，都是对中国开源的硬核支持",
              "url": "http://infinilabs.cn/blog/2025/coco-ai-gitee-activity-2025-opensource/",
              "content": "「 Gitee 2025 年度开源项目评选」火热进行中！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "ES 调优帖：关于索引合并参数 index.merge.policy.deletePctAllowed 的取值优化",
              "url": "http://infinilabs.cn/blog/2025/index-merge-policy-deletepctallowed/",
              "content": "最近发现了 lucene 9.5 版本把 merge 策略的默认参数改了。",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第二步：调研Coco AI的主要功能特点和应用场景，了解其核心技术和优势"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "INFINI Labs 推出 Coco AI，为现代团队打造的统一搜索与 AI 智能助手",
              "url": "http://infinilabs.cn/blog/2025/coco-AI-with-deepseek-to-create-enterprise-knowledge-management-tools/",
              "content": "随着企业信息化程度的飞速提升，海量数据正以前所未有的速度涌现，这些数据分散在内网 Wiki、JIRA、Google Workspace、Dropbox、Notion、GitHub 等多个平台中，形成了一个个难以逾越的“信息孤岛”。员工们在跨平台检索信息时，常常陷入“大海捞针”的困境，不仅浪费了大量时间，还严重影响了工作效率。与此同时，AI 技术的飞速发展为知识管理和信息检索带来了新的曙光。RAG（Retrieval-Augmented Generation）技术的崛起，更是将传统搜索引擎与生成模型的优势完美融合，推动了办公自动化和协作智能化的全新变革。企业对高效智能搜索、知识管理及协作工具的需求，正以前所未有的速度增长，在此背景下，极限数据（北京）科技有限公司（INFINI Labs）正式发布——Coco AI 一站式企业搜索与 AI 智能助手产品，并与 DeepSeek 等大模型集成，为现代团队打造统一搜索与 AI 智能助手。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【INFINI Workshop 第三期 - 上海站】Coco AI - 赋能企业搜索，打造专属智能助手",
              "url": "http://infinilabs.cn/blog/2025/workshop-3/",
              "content": "在生成式 AI 快速演进的今天，企业如何构建智能、高效、安全的搜索与交互系统，已成为提升信息利用效率与用户体验的关键。本次 Workshop 聚焦于极限科技推出的 Coco AI —— 一款完全开源、跨平台的企业级智能搜索与助手系统，带您深入了解其核心能力、技术架构与落地实践。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI – 增强 AI 搜索、API 管理与性能优化等",
              "url": "http://infinilabs.cn/blog/2025/release-20250314/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 、Easysearch 等产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "从 OpenAI 停服看中国市场：国产替代崛起的机遇与挑战",
              "url": "http://infinilabs.cn/blog/2024/from-openai-service-discontinuation-to-the-chinese-market-opportunities-and-challenges-of-domestic-replacement-rising/",
              "content": "一、OpenAI 停服事件背景 #  OpenAI 自 2020 年推出 GPT-3 以来，在全球范围内引起了极大的反响。其强大的自然语言处理能力使其成为许多企业和开发者的首选工具。然而，2024 年 6 月 25 日，许多中国用户收到了一封来自 OpenAI 的邮件，邮件中明确表示，自 2024 年 7 月 9 日起，OpenAI 将停止对中国内地和香港地区提供 API 服务。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读",
              "url": "http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/",
              "content": "4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】Coco AI 全景解读：开源智能搜索与知识管理革新",
              "url": "http://infinilabs.cn/blog/2025/live-event-oschina-with-coco-0523/",
              "content": "📣 INFINI Labs &amp; 开源中国 联合举办 Coco AI 专场直播活动来袭！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Easysearch Rollup 相比 OpenSearch Rollup 的优势分析",
              "url": "http://infinilabs.cn/blog/2025/Easysearch-Rollup-vs-OpenSearch-Rollup/",
              "content": "背景 #  在处理时序数据时，Rollup 功能通过数据聚合显著降低存储成本，并提升查询性能。Easysearch 与 OpenSearch 均提供了 Rollup 能力，但在多个关键维度上， Easysearch Rollup 展现出更优的表现。本文将从查询体验、索引管理、聚合能力、性能优化和任务管理五个方面，分析 Easysearch Rollup 相较于 OpenSearch Rollup 的优势。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "TDBC 2025 大会聚焦 AI 与数据库融合，极限科技发布新一代 Coco AI 搜索平台",
              "url": "http://infinilabs.cn/blog/2025/infinilabs-appeared-at-TDBC-2025-sharing-coco-ai/",
              "content": "2025 年 7 月 17 日 在北京召开的 TDBC 2025 可信数据库发展大会·人工智能与数据库融合发展分论坛 上，国内领先的搜索数据库及解决方案提供商 极限科技（INFINI Labs）正式发布其创新产品 —— Coco AI，一款面向企业的 AI 智能搜索与高效协作平台。极限数据（北京）科技有限公司创始人曾勇在《下一代企业搜索与 AI 的融合探索》主题演讲中，深入探讨了企业搜索的未来趋势及 Coco AI 的核心价值。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI v0.7.0 发布 - 全新的文件搜索体验与全屏化的集成功能",
              "url": "http://infinilabs.cn/blog/2025/release-20250728/",
              "content": "INFINI Labs 产品更新发布！此次更新主要包括 Coco AI v0.7.0 新增 macOS Spotlight 和 Windows 文件搜索支持、语音输入功能，以及全屏集成模式；Easysearch v1.14.0 引入完整文本嵌入模型、语义检索 API 和搜索管道功能等，全面提升产品性能和稳定性。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Easysearch 压缩模式深度比较：ZSTD + source_reuse 的优势分析",
              "url": "http://infinilabs.cn/blog/2023/deep-comparison-of-easysearch-compression-modes/",
              "content": "引言 #  在使用 Easysearch 时，如何在存储和查询性能之间找到平衡是一个常见的挑战。Easysearch 具备多种压缩模式，各有千秋。本文将重点探讨一种特别的压缩模式：zstd + source_reuse，我们最近重新优化了 source_reuse,使得它在吞吐量和存储效率方面都表现出色。",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第三步：收集Coco AI与其他AI助手的对比信息，分析其市场定位和竞争优势"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "使用 INFINI Console 实现 Elasticsearch 的增量数据迁移",
              "url": "http://infinilabs.cn/blog/2023/data-migration/",
              "content": "功能介绍 #  在 INFINI Console 1.3.0 版本里，数据迁移功能增加了对增量迁移的支持。这篇文章将会介绍增量迁移的具体使用方法和实现原理。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Elasticsearch filter context 的实践案例",
              "url": "http://infinilabs.cn/blog/2024/elasticsearch-filter-context-practice/",
              "content": "知识背景 #  在 ES 查询优化的建议里，很多时候为了避免算分逻辑和利用缓存逻辑，Elastic 会建议大家使用 filter 条件。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用 INFINI Gateway 保护 Elasticsearch 集群之阻断不合理的查询",
              "url": "http://infinilabs.cn/blog/2025/block-unreasonable-queries-with-infini-gateway/",
              "content": "本文将探讨如何使用 INFINI Gateway 阻止不合理的查询发送到 Elasticsearch，此方法同样适用于 Opensearch 和 INFINI Easysearch 。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用 Logstash 同步 MySQL 到 Easysearch",
              "url": "http://infinilabs.cn/blog/2023/sync-mysql-to-es-using-logstash/",
              "content": "从 MySQL 同步数据到 ES 有多种方案，这次我们使用 ELK 技术栈中的 Logstash 来将数据从 MySQL 同步到 Easysearch 。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用极限网关实现 ES 跨集群搜索",
              "url": "http://infinilabs.cn/blog/2024/infini-gateway-cross-cluster-search/",
              "content": "使用 ES 的小伙伴，有没有在用跨集群搜索的？ 熟悉 ES 的小伙伴都知道，ES 本身就能实现跨集群搜索，那为啥还要聊这个？试想一下，如果集群都上线投产了，才出现跨集群搜索需求，那么可能出现两种情况：",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Coco AI 实战（一）：Coco Server Linux 平台部署",
              "url": "http://infinilabs.cn/blog/2025/coco-ai-hands-on-1/",
              "content": "Coco AI 是一个完全开源、跨平台的统一搜索和生产力工具，能够连接各种数据源，包括应用程序、文件、Google Drive、Notion、Yuque、Hugo 等，帮助用户快速地访问他们的信息。通过集成多种大型模型平台，Coco AI 实现了智能个人知识管理，并支持私有部署。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "极限网关案例分享（3）：使用极限网关实现多集群写入",
              "url": "http://infinilabs.cn/blog/2024/gateway-case-sharing-3/",
              "content": "背景 #  集群数据量⽇增 3 T，为避免单集群过大，造成性能问题，计划将数据写入多个集群。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用 Docker Compose 轻松实现 INFINI Console 离线部署与持久化管理",
              "url": "http://infinilabs.cn/blog/2025/console-easysearch-with-docker-compose-offline/",
              "content": "系列回顾与引言 #  在我们的 INFINI 本地环境搭建系列博客中：",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用 Elasticsearch Python SDK 查询 Easysearch",
              "url": "http://infinilabs.cn/blog/2024/querying-easysearch-using-the-elasticsearch-python-sdk/",
              "content": "随着数据分析需求的不断增长，高效查询和分析大数据集变得越来越重要。Easysearch 作为一种强大的国产化搜索和分析引擎，同时作为 Elasticsearch 国产替代方案，支持原生 DSL 查询语法和 SQL 查询，确保原业务代码无需调整即可无缝迁移。Easysearch 兼容 ES 7.x 现有的 SDK 和索引存储格式，支持冷热架构和索引生命周期管理，为用户提供了全面的数据处理解决方案。本文将详细介绍如何使用 ES 7.x Python SDK 与 Easysearch 进行交互，包括安装、连接、数据操作和查询等方面。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "使用 JavaScript 脚本来进行复杂的查询改写",
              "url": "http://infinilabs.cn/blog/2023/path_rewrite_by_javascript/",
              "content": "有这么一个需求：",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第四步：查找Coco AI的实际使用案例和用户反馈，评估其实际表现"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI 开启智能知识管理新篇章",
              "url": "http://infinilabs.cn/blog/2025/release-20250215/",
              "content": "INFINI Labs 产品更新发布！此次更新，Coco AI 正式亮相，可快速实现智能化的个人知识库管理；Easysearch 增强 Rollup 能力，可自定义 Rollup 索引生命周期，支持更多的聚合方式；Console 完善了 Metrics 的指标监控异常告警能力，支持指标数据变化横向对比；Agent 进行了多处优化以及修复相关 Bug，支持在 Docker 容器中开启探针进行指标采集 等等。欢迎下载体验，探索更多可能！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】Coco AI 全景解读：开源智能搜索与知识管理革新",
              "url": "http://infinilabs.cn/blog/2025/live-event-oschina-with-coco-0523/",
              "content": "📣 INFINI Labs &amp; 开源中国 联合举办 Coco AI 专场直播活动来袭！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "搜索型数据库的技术发展历程与趋势前瞻",
              "url": "http://infinilabs.cn/blog/2024/the-technological-development-and-future-trends-of-search-oriented-databases/",
              "content": "概述 #  随着数字科技的飞速发展和信息量的爆炸性增长，搜索引擎已成为我们获取信息的首选途径之一，典型的代表厂商如 Google。然而，随着用户需求的不断演变，传统的搜索技术已经无法满足人们对信息的实时性、个性化和多样性的需求。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读",
              "url": "http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/",
              "content": "4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI 0.5 发布  –  无缝集成 AI 搜索能力、支持插件扩展、支持快照版本更新等",
              "url": "http://infinilabs.cn/blog/2025/release-20250611/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技新获得一项国家发明专利授权：《搜索数据库的正排索引处理方法、装置、介质和设备》",
              "url": "http://infinilabs.cn/blog/2024/news-20240622/",
              "content": "近日，极限数据（北京）科技有限公司（简称：极限科技）新获得一项国家发明专利授权，专利名为 “搜索数据库的正排索引处理方法、装置、介质和设备”，专利号：ZL 2024 1 0479400.9，授权日为 2024 年 6 月 21 日，标志着极限科技在数据库搜索技术领域的自主创新能力再次得到国家级认可。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI 0.3 发布 – 新增支持 Widget 外部站点集成",
              "url": "http://infinilabs.cn/blog/2025/release-20250331/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 、Easysearch 等产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI – 增强 AI 搜索、API 管理与性能优化等",
              "url": "http://infinilabs.cn/blog/2025/release-20250314/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 、Easysearch 等产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技再获国家发明专利：《一种超大规模分布式集群架构的数据处理方法》，引领大数据处理技术创新",
              "url": "http://infinilabs.cn/blog/2024/news-20240712/",
              "content": "近日，极限数据（北京）科技有限公司（简称：极限科技）传来喜讯，公司再次斩获国家发明专利授权。这项名为&quot;一种超大规模分布式集群架构的数据处理方法&quot;的专利（专利号：ZL 2024 1 0479402.8）于 2024 年 7 月 12 日正式获得授权，彰显了极限科技在大数据处理技术领域的创新实力。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "极限科技三周年庆典：追求极致，共创未来科技新篇章",
              "url": "http://infinilabs.cn/blog/2024/INFINILabs-3rd-anniversary-celebration/",
              "content": "2024 年 12 月 3 日，一场盛大的庆典活动在香港 IFS 集团旗下长沙玛珂酒店璀璨启幕，极限科技迎来了其三周年的辉煌庆典。此次庆典不仅是对极限科技过往成就的回顾与庆祝，更是对未来科技梦想的展望并开始新的启航。",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第五步：整理Coco AI的发展历程和最新更新情况，了解其演进路径"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_start",
    message_chunk: JSON.stringify({
      "plan": "第六步：汇总所有信息，形成对Coco AI的全面认知和总结"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_start",
    message_chunk: JSON.stringify({
      "plan": "第六步：汇总所有信息，形成对Coco AI的全面认知和总结",
      "step": {
        "name": "搜索资料",
        "payload": {
          "from": 0,
          "query": "第六步：汇总所有信息，形成对Coco AI的全面认知和总结",
          "size": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_step_end",
    message_chunk: JSON.stringify({
      "plan": "第六步：汇总所有信息，形成对Coco AI的全面认知和总结",
      "step": {
        "name": "搜索资料",
        "payload": {
          "hits": [
            {
              "source": "internal",
              "title": "【直播活动】Coco AI 全景解读：开源智能搜索与知识管理革新",
              "url": "http://infinilabs.cn/blog/2025/live-event-oschina-with-coco-0523/",
              "content": "📣 INFINI Labs &amp; 开源中国 联合举办 Coco AI 专场直播活动来袭！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读",
              "url": "http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/",
              "content": "4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报|极限科技获得北京市“创新型”中小企业资格认证",
              "url": "http://infinilabs.cn/blog/2024/news-20240624/",
              "content": "2024年6月20日，北京市经济和信息化局正式发布《关于对2024年度4月份北京市创新型中小企业名单进行公告的通知》，极限数据（北京）科技有限公司凭借其出色的创新能力和卓越的企业实力，成功获得“北京市创新型中小企业”的殊荣。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "Coco AI 参选 Gitee 2025 最受欢迎开源软件！您的每一票，都是对中国开源的硬核支持",
              "url": "http://infinilabs.cn/blog/2025/coco-ai-gitee-activity-2025-opensource/",
              "content": "「 Gitee 2025 年度开源项目评选」火热进行中！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI v0.9 与 Easysearch v2.0 全新功能上线，全面支持 GitLab 合并请求（MR）自动 AI Review",
              "url": "http://infinilabs.cn/blog/2025/release-20251121/",
              "content": "INFINI Labs 产品更新发布！此次更新主要包括：Coco AI v0.9 全面支持 GitLab 合并请求（MR）自动 AI Review，并重构为插件流水线架构，新增 Neo4j、MongoDB 等 10+ 数据源连接器，开启“AI+开发”协同新范式；Easysearch v2.0 正式发布，内置轻量级管理 UI，无需依赖 Kibana，实现集群“开箱即管”，Lucene 升级至 9.12.2，性能全面提升；INFINI Console、Gateway、Agent、Loadgen v1.30 统一基于 Framework v1.3 升级，全面支持 Easysearch 2.0 与 OpenSearch 3.x，新增百分比聚合、子目录代理等关键能力。详情见 Release Notes。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "喜报！极限科技新获得一项国家发明专利授权：《搜索数据库的正排索引处理方法、装置、介质和设备》",
              "url": "http://infinilabs.cn/blog/2024/news-20240622/",
              "content": "近日，极限数据（北京）科技有限公司（简称：极限科技）新获得一项国家发明专利授权，专利名为 “搜索数据库的正排索引处理方法、装置、介质和设备”，专利号：ZL 2024 1 0479400.9，授权日为 2024 年 6 月 21 日，标志着极限科技在数据库搜索技术领域的自主创新能力再次得到国家级认可。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "极限科技 Coco AI 荣获 2025 首届人工智能应用创新大赛全国一等奖",
              "url": "http://infinilabs.cn/blog/2025/coco-ai-won-first-prize-at-the-2025-AI-innovation-competition/",
              "content": "由中国技术经济学会主办的 2025 首届全国人工智能应用创新大赛 总决赛于 6 月 22 日在湖南大学圆满落幕。该赛事以“场景驱动・创新创业”为主题，旨在考察参赛选手设计 AI 智能体（AI Agent）、应用人工智能大模型技术解决实际问题的能力。本届大赛吸引了全国 632 所高校及 210 家企业的 4913 支团队参赛，经过层层选拔，最终 689 支团队晋级全国总决赛。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI 开启智能知识管理新篇章",
              "url": "http://infinilabs.cn/blog/2025/release-20250215/",
              "content": "INFINI Labs 产品更新发布！此次更新，Coco AI 正式亮相，可快速实现智能化的个人知识库管理；Easysearch 增强 Rollup 能力，可自定义 Rollup 索引生命周期，支持更多的聚合方式；Console 完善了 Metrics 的指标监控异常告警能力，支持指标数据变化横向对比；Agent 进行了多处优化以及修复相关 Bug，支持在 Docker 容器中开启探针进行指标采集 等等。欢迎下载体验，探索更多可能！",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 推出 Coco AI，为现代团队打造的统一搜索与 AI 智能助手",
              "url": "http://infinilabs.cn/blog/2025/coco-AI-with-deepseek-to-create-enterprise-knowledge-management-tools/",
              "content": "随着企业信息化程度的飞速提升，海量数据正以前所未有的速度涌现，这些数据分散在内网 Wiki、JIRA、Google Workspace、Dropbox、Notion、GitHub 等多个平台中，形成了一个个难以逾越的“信息孤岛”。员工们在跨平台检索信息时，常常陷入“大海捞针”的困境，不仅浪费了大量时间，还严重影响了工作效率。与此同时，AI 技术的飞速发展为知识管理和信息检索带来了新的曙光。RAG（Retrieval-Augmented Generation）技术的崛起，更是将传统搜索引擎与生成模型的优势完美融合，推动了办公自动化和协作智能化的全新变革。企业对高效智能搜索、知识管理及协作工具的需求，正以前所未有的速度增长，在此背景下，极限数据（北京）科技有限公司（INFINI Labs）正式发布——Coco AI 一站式企业搜索与 AI 智能助手产品，并与 DeepSeek 等大模型集成，为现代团队打造统一搜索与 AI 智能助手。",
              "score": 0.8
            },
            {
              "source": "internal",
              "title": "INFINI Labs 产品更新 | Coco AI – 增强 AI 搜索、API 管理与性能优化等",
              "url": "http://infinilabs.cn/blog/2025/release-20250314/",
              "content": "INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 、Easysearch 等产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。",
              "score": 0.8
            }
          ],
          "total": 10
        },
        "type": "search"
      }
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_researcher_end",
    message_chunk: JSON.stringify({
      "plan": "第六步：汇总所有信息，形成对Coco AI的全面认知和总结"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_reporter_start",
    message_chunk: "",
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "assistant",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "research_reporter_end",
    message_chunk: JSON.stringify({
      "attachment": "d5mgemf3edbrcpshe460",
      "created": "2026-01-19T00:16:25.262833+08:00",
      "title": "Research-Report.md",
      "url": "/attachment/d5mgemf3edbrcpshe460"
    }),
  },
  {
    session_id: "d5mgdpv3edbrcpshe3og",
    message_id: "d5mgdpv3edbrcpshe3pg",
    message_type: "system",
    reply_to_message: "d5mgdpv3edbrcpshe3p0",
    chunk_sequence: 0,
    chunk_type: "reply_end",
    message_chunk: "Processing completed",
  },
];

export const mockResearchReportContent = `# What is coco ai

## 摘要

本研究报告对 Coco AI 相关的系统与能力进行了调研和分析，对其产品定位、技术特点、应用场景以及市场竞争力进行了系统性梳理。

## 目录

1. [Coco AI 概述与基本定义]
2. [Coco AI 核心技术与功能特性]
3. [市场竞争分析与差异化优势]
4. [应用场景与实际使用案例]
5. [发展历程与版本演进]
6. [发展前景与趋势展望]

## Coco AI 概述与基本定义

### 1.1 产品定位与核心概念

Coco AI 是面向企业级知识检索与智能问答场景打造的智能搜索系统，专注于通过自然语言交互帮助用户在复杂的信息系统中高效获取答案。

该产品定位为企业级智能数据搜索与知识解决方案，目标是提升信息检索效率、降低知识获取门槛，并通过智能推荐与语义理解能力，提升整体决策质量。

### 1.2 技术特征与功能属性

#### 1.2.1 智能检索能力

Coco AI 依托语义理解和大模型相关技术，支持对非结构化文本、半结构化内容以及多源异构数据进行统一检索与聚合，提供多维度、可追溯的检索结果。`;
