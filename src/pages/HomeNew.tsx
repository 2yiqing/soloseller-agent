import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sparkles, Tag, TrendingUp, Users, Package, Globe, ShoppingCart,
  DollarSign, Truck, FileText, Search, BarChart3, FileEdit, Calculator,
  MessageSquare, ClipboardList, FileCheck, Download, Lightbulb, Star,
  Code, Send, Loader2, CheckCircle2, Clock, Menu, X, ChevronDown,
  ChevronUp, ArrowRight, ArrowUpRight,
} from "lucide-react";

type AgentStatus = "idle" | "running" | "done";
type NavSection = "hero" | "workspace" | "flow" | "result" | "intro";

const tags = ["学习工作赛道", "AI Agent", "跨境电商", "一人公司"];

const navItems = [
  { id: "hero" as NavSection, label: "首页" },
  { id: "workspace" as NavSection, label: "开始使用" },
  { id: "flow" as NavSection, label: "工作流程" },
  { id: "result" as NavSection, label: "成果展示" },
  { id: "intro" as NavSection, label: "项目介绍" },
];

const coreFields = [
  { id: "productName", label: "产品名称", icon: Package, placeholder: "例如：智能猫砂盆", helper: "输入你要销售的产品名称", type: "text" },
  { id: "targetMarket", label: "目标市场", icon: Globe, placeholder: "北美 / 欧洲 / 东南亚 / 日本", helper: "选择目标销售区域", type: "text" },
  { id: "platform", label: "销售平台", icon: ShoppingCart, placeholder: "Amazon / Shopify / Temu / TikTok", helper: "选择上架平台", type: "text" },
  { id: "description", label: "产品描述", icon: FileText, placeholder: "简要描述产品功能、材质、适用场景等", helper: "描述越详细，AI 分析越精准", type: "textarea" },
];

const advancedFields = [
  { id: "purchaseCost", label: "采购成本 (¥)", icon: DollarSign, placeholder: "例如：25", helper: "单件产品的采购价格", type: "number" },
  { id: "logisticsCost", label: "物流成本 (¥)", icon: Truck, placeholder: "例如：15", helper: "单件产品的头程物流费用", type: "number" },
  { id: "expectedPrice", label: "预期售价 ($)", icon: Tag, placeholder: "例如：19.99", helper: "目标售价，将用于利润测算", type: "number" },
];

const agentList = [
  { icon: Search, name: "选品分析", desc: "市场机会与风险评估" },
  { icon: BarChart3, name: "竞品分析", desc: "价格区间与差评痛点" },
  { icon: FileEdit, name: "Listing 文案", desc: "英文标题与五点描述" },
  { icon: Calculator, name: "利润测算", desc: "采购/物流/佣金/毛利" },
  { icon: MessageSquare, name: "客服话术", desc: "FAQ 与差评回复模板" },
  { icon: ClipboardList, name: "老板简报", desc: "每日待办与运营建议" },
];

const introCards = [
  {
    icon: Lightbulb, title: "为什么做这个项目",
    items: ["AI 正在让「一人公司」成为可能", "跨境电商是 AI 提效的真实场景", "多角色工作压缩为一个 AI 工作台", "让个人卖家拥有小团队运营能力"],
  },
  {
    icon: Users, title: "目标用户",
    items: ["Amazon / TikTok Shop 卖家", "Shopify 独立站卖家", "跨境电商副业创业者", "小型跨境团队与代运营公司"],
  },
  {
    icon: Star, title: "核心价值",
    items: ["从「问 AI 一个问题」到「让 AI 完成一组任务」", "大幅降低上新前的准备成本", "按月订阅 / 按次收费 / SaaS 版本", "围绕真实业务流程设计的 AI 运营智能体"],
  },
  {
    icon: Code, title: "技术思路",
    items: ["前端 React + 后端 Python FastAPI", "六大 Agent 模块并行协作", "大模型 API + 结构化输出 + 多 Agent 工作流", "SQLite 存储 → 真实电商 API → AI 操作系统"],
  },
];

function AgentStatusIcon({ status }: { status: AgentStatus }) {
  if (status === "running") return <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />;
  if (status === "done") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  return <Clock className="w-4 h-4 text-slate-600" />;
}

function ExamplePreview() {
  return (
    <div className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-amber-400 font-medium bg-amber-400/10 px-2 py-0.5 rounded">示例</span>
        <span className="text-xs text-slate-500">便携式宠物饮水杯 · 美国市场</span>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded bg-slate-700/50" />
        <div className="h-2 w-1/2 rounded bg-slate-700/50" />
        <div className="h-2 w-2/3 rounded bg-slate-700/50" />
        <div className="flex gap-2 mt-3">
          <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">市场评分 8.2</span>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">毛利 42%</span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">中风险</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<NavSection>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(agentList.map(() => "idle"));
  const [isGenerated, setIsGenerated] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id as NavSection);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    const ids = navItems.map((n) => n.id);
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: NavSection) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); setMobileMenuOpen(false); }
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsGenerated(false);
    setAgentStatuses(agentList.map(() => "idle"));
    agentList.forEach((_, i) => {
      setTimeout(() => setAgentStatuses((prev) => { const n = [...prev]; n[i] = "running"; return n; }), i * 600 + 300);
      setTimeout(() => setAgentStatuses((prev) => { const n = [...prev]; n[i] = "done"; return n; }), i * 600 + 1200);
    });
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }, agentList.length * 600 + 1500);
  }, [isGenerating]);

  return (
    <div className="relative min-h-screen bg-[#060b1a] text-slate-200 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-indigo-500/8 via-purple-500/5 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute top-2/3 right-1/4 w-[400px] h-[300px] rounded-full bg-indigo-500/4 blur-3xl" />
      </div>
      <div className="fixed inset-0 pointer-events-none bg-grid" />

      {/* 粘性导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-indigo-500/10 bg-[#060b1a]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-bold text-indigo-400 tracking-wide">SoloSeller</span>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.id ? "bg-indigo-500/10 text-indigo-300" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-indigo-500/10 bg-[#060b1a]/95 backdrop-blur-xl px-6 py-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? "bg-indigo-500/10 text-indigo-300" : "text-slate-500 hover:text-slate-300"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-24">

        {/* 1. Hero */}
        <section id="hero" className="text-center pt-16 pb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-sm">
            <Sparkles className="w-3.5 h-3.5" /> TRAE AI 创造力大赛
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 animate-shimmer">SoloSeller Agent</h1>
          <p className="text-lg md:text-xl text-slate-400 mb-4">跨境电商一人公司运营智能体</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto mb-6" />
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent mb-8">
            让一个人也能拥有跨境电商运营团队
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((t) => (<span key={t} className="px-3 py-1.5 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-300/80 text-sm font-medium">{t}</span>))}
          </div>
        </section>

        {/* 2+4. 工作区：表单 + 结果 */}
        <section id="workspace">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center"><Send className="w-4 h-4 text-indigo-400" /></div>
            <h2 className="text-xl font-bold text-white">开始使用</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">输入产品信息，AI 自动生成上架作战包</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* 左侧表单 */}
            <div className="lg:col-span-3 rounded-2xl border border-indigo-500/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.id} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                      <label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-1.5">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" /> {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea id={field.id} rows={3} placeholder={field.placeholder}
                          className="w-full rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" />
                      ) : (
                        <input id={field.id} type={field.type} placeholder={field.placeholder}
                          className="w-full rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
                      )}
                      <p className="mt-1 text-xs text-slate-600">{field.helper}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors">
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  高级定价设置 <span className="text-xs text-slate-600">（可选，用于精确利润测算）</span>
                </button>
                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/20">
                    {advancedFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-indigo-400" /> {field.label}
                          </label>
                          <input id={field.id} type={field.type} placeholder={field.placeholder}
                            className="w-full rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
                          <p className="mt-1 text-xs text-slate-600">{field.helper}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <button onClick={handleGenerate} disabled={isGenerating}
                className={`mt-6 w-full rounded-xl font-semibold py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-300 ${isGenerating ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"}`}>
                {isGenerating ? (<><Loader2 className="w-4 h-4 animate-spin" /> 正在分析...</>) : (<><Sparkles className="w-4 h-4" /> 生成上架作战包</>)}
              </button>
            </div>
            {/* 右侧结果 */}
            <div ref={resultRef} id="result" className="lg:col-span-2 scroll-mt-20">
              <div className="rounded-2xl border border-indigo-500/10 bg-white/[0.02] backdrop-blur-xl p-5 md:p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-semibold text-white">上架作战包</h3>
                  {isGenerated && (<span className="ml-auto text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 已生成</span>)}
                </div>
                {isGenerated ? (
                  <div className="flex-1 space-y-3">
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4">
                      <p className="text-xs text-emerald-400 font-medium mb-2">市场机会评分</p>
                      <div className="flex items-end gap-2"><span className="text-2xl font-bold text-white">8.2</span><span className="text-sm text-slate-400">/ 10</span></div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-700"><div className="h-full w-[82%] rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-3"><p className="text-xs text-slate-500">预估毛利</p><p className="text-lg font-bold text-emerald-400">42%</p></div>
                      <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-3"><p className="text-xs text-slate-500">竞争强度</p><p className="text-lg font-bold text-amber-400">中等</p></div>
                    </div>
                    <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-3">
                      <p className="text-xs text-slate-500 mb-1">推荐标题</p>
                      <p className="text-sm text-slate-200">Portable Pet Water Bottle - Leak-Proof Travel Dog Water Dispenser</p>
                    </div>
                    <button className="w-full rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-sm py-2.5 flex items-center justify-center gap-2 hover:bg-indigo-500/10 transition-colors">
                      <Download className="w-4 h-4" /> 下载完整报告
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <ExamplePreview />
                    <div className="mt-5 flex items-center gap-2 text-sm text-indigo-400"><ArrowUpRight className="w-4 h-4" /><span>填写左侧产品信息，一键生成你的第一份上架作战包</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Agent 执行流程 */}
        <section id="flow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-indigo-400" /></div>
            <h2 className="text-xl font-bold text-white">工作流程</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">6 个 Agent 并行协作</span>
          </div>
          <div className="rounded-2xl border border-indigo-500/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-10 text-sm flex-wrap">
              {["产品想法", "任务拆解", "多 Agent 并行", "结果整合", "上架作战包"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-full font-medium ${i % 2 === 0 ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300" : "bg-purple-500/10 border border-purple-500/20 text-purple-300"}`}>{step}</span>
                  {i < 4 && <span className="text-slate-600"><ArrowRight className="w-3 h-3" /></span>}
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-indigo-500/10" />
              <div className="space-y-4">
                {agentList.map((agent, i) => {
                  const status = agentStatuses[i];
                  const isActive = status === "running";
                  const isDone = status === "done";
                  return (
                    <div key={i} className="relative pl-12">
                      <div className={`absolute left-[14px] top-4 w-3 h-3 rounded-full border-2 transition-all duration-500 ${isDone ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" : isActive ? "bg-indigo-500 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.5)] animate-pulse" : "bg-slate-700 border-slate-600"}`}>
                        {isActive && <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-30" />}
                      </div>
                      <div className={`rounded-xl border p-4 transition-all duration-500 ${isActive ? "border-indigo-500/30 bg-indigo-500/[0.04] animate-pulse-border" : isDone ? "border-emerald-500/15 bg-emerald-500/[0.02]" : "border-slate-700/30 bg-slate-900/30 hover:border-indigo-500/20 hover:bg-slate-900/50"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isDone ? "bg-emerald-500/10" : "bg-indigo-500/10"}`}>
                              <agent.icon className={`w-4 h-4 ${isDone ? "text-emerald-400" : "text-indigo-400"}`} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-slate-200">{agent.name} Agent</h4>
                              <p className="text-xs text-slate-500">{agent.desc}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isActive && <span className="text-xs text-indigo-400 animate-pulse">执行中</span>}
                            {isDone && <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 完成</span>}
                            {!isActive && !isDone && <span className="text-xs text-slate-600">等待中</span>}
                            <AgentStatusIcon status={status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. 项目介绍 */}
        <section id="intro" className="pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-indigo-400" /></div>
            <h2 className="text-xl font-bold text-white">项目介绍</h2>
          </div>
          <p className="text-sm text-slate-500 mb-8 max-w-xl">不只是工具，更是一人公司的增长引擎 —— 让 AI 成为你跨境电商运营的基础设施</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {introCards.map((card, i) => (
              <div key={i} className="group rounded-2xl border border-indigo-500/10 bg-white/[0.02] backdrop-blur-xl p-6 hover:border-indigo-500/25 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/15 group-hover:scale-110 transition-all duration-300">
                    <card.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 flex-shrink-0 group-hover:bg-indigo-400/60 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
