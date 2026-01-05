import { AIAnswer } from './components/AIAnswer'

function App() {
  const content = `
**云创计划——云原生联合孵化**

时间：2025 Q2–Q4

关键动作：市场部牵头，与 8 家 ISV 签署《云原生应用联合孵化协议》，输出 3 套可复制的 “AI 搜索即服务” 模板（日志/知识库/合规审计）。

商业模式：按搜索调用量阶梯计费，ISV 享受 30% 渠道返点，保留 5 年优先分销权。

当前进度：已完成 2 家金融客户 POC，预计 2026 H1 贡献 1,200 万 ARR。

**“文本大模型” AI 搜索增值包**

时间：2025 Q3 上线

关键动作：战略合作部引入外部语料 3,000 万条（事实数据、解说词、IP 图文），在云原生容器集群内训练百亿参数文本大模型，输出 “语义搜索 + 智能解读” 增值能力。
`;

  return (
    <>
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <AIAnswer
          title="智能解读"
          content={content}
          onContinue={() => {
            alert("继续追问");
          }}
        />
      </div>
    </>
  )
}

export default App
