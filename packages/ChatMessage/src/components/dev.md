服务端收到请求，异步任务开始，会推送第一个消息：{chunk_type: reply_start, message_chunk: ""}，表示服务端开始处理回复。


searchPayload = util.MapStr{}
searchPayload["plan"] = step
searchPayload["step"] = util.MapStr{
    "type": "search",
    "name": "搜索资料",
    "payload": util.MapStr{
       "total": 10,
       "hits":  initialSearchCollection.Results,
    },
} 
state.(*State).Sender.SendChunkMessage(core.MessageTypeAssistant, common.ResearchResearcherStepEnd, util.MustToJSON(searchPayload), 0)


﻿﻿research_researcher_step_start﻿和﻿research_researcher_step_end﻿

每个研究步骤，主要是体现研究的主题是什么，挑选了哪些资源
●
分析之后应该采用的搜索条件为什么？是否搜索内网，是否搜索外网，搜索数据源的范围，搜索的关键字，搜索的其它条件，使用语义搜索。

1
  {"session_id":"d5lr3b73edbmdpn8m0i0","message_id":"d5lr3b73edbmdpn8m0j0","message_type":"assistant","reply_to_message":"d5lr3b73edbmdpn8m0ig","chunk_sequence":0,"chunk_type":"research_researcher_step_start","message_chunk":"{"plan":"第六步：总结Coco AI的技术特色、应用价值和发展前景","step":{"name":"搜索资料","payload":{"from":0,"query":"第六步：总结Coco AI的技术特色、应用价值和发展前景","size":10},"type":"search"}}"}

●
1:N 执行具体的搜索（工具调用），调用的请求、返回结果
○
搜索结果的列表，标题、URL

1
{"session_id":"d5lr3b73edbmdpn8m0i0","message_id":"d5lr3b73edbmdpn8m0j0","message_type":"assistant","reply_to_message":"d5lr3b73edbmdpn8m0ig","chunk_sequence":0,"chunk_type":"research_researcher_step_end","message_chunk":"{\"plan\":\"第六步：总结Coco AI的技术特色、应用价值和发展前景\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[{\"source\":\"internal\",\"title\":\"搜索型数据库的技术发展历程与趋势前瞻\",\"url\":\"http://infinilabs.cn/blog/2024/the-technological-development-and-future-trends-of-search-oriented-databases/\",\"content\":\"概述 #  随着数字科技的飞速发展和信息量的爆炸性增长，搜索引擎已成为我们获取信息的首选途径之一，典型的代表厂商如 Google。然而，随着用户需求的不断演变，传统的搜索技术已经无法满足人们对信息的实时性、个性化和多样性的需求。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"【直播活动】开源智能搜索与知识管理革新 —— Coco AI 全景解读\",\"url\":\"http://infinilabs.cn/blog/2025/live-event-comprehensive-overview-of-coco-AI/\",\"content\":\"4 月 28 日（周一）19:00，INFINI Labs 与 GitCode 联合为您带来 Coco AI 专场直播！本次直播将深度剖析 Coco AI 的核心功能、技术架构及其在实际场景中的应用，带您领略智能搜索与知识管理的全新变革。精彩不容错过，快来预约观看吧！👇\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"【直播活动】Coco AI 全景解读：开源智能搜索与知识管理革新\",\"url\":\"http://infinilabs.cn/blog/2025/live-event-oschina-with-coco-0523/\",\"content\":\"📣 INFINI Labs \\u0026amp; 开源中国 联合举办 Coco AI 专场直播活动来袭！\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"极限科技 Coco AI 荣获 2025 首届人工智能应用创新大赛全国一等奖\",\"url\":\"http://infinilabs.cn/blog/2025/coco-ai-won-first-prize-at-the-2025-AI-innovation-competition/\",\"content\":\"由中国技术经济学会主办的 2025 首届全国人工智能应用创新大赛 总决赛于 6 月 22 日在湖南大学圆满落幕。该赛事以“场景驱动・创新创业”为主题，旨在考察参赛选手设计 AI 智能体（AI Agent）、应用人工智能大模型技术解决实际问题的能力。本届大赛吸引了全国 632 所高校及 210 家企业的 4913 支团队参赛，经过层层选拔，最终 689 支团队晋级全国总决赛。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"喜报！极限科技新获得一项国家发明专利授权：《搜索数据库的正排索引处理方法、装置、介质和设备》\",\"url\":\"http://infinilabs.cn/blog/2024/news-20240622/\",\"content\":\"近日，极限数据（北京）科技有限公司（简称：极限科技）新获得一项国家发明专利授权，专利名为 “搜索数据库的正排索引处理方法、装置、介质和设备”，专利号：ZL 2024 1 0479400.9，授权日为 2024 年 6 月 21 日，标志着极限科技在数据库搜索技术领域的自主创新能力再次得到国家级认可。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"【INFINI Workshop 第三期 - 上海站】Coco AI - 赋能企业搜索，打造专属智能助手\",\"url\":\"http://infinilabs.cn/blog/2025/workshop-3/\",\"content\":\"在生成式 AI 快速演进的今天，企业如何构建智能、高效、安全的搜索与交互系统，已成为提升信息利用效率与用户体验的关键。本次 Workshop 聚焦于极限科技推出的 Coco AI —— 一款完全开源、跨平台的企业级智能搜索与助手系统，带您深入了解其核心能力、技术架构与落地实践。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"极限科技 Coco AI 荣获 2025 IT168 技术卓越奖 - 创新产品奖\",\"url\":\"http://infinilabs.cn/blog/2026/coco-ai-wins-the-2025-it168-innovative-product-award/\",\"content\":\"北京，2026 年 1 月 —— 在由 IT168 主办的“2025 年度技术卓越奖”评选中，极限数据（北京）科技有限公司（简称：极限科技）的人工智能产品 Coco AI 凭借其创新的技术架构与突出的市场实践，荣获 “创新产品奖”。该奖项旨在表彰在 AI、大数据、云计算等领域实现关键突破、具备显著应用价值与市场潜力的产品与解决方案。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"INFINI Labs 推出 Coco AI，为现代团队打造的统一搜索与 AI 智能助手\",\"url\":\"http://infinilabs.cn/blog/2025/coco-AI-with-deepseek-to-create-enterprise-knowledge-management-tools/\",\"content\":\"随着企业信息化程度的飞速提升，海量数据正以前所未有的速度涌现，这些数据分散在内网 Wiki、JIRA、Google Workspace、Dropbox、Notion、GitHub 等多个平台中，形成了一个个难以逾越的“信息孤岛”。员工们在跨平台检索信息时，常常陷入“大海捞针”的困境，不仅浪费了大量时间，还严重影响了工作效率。与此同时，AI 技术的飞速发展为知识管理和信息检索带来了新的曙光。RAG（Retrieval-Augmented Generation）技术的崛起，更是将传统搜索引擎与生成模型的优势完美融合，推动了办公自动化和协作智能化的全新变革。企业对高效智能搜索、知识管理及协作工具的需求，正以前所未有的速度增长，在此背景下，极限数据（北京）科技有限公司（INFINI Labs）正式发布——Coco AI 一站式企业搜索与 AI 智能助手产品，并与 DeepSeek 等大模型集成，为现代团队打造统一搜索与 AI 智能助手。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"喜报！极限科技再获国家发明专利：《一种超大规模分布式集群架构的数据处理方法》，引领大数据处理技术创新\",\"url\":\"http://infinilabs.cn/blog/2024/news-20240712/\",\"content\":\"近日，极限数据（北京）科技有限公司（简称：极限科技）传来喜讯，公司再次斩获国家发明专利授权。这项名为\\u0026quot;一种超大规模分布式集群架构的数据处理方法\\u0026quot;的专利（专利号：ZL 2024 1 0479402.8）于 2024 年 7 月 12 日正式获得授权，彰显了极限科技在大数据处理技术领域的创新实力。\",\"score\":0.8},{\"source\":\"internal\",\"title\":\"INFINI Labs 产品更新 | Coco AI 0.5 发布  –  无缝集成 AI 搜索能力、支持插件扩展、支持快照版本更新等\",\"url\":\"http://infinilabs.cn/blog/2025/release-20250611/\",\"content\":\"INFINI Labs 产品更新发布！此次更新涵盖 Coco AI 产品多项重要升级，重点提升 AI 搜索能力、易用性及企业级优化。\",\"score\":0.8}],\"total\":10},\"type\":\"search\"}}"}


搜索结果的反馈评估，来判断，是否继续搜索，翻页扩大搜索的范围，还是反思条件是否需要完善。还是结束该研究步骤（搜索到的内容已经满足该研究目标）
○
（最大迭代次数）
○
{chunk_type: research_researcher_end, message_chunk: json_encode( { "plan":"确定用户询问的'COCO'具体指代对象，因为COCO可能代表多个不同概念" } )}


2/6 继续下一个研究步骤，以此类推
...
编写研究报告
出报告，体现到出报告这个阶段，开始，进行中，完成。
完成的时候，需要给一个消息，里面提供报告的内容，附件地址。
{chunk_type: research_reporter_start, message_chunk: {}}
{chunk_type: research_reporter_end, message_chunk: json_encode( {  "title":"Coco AI 研究报告", created:"xxx"," url","报告存储为附件的访问地址","attachment":"AttachmentID" } )}


最后回复结束。
{chunk_type: reply_end, message_chunk: {}}