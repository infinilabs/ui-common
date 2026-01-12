export const demoData = {
  "took": 4,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 6,
      "relation": "eq"
    },
    "max_score": null,
    "hits": [
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fjtsek7e3va6t252f0",
        "_score": null,
        "_source": {
          "id": "d5fjtsek7e3va6t252f0",
          "created": "2026-01-08T13:21:53.926448672+08:00",
          "updated": "2026-01-08T13:21:53.926448672+08:00",
          "type": "user",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "What is Coco AI?",
          "details": null,
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849713926
        ]
      },
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fjtsek7e3va6t252fg",
        "_score": null,
        "_source": {
          "id": "d5fjtsek7e3va6t252fg",
          "created": "2026-01-08T13:21:53.934952011+08:00",
          "updated": "2026-01-08T13:22:38.971628617+08:00",
          "type": "assistant",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "Coco AI is a powerful, open-source, and cross-platform unified AI search and productivity tool. It's designed to help users efficiently access and manage information across various data sources, both local and in the cloud. Here’s a detailed overview of what Coco AI offers:\n\n### Key Features\n\n1. **Unified Search & Productivity Tool:**\n   - **Data Source Integration:** Connect and search across a wide range of data sources, including:\n     - Local applications\n     - Cloud storage (e.g., Google Drive, Notion, Yuque, Hugo)\n     - Enterprise knowledge bases\n   - **Real-Time Search:** Quickly search through multiple data sources simultaneously, providing a seamless and efficient experience.\n\n2. **AI Assistant Mode:**\n   - **Natural Language Interaction:** Chat with an AI assistant using natural language. The assistant can understand your documents, personal data, and provide intelligent summaries and responses.\n   - **Personalized Knowledge Base:** The AI assistant is based on your personalized knowledge base, ensuring that the information it provides is tailored to your needs and context.\n   - **Context Retention:** When switching between different AI assistants in the same conversation, Coco AI retains the context, allowing for a more fluid and continuous interaction.\n\n3. **Privacy & Security:**\n   - **Private Deployment:** Coco AI supports private deployment, ensuring that your data remains secure and is hosted locally or on your own server.\n   - **Enhanced Privacy:** All personal knowledge and data are managed in a way that prioritizes privacy and security.\n\n4. **Scalable & Open:**\n   - **Custom Data Integration:** Easily integrate your own data into Coco AI via APIs and other integration methods.\n   - **Open-Source:** Coco AI is open-source, allowing for community contributions and customization.\n\n### User Interface and Functions\n\n- **Chat Interface:**\n  - **Top Bar:**\n    - **Assistant Selection:** Switch between different AI assistants.\n    - **Historical Conversations:** View and restore recent conversations.\n    - **Server Switching:** Connect to and switch between different Coco Servers.\n    - **Independent Window Mode:** Pop out the current conversation into an independent window for multitasking.\n  - **Middle Area:**\n    - Displays conversation content and AI responses.\n  - **Bottom Input Area:**\n    - Enter messages and send them by pressing Enter.\n    - Function buttons include web search, tool calls (MCP), and deep thinking capabilities.\n\n### Additional Features\n\n- **AI Overview:**\n  - Automatically refines and summarizes search results, helping users quickly grasp key points without browsing each individual result.\n  - Configurable in settings to set trigger conditions and choose the AI assistant for summarization.",
          "reply_to_message": "d5fjtsek7e3va6t252f0",
          "details": [
            {
              "order": 10,
              "type": "query_intent",
              "description": "",
              "payload": {
                "category": "Info Retrieval",
                "intent": "Request for Information",
                "query": [
                  "What is Coco AI?",
                  "Can you explain what Coco AI is?"
                ],
                "keyword": [
                  "Coco AI",
                  "definition"
                ],
                "suggestion": [
                  "What is the purpose of Coco AI?",
                  "What are the features of Coco AI?"
                ],
                "need_plan_tasks": false,
                "need_call_tools": false,
                "need_network_search": false
              }
            },
            {
              "order": 20,
              "type": "fetch_source",
              "description": "",
              "payload": [
                {
                  "category": "Product",
                  "id": "ee269596a744ac14374b4a7dbb2ada0e",
                  "summary": "Coco AI v0.2 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Coco AI v0.2 Unleashed: The Future of Unified AI Search & Productivity is Here!",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/03-16-product-released-coco-ai-v0.2/"
                },
                {
                  "category": "Product",
                  "id": "9f0a53788cdee456c90a6c5348ac3bcd",
                  "summary": "Coco AI v0.1.0 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Create Your Own AI Assistant, Coco AI v0.1.0 Released",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/02-14-product-released-coco-ai-v0.1/"
                },
                {
                  "category": "Product",
                  "id": "e9193203f96420930dd150a3b5261355",
                  "summary": "Discover how Coco AI revolutionizes enterprise search and collaboration with unified data and Gen-AI chat capabilities.",
                  "title": "Introducing Coco AI - Connect & Collaborate 🥥",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/introducing-coco-ai/"
                },
                {
                  "category": "Product",
                  "id": "110be424ebfc28aef8b8959fe36b74ef",
                  "summary": "Coco AI v0.3 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Coco AI v0.3 Launches with Powerful Widget Integration for External Platforms",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/04-06-product-released-coco-ai-v0.3/"
                },
                {
                  "category": "",
                  "id": "782a960fa4d4d965f8a2591c1c34889c",
                  "summary": "",
                  "title": "How to integrate Coco AI with your own datasource",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/tutorials/howto_create_your_own_datasource/"
                },
                {
                  "category": "Product",
                  "id": "1db315755136f9bbd39b82b827973232",
                  "summary": "Coco AI v0.10 is now available!",
                  "title": "Coco AI v0.10: Resizable Extension Windows, One-Click Open, and a Refreshed UI",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/12-20-product-released-coco-ai-v0.10/"
                },
                {
                  "category": "Product",
                  "id": "45bbf0db995656cff8d5bb4667004bda",
                  "summary": "Coco AI v0.8 is now available!",
                  "title": "Coco AI v0.8: Window Management, View Extensions, Linux File Search & 10+ New Connectors",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/09-29-product-released-coco-ai-v0.8/"
                },
                {
                  "category": "Product",
                  "id": "fd4152e67b178dd025f336da7677b676",
                  "summary": "Coco AI v0.9 is now available!",
                  "title": "Coco AI v0.9: Full support for automated AI review of GitLab merge requests (MR)",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/11-21-product-released-coco-ai-v0.9/"
                },
                {
                  "category": "Product",
                  "id": "152e58dcc838975c6a0b0ce1695635ca",
                  "summary": "Coco AI v0.5 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Coco AI v0.5 Unlocks Local Plugins, Smarter App Search, AI Overview and Instant AI Command",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/06-11-product-released-coco-ai-v0.5/"
                },
                {
                  "category": "Product",
                  "id": "228a0577d5b89823c87699dd6a3ebac7",
                  "summary": "Coco AI v0.7 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Coco AI v0.7: A Brand New File Search Experience and Fullscreen Integrations",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/07-28-product-released-coco-ai-v0.7/"
                },
                {
                  "category": "Product",
                  "id": "52b6339e318b8bd11db264ea8edfd723",
                  "summary": "",
                  "title": "Coco AI v0.6 Released: Introducing the Extension Store",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/06-29-product-released-coco-ai-v0.6/"
                },
                {
                  "category": "Product",
                  "id": "a36d8ab74cf278d2966a74c0ae4c062d",
                  "summary": "Coco AI v0.4 is now available! A powerful, open-source AI-powered search and productivity tool for seamless access to personal and enterprise knowledge.",
                  "title": "Coco AI v0.4 released, improved assistant settings, added MCP support",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/04-28-product-released-coco-ai-v0.4/"
                },
                {
                  "category": "Product",
                  "id": "101c904b28c93abfb759aaeefa5b8e66",
                  "summary": "Discover How Coco AI to work with Google Drive",
                  "title": "Introducing Coco AI in Two Minutes - A Quick Start Video 🥥",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/a-quick-start-viideo-to-introduce-coco-ai-in-two-minutes/"
                },
                {
                  "category": "",
                  "id": "430d1d4b7b74b9c9cab4062a9863f04b",
                  "summary": "",
                  "title": "AI Overview",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/core-features/AI-Overview/"
                },
                {
                  "category": "",
                  "id": "57492f56878a27f50e5d2a37dda1f0de",
                  "summary": "",
                  "title": "AI Chat",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/AI-Chat/"
                },
                {
                  "category": "",
                  "id": "778cf0965213fb9b1c962f83e18249c5",
                  "summary": "",
                  "title": "Quick AI Access",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/core-features/Quick-AI-Access/"
                },
                {
                  "category": "",
                  "id": "7d5b802ec571ef5f2468477d9231be5e",
                  "summary": "",
                  "title": "Your first Coco Command extension - Spotify Control",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/10-11-your-first-coco-command-extension-spotify-control/"
                },
                {
                  "category": "",
                  "id": "2bb32474dbc912de3f9ac2cfd6a0be3d",
                  "summary": "",
                  "title": "Your first Coco View extension - A small tic-tac-toe game",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/10-11-your-first-coco-view-extension-tic-tac-toe/"
                },
                {
                  "category": "Technology",
                  "id": "c0f052895eea733e9ea3b4e15421af2c",
                  "summary": "",
                  "title": "Build a Vector Extension for Postgres - Introduction",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/build_a_vector_extension_for_postgres_introduction/"
                },
                {
                  "category": "Culture",
                  "id": "318e2fae89d56df9d4120495b6f13b05",
                  "summary": "The first post of our blog, sharing our journey and passion for search and innovation.",
                  "title": "Welcome to the INFINI Labs Blog! 🚀",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/welcome-to-our-blog/"
                },
                {
                  "category": "Technology",
                  "id": "aa7d9e49e44980ad521ac057c7149a37",
                  "summary": "Protect Elasticsearch with INFINI Gateway: Block Unreasonable Queries.",
                  "title": "Protect Elasticsearch with INFINI Gateway: Block Unreasonable Queries",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/block-unreasonable-queries-with-infini-gateway/"
                },
                {
                  "category": "Technology",
                  "id": "7edd0bc5d0fb59baa3a034fd7d8bb99e",
                  "summary": "Learn how to optimize Rust applications with profiling tools like criterion, cargo flamegraph, and DTrace on macOS.",
                  "title": "Profiling Rust Code on macOS: My Daily Workflow",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/benchmarking-and-profiling-rust-applications-on-macos-a-practical-guide/"
                },
                {
                  "category": "Culture",
                  "id": "423908565e016acf96442fbfa7c05031",
                  "summary": "Managing comprehensive documentation might seem like an enormous task, especially since we don’t have a dedicated documentation team, So, how do we do it?",
                  "title": "How We Do Documentation Engineering",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/how-we-do-product-documentation-engineering/"
                },
                {
                  "category": "Product",
                  "id": "1336d22fd26973c70bfd13994fd69086",
                  "summary": "Discover how Coco AI revolutionizes enterprise search and collaboration with unified data and Gen-AI chat capabilities.",
                  "title": "Getting Started with INFINI Framework - Our homemade framework for building enterprise golang applications",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/getting-started-with-infini-framework/"
                },
                {
                  "category": "",
                  "id": "e90897b27f05fd332aa99b7aaad167d3",
                  "summary": "",
                  "title": "Windows",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/installation/windows/"
                },
                {
                  "category": "",
                  "id": "1798608ae87fc64ce94bb66c184ed9bf",
                  "summary": "",
                  "title": "Notion",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/connectors/notion/"
                },
                {
                  "category": "",
                  "id": "051f07e425339369198572fbf6e88c0a",
                  "summary": "",
                  "title": "Window Management",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/core-features/Window-Management/"
                },
                {
                  "category": "",
                  "id": "933d6e8a7e007a06749c4dd8d648fd38",
                  "summary": "",
                  "title": "Application Search",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/core-features/Application-Search/"
                },
                {
                  "category": "",
                  "id": "44f89c059f0fc7213ea9adf378882d86",
                  "summary": "",
                  "title": "System Initialization",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/system/install/"
                },
                {
                  "category": "",
                  "id": "bc37751f087806e42705f3f2117fa565",
                  "summary": "",
                  "title": "Integration",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/integration/"
                },
                {
                  "category": "Product",
                  "id": "a2d5157fce7119868e04961a1ff05d2c",
                  "summary": "Discover the new TopN feature and other enhancements in INFINI Console v1.28.",
                  "title": "INFINI Console v1.28 Released",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2025/01-11-produc-released-console-topn/"
                },
                {
                  "category": "",
                  "id": "a13e525bc613acd45960293bd06562ab",
                  "summary": "",
                  "title": "macOS",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/installation/macos/"
                },
                {
                  "category": "",
                  "id": "3cff5ccf52c61c56be77d037663fd3d7",
                  "summary": "",
                  "title": "Authentication",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/account/authentication/"
                },
                {
                  "category": "",
                  "id": "136f40769bdbf93ece48bb3b772c9789",
                  "summary": "",
                  "title": "Installation",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/getting-started/install/"
                },
                {
                  "category": "Technology",
                  "id": "a4428c94797950f7e65e2af7683855f3",
                  "summary": "Introducing the request replication feature of the INFINI Gateway.",
                  "title": "Synching data between two Elasticsearch clusters using a gateway",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/synching-data-between-two-clusters-using-gateway/"
                },
                {
                  "category": "",
                  "id": "9c9e06bba4996b8009d9d94c3e8a92e6",
                  "summary": "",
                  "title": "The Basics",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/The-Basics/"
                },
                {
                  "category": "",
                  "id": "e940837616dc1a7ed679edb45cdf61b5",
                  "summary": "",
                  "title": "Screenshot",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/screenshot/"
                },
                {
                  "category": "",
                  "id": "aac303fd47f0cffba163b9c5e32d9528",
                  "summary": "",
                  "title": "Oracle",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/connectors/oracle/"
                },
                {
                  "category": "",
                  "id": "3b32e335951bf26ce8d0227c3a0afcbe",
                  "summary": "",
                  "title": "Confluence",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/connectors/confluence/"
                },
                {
                  "category": "Technology",
                  "id": "3ad623b2c24058b7518539ab4e0faf2a",
                  "summary": "",
                  "title": "Build a Vector Extension for Postgres - Vector Type",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/build_a_vector_extension_for_postgres_vector_type/"
                },
                {
                  "category": "Author",
                  "id": "981b36d1301e5fc984bc9fb3cc888a2d",
                  "summary": "Software Engineer",
                  "title": "Rain9",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/authors/rain9/"
                },
                {
                  "category": "",
                  "id": "06fe0902754c9ea668eed03004511071",
                  "summary": "",
                  "title": "Calculator",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/core-features/Calculator/"
                },
                {
                  "category": "Author",
                  "id": "b412ada8af59407ca9cb776c8bb58f97",
                  "summary": "Founder & CEO of INFINI Labs",
                  "title": "Medcl",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/authors/medcl/"
                },
                {
                  "category": "Technology",
                  "id": "f4a22bbc87b4dac8b351cf62c67f19b3",
                  "summary": "How to add a searchbox to your hugoblog site.",
                  "title": "Adding Searchbox to Hugo!",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/posts/2024/adding-searchbox-to-hugo-blog-site/"
                },
                {
                  "category": "",
                  "id": "a4d7ae84ee59340486918bfb1ae9b51f",
                  "summary": "",
                  "title": "Dropbox",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/connectors/dropbox/"
                },
                {
                  "category": "Author",
                  "id": "c00aa7347401d6ab9b65ea4baac728da",
                  "summary": "Software Engineer",
                  "title": "SteveLauC",
                  "updated": null,
                  "url": "http://blog.infinilabs.com/authors/stevelauc/"
                },
                {
                  "category": "",
                  "id": "ea9da552168339d214668463cfdb785c",
                  "summary": "",
                  "title": "MCP Server",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/mcp_server/"
                },
                {
                  "category": "",
                  "id": "7ea1d281a2a3ff1219ecac7389b0a448",
                  "summary": "",
                  "title": "LLM Provider",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/model_provider/"
                },
                {
                  "category": "",
                  "id": "8726f763abe9d408ae83915d96180599",
                  "summary": "",
                  "title": "Google Drive",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-server/main/docs/references/connectors/google_drive/"
                },
                {
                  "category": "",
                  "id": "75de8da218f1f2c1a05582ee468c10ce",
                  "summary": "",
                  "title": "Extension",
                  "updated": null,
                  "url": "https://docs.infinilabs.com/coco-app/main/docs/getting-started/Extension/"
                }
              ]
            },
            {
              "order": 30,
              "type": "pick_source",
              "description": "",
              "payload": [
                {
                  "id": "101c904b28c93abfb759aaeefa5b8e66",
                  "title": "Introducing Coco AI - Connect & Collaborate 🥥",
                  "explain": "This document provides an introduction to Coco AI, explaining its purpose and key features in revolutionizing enterprise search and collaboration."
                },
                {
                  "id": "ee269596a744ac14374b4a7dbb2ada0e",
                  "title": "Coco AI v0.2 Unleashed: The Future of Unified AI Search & Productivity is Here!",
                  "explain": "This document discusses the release of Coco AI v0.2, highlighting its capabilities as a powerful AI-powered search and productivity tool."
                },
                {
                  "id": "9f0a53788cdee456c90a6c5348ac3bcd",
                  "title": "Create Your Own AI Assistant, Coco AI v0.1.0 Released",
                  "explain": "This document introduces the initial release of Coco AI v0.1.0, offering a foundational understanding of the tool and its open-source nature."
                },
                {
                  "id": "430d1d4b7b74b9c9cab4062a9863f04b",
                  "title": "AI Overview",
                  "explain": "This document provides a detailed overview of the AI features within Coco AI, offering valuable context for understanding its functionalities."
                },
                {
                  "id": "57492f56878a27f50e5d2a37dda1f0de",
                  "title": "AI Chat",
                  "explain": "This document explains the AI chat capabilities of Coco AI, which is a central feature of the tool as mentioned in the introductions."
                }
              ]
            },
            {
              "order": 40,
              "type": "deep_read",
              "description": "Obtaining and analyzing documents in depth:  AI Chat\nObtaining and analyzing documents in depth:  AI Overview\nObtaining and analyzing documents in depth:  Coco AI v0.2 Unleashed: The Future of Unified AI Search & Productivity is Here!\nObtaining and analyzing documents in depth:  Create Your Own AI Assistant, Coco AI v0.1.0 Released\nObtaining and analyzing documents in depth:  Introducing Coco AI in Two Minutes - A Quick Start Video 🥥\n",
              "payload": null
            }
          ],
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849713934
        ]
      },
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fju9mk7e3va6t252j0",
        "_score": null,
        "_source": {
          "id": "d5fju9mk7e3va6t252j0",
          "created": "2026-01-08T13:22:46.804235261+08:00",
          "updated": "2026-01-08T13:22:46.804235261+08:00",
          "type": "user",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "你能干什么",
          "details": null,
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849766804
        ]
      },
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fju9mk7e3va6t252jg",
        "_score": null,
        "_source": {
          "id": "d5fju9mk7e3va6t252jg",
          "created": "2026-01-08T13:22:46.814264209+08:00",
          "updated": "2026-01-08T13:22:56.718723834+08:00",
          "type": "assistant",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "当然可以！Coco AI 可以帮助您完成许多任务。以下是一些主要功能：\n\n### 主要功能\n\n1. **统一搜索和生产力工具:**\n   - **数据源集成:**\n     - 本地应用程序\n     - 云存储（例如 Google Drive、Notion、语雀、Hugo）\n     - 企业知识库\n   - **实时搜索:** 快速同时搜索多个数据源，提供无缝且高效的体验。\n\n2. **AI 助手模式:**\n   - **自然语言交互:** 使用自然语言与 AI 助手聊天。助手可以理解您的文档和个人数据，并提供智能摘要和回复。\n   - **个性化知识库:** AI 助手基于您的个人数据和文档进行训练，为您提供更加个性化的服务。\n\n3. **信息管理和组织:**\n   - **文件管理:** 帮助您管理和组织各种文件和文档。\n   - **笔记和任务管理:** 创建和管理笔记、待办事项和日程安排。\n\n4. **协作和共享:**\n   - **团队协作:** 支持多人协作，共享文档和项目。\n   - **权限管理:** 设置不同用户的访问权限，确保数据安全。\n\n5. **智能提醒和建议:**\n   - **日程提醒:** 根据您的日程安排发送提醒。\n   - **智能建议:** 提供相关的信息和建议，帮助您更高效地工作。\n\n如果您有具体的需求或想了解更多细节，请告诉我！",
          "reply_to_message": "d5fju9mk7e3va6t252j0",
          "details": [
            {
              "order": 10,
              "type": "query_intent",
              "description": "",
              "payload": {
                "category": "Query",
                "intent": "Request for information",
                "query": [
                  "你能干什么",
                  "你能做些什么",
                  "你能提供什么帮助"
                ],
                "keyword": [
                  "你能",
                  "做些什么",
                  "提供什么帮助"
                ],
                "suggestion": [
                  "Coco AI的功能",
                  "Coco AI能帮助你做什么",
                  "Coco AI有哪些功能"
                ],
                "need_plan_tasks": false,
                "need_call_tools": false,
                "need_network_search": false
              }
            }
          ],
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849766814
        ]
      },
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fjuh6k7e3va6t252m0",
        "_score": null,
        "_source": {
          "id": "d5fjuh6k7e3va6t252m0",
          "created": "2026-01-08T13:23:16.689933229+08:00",
          "updated": "2026-01-08T13:23:16.689933229+08:00",
          "type": "user",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "Coco AI能帮助你做什么",
          "details": null,
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849796689
        ]
      },
      {
        "_index": "coco_message-v2",
        "_type": "_doc",
        "_id": "d5fjuh6k7e3va6t252mg",
        "_score": null,
        "_source": {
          "id": "d5fjuh6k7e3va6t252mg",
          "created": "2026-01-08T13:23:16.698437842+08:00",
          "updated": "2026-01-08T13:23:38.855616722+08:00",
          "type": "assistant",
          "session_id": "d5fjtsek7e3va6t252eg",
          "from": "",
          "message": "当然可以！Coco AI 是一个强大的统一搜索和生产力工具，可以帮助您完成许多任务。以下是一些主要功能和应用场景：\n\n### 主要功能\n\n1. **统一搜索和生产力工具:**\n   - **数据源集成:**\n     - 本地应用程序\n     - 云存储（例如 Google Drive、Notion、语雀、Hugo）\n     - 企业知识库\n   - **实时搜索:** 快速同时搜索多个数据源，提供无缝且高效的体验。\n\n2. **AI 助手模式:**\n   - **自然语言交互:** 使用自然语言与 AI 助手聊天。助手可以理解您的文档和个人数据，并提供智能摘要和回复。\n   - **个性化知识库:** AI 助手基于您的个人数据和文档进行训练，为您提供更加个性化的服务。\n\n3. **信息管理和组织:**\n   - **文件管理:** 帮助您管理和组织各种文件和文档。\n   - **笔记和任务管理:** 创建和管理笔记、待办事项和日程安排。\n\n4. **协作和共享:**\n   - **团队协作:** 支持多人协作，共享文档和项目。\n   - **权限管理:** 设置不同用户的访问权限，确保数据安全。\n\n5. **智能分析和推荐:**\n   - **数据分析:** 提供对数据的智能分析，帮助您更好地理解和利用信息。\n   - **内容推荐:** 根据您的使用习惯和偏好，推荐相关的内容和资源。\n\n### 应用场景\n\n- **日常工作:**\n  - **文件查找:** 快速找到所需的文件和文档。\n  - **会议记录:** 自动生成会议记录和摘要。\n  - **任务管理:** 创建和跟踪待办事项，提高工作效率。\n\n- **学习和研究:**\n  - **文献管理:** 组织和管理学术文献和参考资料。\n  - **笔记整理:** 创建和整理学习笔记，方便复习和回顾。\n\n- **团队协作:**\n  - **项目管理:** 管理项目进度，分配任务，跟踪完成情况。\n  - **资源共享:** 共享文件和文档，协同编辑和讨论。\n\n- **个人生活:**\n  - **日程管理:** 安排和管理个人日程，设置提醒。\n  - **信息检索:** 快速查找和获取所需的信息。\n\n通过这些功能，Coco AI 可以极大地提升您的工作效率和生活质量，帮助您更好地管理和利用信息。",
          "reply_to_message": "d5fjuh6k7e3va6t252m0",
          "details": [
            {
              "order": 10,
              "type": "query_intent",
              "description": "",
              "payload": {
                "category": "Query",
                "intent": "request",
                "query": [
                  "Coco AI能帮助你做什么",
                  "Coco AI能做些什么"
                ],
                "keyword": [
                  "Coco AI",
                  "能帮助",
                  "做什么"
                ],
                "suggestion": [
                  "Coco AI的功能",
                  "Coco AI能做哪些事情",
                  "Coco AI的特点"
                ],
                "need_plan_tasks": false,
                "need_call_tools": false,
                "need_network_search": false
              }
            }
          ],
          "up_vote": 0,
          "down_vote": 0,
          "assistant_id": "d23fo9gqlqbcdhjr236g"
        },
        "sort": [
          1767849796698
        ]
      }
    ]
  }
}