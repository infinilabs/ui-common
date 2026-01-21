
import type { IChunkData } from "./types/chat";

export const realDataInitialMessages = [
    {
        "_id": "d5npgcp4d9v5jtbi06v0",
        "_source": {
            "id": "d5npgcp4d9v5jtbi06v0",
            "created": "2026-01-20T22:58:59.924293992+08:00",
            "updated": "2026-01-20T22:58:59.924293992+08:00",
            "_system": {
                "owner_id": "d5fl73k61mdldv8qnig0",
                "tenant_id": "d44nbqs61mdjqgtg51jg"
            },
            "type": "user",
            "session_id": "d5nov194d9v5jtbhvqp0",
            "from": "",
            "message": "coco",
            "details": null,
            "up_vote": 0,
            "down_vote": 0,
            "assistant_id": "d5modq14d9v7aqdfi940",
            "payload": null
        },
        "result": "created"
    }
];

export const realDataChunks: IChunkData[] = [
    {
        "chunk_type": "reply_start",
        "message_chunk": ""
    },
    {
        "chunk_type": "research_planner_start",
        "message_chunk": ""
    },
    {
        "chunk_type": "research_planner_end",
        "message_chunk": "[\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\",\"根据用户确认的具体方向，收集相关的背景信息和数据资料\",\"分析所收集信息的可靠性和时效性\",\"整理并归纳研究发现的关键要点\",\"形成结构化的研究报告或总结\"]"
    },
    {
        "chunk_type": "research_researcher_start",
        "message_chunk": "{\"plan\":\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\"}"
    },
    {
        "chunk_type": "research_researcher_step_start",
        "message_chunk": "{\"plan\":\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"from\":0,\"query\":\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\",\"size\":10},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_step_end",
        "message_chunk": "{\"plan\":\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[]},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_end",
        "message_chunk": "{\"plan\":\"首先澄清用户的研究主题'coco'具体指代什么，因为该词可能指向多个不同领域（如可可豆/巧克力产业、椰子相关产品、Coco Chanel品牌、电影《寻梦环游记》、人名或昵称等）\"}"
    },
    {
        "chunk_type": "research_researcher_start",
        "message_chunk": "{\"plan\":\"根据用户确认的具体方向，收集相关的背景信息和数据资料\"}"
    },
    {
        "chunk_type": "research_researcher_step_start",
        "message_chunk": "{\"plan\":\"根据用户确认的具体方向，收集相关的背景信息和数据资料\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"from\":0,\"query\":\"根据用户确认的具体方向，收集相关的背景信息和数据资料\",\"size\":10},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_step_end",
        "message_chunk": "{\"plan\":\"根据用户确认的具体方向，收集相关的背景信息和数据资料\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[]},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_end",
        "message_chunk": "{\"plan\":\"根据用户确认的具体方向，收集相关的背景信息和数据资料\"}"
    },
    {
        "chunk_type": "research_researcher_start",
        "message_chunk": "{\"plan\":\"分析所收集信息的可靠性和时效性\"}"
    },
    {
        "chunk_type": "research_researcher_step_start",
        "message_chunk": "{\"plan\":\"分析所收集信息的可靠性和时效性\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"from\":0,\"query\":\"分析所收集信息的可靠性和时效性\",\"size\":10},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_step_end",
        "message_chunk": "{\"plan\":\"分析所收集信息的可靠性和时效性\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[]},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_end",
        "message_chunk": "{\"plan\":\"分析所收集信息的可靠性和时效性\"}"
    },
    {
        "chunk_type": "research_researcher_start",
        "message_chunk": "{\"plan\":\"整理并归纳研究发现的关键要点\"}"
    },
    {
        "chunk_type": "research_researcher_step_start",
        "message_chunk": "{\"plan\":\"整理并归纳研究发现的关键要点\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"from\":0,\"query\":\"整理并归纳研究发现的关键要点\",\"size\":10},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_step_end",
        "message_chunk": "{\"plan\":\"整理并归纳研究发现的关键要点\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[]},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_end",
        "message_chunk": "{\"plan\":\"整理并归纳研究发现的关键要点\"}"
    },
    {
        "chunk_type": "research_researcher_start",
        "message_chunk": "{\"plan\":\"形成结构化的研究报告或总结\"}"
    },
    {
        "chunk_type": "research_researcher_step_start",
        "message_chunk": "{\"plan\":\"形成结构化的研究报告或总结\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"from\":0,\"query\":\"形成结构化的研究报告或总结\",\"size\":10},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_step_end",
        "message_chunk": "{\"plan\":\"形成结构化的研究报告或总结\",\"step\":{\"name\":\"搜索资料\",\"payload\":{\"hits\":[]},\"type\":\"search\"}}"
    },
    {
        "chunk_type": "research_researcher_end",
        "message_chunk": "{\"plan\":\"形成结构化的研究报告或总结\"}"
    },
    {
        "chunk_type": "research_reporter_start",
        "message_chunk": ""
    },
    {
        "chunk_type": "research_reporter_end",
        "message_chunk": "{\"attachment\":\"d5nph994d9v5jtbi07jg\",\"created\":\"2026-01-20T23:00:53.240136144+08:00\",\"title\":\"Research-Report.md\",\"url\":\"/attachment/d5nph994d9v5jtbi07jg\"}"
    },
    {
        "chunk_type": "reply_end",
        "message_chunk": "Processing completed"
    }
];
