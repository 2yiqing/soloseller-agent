import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sparkles, Tag, TrendingUp, Users, Package, Globe, ShoppingCart,
  DollarSign, Truck, FileText, Search, BarChart3, FileEdit, Calculator,
  MessageSquare, ClipboardList, FileCheck, Download, Lightbulb, Star,
  Code, Send, Loader2, CheckCircle2, Clock, Menu, X, ChevronDown,
  ChevronUp, ArrowRight, RotateCcw, AlertTriangle,
  HelpCircle, ListChecks, ShieldCheck, Rocket,
} from "lucide-react";
import mockAnalysis from "@/mock/mockAnalysis";

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

const demoData: Record<string, string> = {
  productName: "便携式宠物饮水杯",
  targetMarket: "美国",
  platform: "Amazon",
  purchaseCost: "18",
  logisticsCost: "12",
  expectedPrice: "16.99",
  description: "适合户外遛狗和旅行使用，支持一键出水和回水，防漏设计，BPA-Free 安全材质。",
};

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
    items: [
      "跨境电商个人卖家需一人完成选品、文案、客服、利润测算和运营规划，流程复杂且依赖经验",
      "AI Agent 可把这些工作流程自动化，让个人卖家专注于决策而非重复劳动",
      "AI 正在让「一人公司」成为可能，跨境电商是 AI 提效的最佳落地场景",
      "把一个小团队的能力压缩成一个 AI 工作台，大幅降低跨境创业门槛",
    ],
  },
  {
    icon: Users, title: "目标用户",
    items: ["Amazon 卖家", "TikTok Shop 卖家", "Shopify 独立站卖家", "跨境电商副业创业者", "小型跨境团队", "代运营公司"],
  },
  {
    icon: Star, title: "核心价值",
    items: [
      "提升上新效率：从数天缩短至数分钟，自动生成完整上架方案",
      "降低跨境创业门槛：新手也能按系统化流程完成专业运营",
      "减少工具切换：一个工作台完成选品、文案、客服、利润测算",
      "AI 运营智能体：围绕真实业务流程设计，而非泛用的聊天机器人",
    ],
  },
  {
    icon: Code, title: "技术思路",
    items: [
      "React 前端 + Mock 数据，Demo 阶段完整展示多 Agent 工作流",
      "六大 Agent 模块并行协作，模拟真实 AI 运营流程",
      "未来接入 Python FastAPI 后端 + SQLite 数据持久化",
      "后续接入大模型 API + 真实电商数据，升级为 AI 操作系统",
    ],
  },
  {
    icon: Rocket, title: "未来规划",
    items: [
      "接入真实电商平台数据（Amazon SP-API、TikTok Shop API）",
      "广告数据分析与优化建议，ACOS 智能调控",
      "客服系统集成，自动回复与工单管理",
      "微信 / 企业微信提醒，运营数据每日推送",
      "多店铺管理，支持跨平台统一运营看板",
    ],
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
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(agentList.map(() => "idle"));
  const [isGenerated, setIsGenerated] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({ ...demoData });
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetToDemo = () => {
    setFormData({ ...demoData });
  };

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

  const handleExport = useCallback(() => {
    const productName = formData.productName || "未命名产品";
    const md = [
      `# SoloSeller Agent — ${productName} 上架作战包`,
      "",
      "> 由 AI 运营智能体自动生成 | 生成时间：" + new Date().toLocaleString("zh-CN"),
      "",
      "---",
      "",
      "## 产品基本信息",
      "",
      `- **产品名称**：${formData.productName || "-"}`,
      `- **目标市场**：${formData.targetMarket || "-"}`,
      `- **销售平台**：${formData.platform || "-"}`,
      `- **采购成本**：¥${formData.purchaseCost || "-"}`,
      `- **物流成本**：¥${formData.logisticsCost || "-"}`,
      `- **预期售价**：$${formData.expectedPrice || "-"}`,
      `- **产品描述**：${formData.description || "-"}`,
      "",
      "---",
      "",
      "## 市场机会判断",
      "",
      `**机会评分**：${mockAnalysis.marketAnalysis.opportunityScore} / 10`,
      "",
      `> ${mockAnalysis.marketAnalysis.conclusion}`,
      "",
      "### 机会理由",
      "",
      ...mockAnalysis.marketAnalysis.reasons.map((r) => `- ${r}`),
      "",
      "### 风险提示",
      "",
      ...mockAnalysis.marketAnalysis.risks.map((r) => `- ${r}`),
      "",
      "---",
      "",
      "## 竞品洞察",
      "",
      `**价格区间**：${mockAnalysis.competitorInsights.priceRange}`,
      "",
      "### 主要竞品卖点",
      "",
      ...mockAnalysis.competitorInsights.sellingPoints.map((p) => `- ${p}`),
      "",
      "### 主要差评痛点",
      "",
      ...mockAnalysis.competitorInsights.painPoints.map((p) => `- ${p}`),
      "",
      "### 差异化机会",
      "",
      ...mockAnalysis.competitorInsights.differentiationOpportunities.map((d, i) => `${i + 1}. ${d}`),
      "",
      "---",
      "",
      "## 英文 Listing",
      "",
      "### Title",
      "",
      mockAnalysis.listing.title,
      "",
      "### Bullet Points",
      "",
      ...mockAnalysis.listing.bulletPoints.map((bp, i) => `${i + 1}. ${bp}`),
      "",
      "### Product Description",
      "",
      mockAnalysis.listing.description,
      "",
      "---",
      "",
      "## SEO 关键词",
      "",
      ...mockAnalysis.seoKeywords.map((kw) => `- ${kw}`),
      "",
      "---",
      "",
      "## 利润测算",
      "",
      `| 项目 | 金额 |`,
      `|------|------|`,
      `| 采购成本 | ¥${mockAnalysis.profitAnalysis.purchaseCost} |`,
      `| 物流成本 | ¥${mockAnalysis.profitAnalysis.logisticsCost} |`,
      `| 建议售价 | $${mockAnalysis.profitAnalysis.suggestedPrice} |`,
      `| 平台佣金 | $${mockAnalysis.profitAnalysis.platformFee} |`,
      `| 广告成本 | $${mockAnalysis.profitAnalysis.adCost} |`,
      `| **预估毛利率** | **${mockAnalysis.profitAnalysis.estimatedGrossMargin}%** |`,
      "",
      "### 运营建议",
      "",
      ...mockAnalysis.profitAnalysis.suggestions.map((s) => `- ${s}`),
      "",
      "---",
      "",
      "## 客服 FAQ",
      "",
      "### 售前 FAQ",
      "",
      ...mockAnalysis.customerService.preSaleFAQ.map(
        (faq, i) => `**Q${i + 1}：${faq.question}**\n\n${faq.answer}\n`
      ),
      "",
      "### 差评回复模板",
      "",
      ...mockAnalysis.customerService.negativeReviewTemplates.map(
        (tpl) => `**场景：${tpl.scenario}**\n\n${tpl.reply}\n`
      ),
      "",
      "---",
      "",
      "## 每日运营计划",
      "",
      "### 今日待办",
      "",
      ...mockAnalysis.operationPlan.todayTasks.map((t) => `- [ ] ${t}`),
      "",
      "### 明日计划",
      "",
      ...mockAnalysis.operationPlan.tomorrowPlan.map((t) => `- [ ] ${t}`),
      "",
      "### 风险提醒",
      "",
      ...mockAnalysis.operationPlan.riskAlerts.map((r) => `- ⚠️ ${r}`),
      "",
      "---",
      "",
      "> 本报告由 SoloSeller Agent 自动生成，仅供运营参考。",
    ].join("\n");

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SoloSeller_Agent_${productName}_上架作战包.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [formData]);

  const scrollTo = useCallback((id: NavSection) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); setMobileMenuOpen(false); }
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsGenerated(false);
    setAgentStatuses(agentList.map(() => "idle"));
    setCompletedCount(0);

    let elapsed = 0;
    const durations = agentList.map(() => 800 + Math.random() * 400);

    agentList.forEach((_, i) => {
      const startTime = elapsed;
      elapsed += durations[i];

      setTimeout(() => {
        setAgentStatuses((prev) => { const n = [...prev]; n[i] = "running"; return n; });
      }, startTime);

      setTimeout(() => {
        setAgentStatuses((prev) => { const n = [...prev]; n[i] = "done"; return n; });
        setCompletedCount((c) => c + 1);
      }, elapsed);
    });

    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    }, elapsed + 300);
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
        <section id="hero" className="relative text-center pt-20 pb-8">
          {/* 浮动光球 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="hero-orb-1 absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-indigo-500/8 blur-3xl" />
            <div className="hero-orb-2 absolute top-10 right-1/4 w-64 h-64 rounded-full bg-purple-500/8 blur-3xl" />
            <div className="hero-orb-3 absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-indigo-400/5 blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-indigo-400/20 bg-indigo-400/5 text-indigo-300 text-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8] animate-pulse" />
              TRAE AI 创造力大赛 · 学习工作赛道
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-5 animate-shimmer">
              SoloSeller Agent
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-4 font-medium">跨境电商一人公司运营智能体</p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 bg-clip-text text-transparent mb-8">
              让一个人也能拥有跨境电商运营团队
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-indigo-400/15 bg-indigo-400/5 text-indigo-300/80 text-sm font-medium backdrop-blur-sm hover:border-indigo-400/30 hover:bg-indigo-400/10 transition-all">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 工作区：表单 */}
        <section id="workspace">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shadow-glow-sm"><Send className="w-4 h-4 text-indigo-400" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">开始使用</h2>
              <p className="text-xs text-slate-500">输入产品信息，AI 自动生成上架作战包</p>
            </div>
          </div>
          <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-indigo-400 font-semibold bg-indigo-400/10 px-2.5 py-1 rounded-lg">Step 1</span>
                <span className="text-sm text-slate-300 font-medium">产品信息</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-400 font-medium bg-amber-400/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> 演示案例已预填
                </span>
                <button onClick={resetToDemo}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-indigo-500/5">
                  <RotateCcw className="w-3 h-3" /> 恢复
                </button>
              </div>
            </div>
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
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" />
                    ) : (
                      <input id={field.id} type={field.type} placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
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
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
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
        </section>

        {/* 4. 上架作战包结果区 */}
        {isGenerated && (
          <section ref={resultRef} id="result" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-glow-emerald"><FileCheck className="w-4 h-4 text-emerald-400" /></div>
              <div>
                <h2 className="text-lg font-bold text-white">上架作战包</h2>
                <p className="text-xs text-emerald-400/80">AI 分析完成，共生成 7 个模块</p>
              </div>
              <button onClick={handleExport}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
                <Download className="w-4 h-4" /> 导出上架作战包
              </button>
            </div>

            <div className="space-y-5">
              {/* 1. 市场机会判断 */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-indigo-500 shadow-card animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-indigo-400" /></div>
                  <div>
                    <h3 className="text-base font-semibold text-white">市场机会判断</h3>
                    <p className="text-xs text-slate-500">{mockAnalysis.marketAnalysis.conclusion.slice(0, 40)}...</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 bg-indigo-500/10 rounded-xl px-4 py-2 stat-highlight">
                    <span className="text-2xl font-bold text-indigo-400">{mockAnalysis.marketAnalysis.opportunityScore}</span>
                    <span className="text-xs text-slate-500">/ 10</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> 机会理由</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.marketAnalysis.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/40 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> 风险提示</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.marketAnalysis.risks.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/40 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. 竞品洞察 */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-purple-500 shadow-card animate-fade-in-up" style={{ animationDelay: "80ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-purple-400" /></div>
                  <div>
                    <h3 className="text-base font-semibold text-white">竞品洞察</h3>
                    <p className="text-xs text-slate-500">价格区间：{mockAnalysis.competitorInsights.priceRange}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-3">竞品卖点</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.competitorInsights.sellingPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 flex-shrink-0" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-3">差评痛点</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.competitorInsights.painPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/40 flex-shrink-0" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-700/20">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> 差异化机会</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mockAnalysis.competitorInsights.differentiationOpportunities.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-400 bg-emerald-500/[0.03] rounded-lg px-3 py-2">
                        <span className="mt-1 text-emerald-400 font-bold text-xs">{i + 1}.</span>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. 英文 Listing */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-blue-500 shadow-card animate-fade-in-up" style={{ animationDelay: "160ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><FileEdit className="w-4 h-4 text-blue-400" /></div>
                  <h3 className="text-base font-semibold text-white">英文 Listing</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4">
                    <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Title</h4>
                    <p className="text-sm text-slate-200 leading-relaxed">{mockAnalysis.listing.title}</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4">
                    <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Bullet Points</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.listing.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0" />
                          {bp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4">
                    <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Product Description</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{mockAnalysis.listing.description}</p>
                  </div>
                </div>
              </div>

              {/* 4. SEO 关键词 */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-cyan-500 shadow-card animate-fade-in-up" style={{ animationDelay: "240ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center"><Search className="w-4 h-4 text-cyan-400" /></div>
                  <h3 className="text-base font-semibold text-white">SEO 关键词</h3>
                  <span className="text-xs text-slate-500">{mockAnalysis.seoKeywords.length} 个关键词</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.seoKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg border border-slate-700/30 bg-slate-900/40 text-xs text-slate-400 hover:border-indigo-500/30 hover:text-indigo-400 transition-colors">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. 利润测算 */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-emerald-500 shadow-card animate-fade-in-up" style={{ animationDelay: "320ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Calculator className="w-4 h-4 text-emerald-400" /></div>
                  <h3 className="text-base font-semibold text-white">利润测算</h3>
                  <span className="ml-auto text-2xl font-bold text-gradient-emerald stat-highlight">{mockAnalysis.profitAnalysis.estimatedGrossMargin}% <span className="text-sm font-normal text-slate-500">毛利率</span></span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "采购成本", value: `¥${mockAnalysis.profitAnalysis.purchaseCost}` },
                    { label: "物流成本", value: `¥${mockAnalysis.profitAnalysis.logisticsCost}` },
                    { label: "建议售价", value: `$${mockAnalysis.profitAnalysis.suggestedPrice}`, highlight: true },
                    { label: "平台佣金", value: `$${mockAnalysis.profitAnalysis.platformFee}` },
                    { label: "广告成本", value: `$${mockAnalysis.profitAnalysis.adCost}` },
                    { label: "预估毛利", value: `${mockAnalysis.profitAnalysis.estimatedGrossMargin}%`, highlight: true },
                  ].map((item, i) => (
                    <div key={i} className={`rounded-xl border p-3 text-center transition-all ${
                      item.highlight
                        ? "border-emerald-500/30 bg-emerald-500/5 stat-highlight-emerald"
                        : "border-slate-700/30 bg-slate-900/30"
                    }`}>
                      <p className={`text-xs mb-1 ${item.highlight ? "text-emerald-400 font-medium" : "text-slate-500"}`}>{item.label}</p>
                      <p className={`text-base font-bold ${item.highlight ? "text-gradient-emerald" : "text-white"}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-700/20">
                  <h4 className="text-sm font-semibold text-indigo-400 mb-3">运营建议</h4>
                  <ul className="space-y-2">
                    {mockAnalysis.profitAnalysis.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 flex-shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6. 客服 FAQ */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-amber-500 shadow-card animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center"><HelpCircle className="w-4 h-4 text-amber-400" /></div>
                  <h3 className="text-base font-semibold text-white">客服 FAQ</h3>
                </div>
                <div className="space-y-3">
                  {mockAnalysis.customerService.preSaleFAQ.map((faq, i) => (
                    <details key={i} className="group rounded-xl border border-slate-700/30 bg-slate-900/30 overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        <span className="flex items-center gap-2"><span className="text-xs text-indigo-400 font-bold">Q{i + 1}</span> {faq.question}</span>
                        <ChevronDown className="w-4 h-4 text-slate-600 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4 text-sm text-slate-500 leading-relaxed">{faq.answer}</div>
                    </details>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-slate-700/20">
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">差评回复模板</h4>
                  <div className="space-y-3">
                    {mockAnalysis.customerService.negativeReviewTemplates.map((tpl, i) => (
                      <div key={i} className="rounded-xl border border-slate-700/30 bg-slate-900/30 p-4">
                        <p className="text-xs font-semibold text-amber-400 mb-2">{tpl.scenario}</p>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{tpl.reply}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7. 每日运营计划 */}
              <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 border-l-[3px] border-l-rose-500 shadow-card animate-fade-in-up" style={{ animationDelay: "480ms" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center"><ListChecks className="w-4 h-4 text-rose-400" /></div>
                  <h3 className="text-base font-semibold text-white">每日运营计划</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-3 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> 今日待办</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.operationPlan.todayTasks.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 flex-shrink-0" />{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> 明日计划</h4>
                    <ul className="space-y-2">
                      {mockAnalysis.operationPlan.tomorrowPlan.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/40 flex-shrink-0" />{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-700/20">
                  <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> 风险提醒</h4>
                  <ul className="space-y-2">
                    {mockAnalysis.operationPlan.riskAlerts.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-400/80">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/40 flex-shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Agent 执行流程 */}
        <section id="flow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shadow-glow-sm"><TrendingUp className="w-4 h-4 text-indigo-400" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">工作流程</h2>
              <p className="text-xs text-slate-500">6 个 Agent 并行协作，自动生成完整运营方案</p>
            </div>
            {isGenerating && (
              <span className="ml-auto text-sm font-bold text-indigo-400 tabular-nums">
                {completedCount} / {agentList.length}
              </span>
            )}
          </div>
          <div className="rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 shadow-card">
            {/* 进度条 */}
            {isGenerating && (
              <div className="mb-8">
                <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" style={{ width: `${(completedCount / agentList.length) * 100}%` }} />
                </div>
              </div>
            )}

            {/* 流程步骤 */}
            <div className="flex items-center justify-center gap-2 mb-10 text-sm flex-wrap">
              {["产品想法", "任务拆解", "多 Agent 并行", "结果整合", "上架作战包"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all ${
                    isGenerating && i <= Math.floor(completedCount / 2)
                      ? "bg-indigo-500/20 border border-indigo-400/30 text-indigo-300"
                      : i % 2 === 0
                      ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                      : "bg-purple-500/10 border border-purple-500/20 text-purple-300"
                  }`}>
                    {step}
                  </span>
                  {i < 4 && <span className="text-slate-600"><ArrowRight className="w-3 h-3" /></span>}
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700/50 via-slate-700/30 to-slate-700/20" />
              {isGenerating && completedCount > 0 && (
                <div className="absolute left-5 top-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-400 shadow-[0_0_6px_rgba(99,102,241,0.5)] transition-all duration-700 ease-out" style={{ height: `${(completedCount / agentList.length) * 100}%` }} />
              )}
              {isGenerated && (
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-400/50 to-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
              )}
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
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shadow-glow-sm"><Lightbulb className="w-4 h-4 text-indigo-400" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">项目介绍</h2>
              <p className="text-xs text-slate-500">不只是工具，更是一人公司的增长引擎</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {introCards.map((card, i) => (
              <div key={i} className="card-glow group rounded-2xl border border-indigo-400/10 bg-white/[0.02] backdrop-blur-xl p-6 shadow-card">
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
