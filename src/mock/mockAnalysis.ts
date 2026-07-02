/* ========== 类型定义 ========== */

export interface MarketAnalysis {
  conclusion: string;
  opportunityScore: number;
  reasons: string[];
  risks: string[];
}

export interface CompetitorInsights {
  priceRange: string;
  sellingPoints: string[];
  painPoints: string[];
  differentiationOpportunities: string[];
}

export interface Listing {
  title: string;
  bulletPoints: string[];
  description: string;
}

export interface ProfitAnalysis {
  purchaseCost: number;
  logisticsCost: number;
  suggestedPrice: number;
  platformFee: number;
  adCost: number;
  estimatedGrossMargin: number;
  suggestions: string[];
}

export interface CustomerService {
  preSaleFAQ: { question: string; answer: string }[];
  afterSaleReply: string[];
  negativeReviewTemplates: { scenario: string; reply: string }[];
}

export interface OperationPlan {
  todayTasks: string[];
  tomorrowPlan: string[];
  riskAlerts: string[];
}

export interface MockAnalysisResult {
  marketAnalysis: MarketAnalysis;
  competitorInsights: CompetitorInsights;
  listing: Listing;
  seoKeywords: string[];
  profitAnalysis: ProfitAnalysis;
  customerService: CustomerService;
  operationPlan: OperationPlan;
}

/* ========== Mock 数据 ========== */

const mockAnalysis: MockAnalysisResult = {
  marketAnalysis: {
    conclusion:
      "便携式宠物饮水杯在美国市场具有中等偏上的机会。宠物出行用品品类年增长率约 18%，用户需求明确，竞争格局尚未固化，适合中小卖家切入。",
    opportunityScore: 8.2,
    reasons: [
      "美国宠物主出行频率高，66% 的美国家庭拥有宠物，其中 37% 会定期带宠物户外活动",
      "Amazon 上「Portable Pet Water Bottle」月搜索量约 42,000 次，呈上升趋势",
      "现有竞品差评集中在漏水、材质异味和出水不畅，存在明确的改进空间",
      "产品体积小、重量轻，跨境物流成本可控，适合小卖家起步",
      "BPA-Free 安全材质已成标配，差异化可从防漏设计和一键操作入手",
    ],
    risks: [
      "价格竞争激烈，低价区间（$8-$12）已有大量中国卖家",
      "宠物用品需通过 FDA 或 ASTM 安全认证，有合规门槛",
      "季节性波动明显，夏季为旺季，冬季销量可能下滑 30%-40%",
      "头部品牌（如 MalsiPree、Petkit）已占据较高评分和评论数，新品冷启动需要广告投入",
    ],
  },

  competitorInsights: {
    priceRange: "$8.99 - $24.99",
    sellingPoints: [
      "一键出水 + 回水设计，避免浪费",
      "防漏硅胶密封圈，可放入背包不渗水",
      "内置活性炭滤芯，提供更洁净的饮水",
      "折叠式水槽设计，收纳方便",
      "食品级安全材质，BPA-Free 认证",
    ],
    painPoints: [
      "部分产品瓶盖密封不严，横向放置会漏水",
      "出水按钮需要较大力气，小型犬主人单手操作困难",
      "塑料材质在高温下产生异味，影响宠物饮水意愿",
      "水槽容量太小（<150ml），大型犬不够喝",
      "滤芯更换成本高且不易购买替换件",
      "部分 Listing 描述夸大，实际出水量与描述不符",
    ],
    differentiationOpportunities: [
      "采用 Tritan 材质替代普通塑料，解决异味问题并提升品质感",
      "优化按压结构，降低操作力度至 2N 以内，单手轻松操作",
      "加大水槽容量至 250ml，覆盖中型犬需求",
      "设计可拆卸清洗结构，解决卫生死角问题",
      "赠送 2 个备用滤芯 + 收纳袋，提升开箱体验和好评率",
    ],
  },

  listing: {
    title:
      "Portable Dog Water Bottle - Leak-Proof 500ml Travel Pet Water Dispenser with One-Hand Operation, BPA-Free Tritan Material, Foldable Bowl for Walking, Hiking & Outdoor Use",
    bulletPoints: [
      "【One-Hand Operation】Squeeze to dispense fresh water and release to retract unused water back into the bottle — no waste, no mess. Designed for easy one-hand use while holding the leash.",
      "【100% Leak-Proof Design】Upgraded silicone sealing ring and secure lock mechanism ensure zero leakage in your backpack or car. Toss it in your bag with confidence.",
      "【Premium BPA-Free Tritan Material】Made from high-quality Tritan copolyester, odor-resistant and dishwasher-safe. Unlike regular plastic bottles, no plastic smell even in hot weather.",
      "【Large Capacity & Foldable Bowl】500ml (17oz) capacity with an extra-wide 250ml foldable drinking bowl, suitable for small to medium-sized dogs. Perfect for walks, hikes, road trips, and park outings.",
      "【Complete Travel Kit】Includes 2 replacement carbon filters for fresh-tasting water, a carry pouch, and a carabiner clip. A thoughtful gift for dog lovers and an ideal choice for pet travel essentials.",
    ],
    description:
      "Keep your furry friend hydrated on every adventure with the SoloH2O Portable Dog Water Bottle. Designed for pet parents who value convenience and quality, this all-in-one water dispenser combines a 500ml leak-proof Tritan bottle with a foldable drinking bowl. The intuitive one-hand squeeze mechanism lets you dispense water instantly and retract the unused portion back into the bottle — no dripping, no waste. Crafted from premium BPA-Free Tritan material, it stays odor-free even under the summer sun. Whether you're heading out for a quick walk around the block or a weekend hiking trip, this travel water bottle ensures your dog always has access to clean, fresh water. Complete with spare filters, a carry pouch, and a carabiner, it's the only hydration solution your pup will ever need.",
  },

  seoKeywords: [
    "portable dog water bottle",
    "pet water dispenser travel",
    "leak proof dog water bottle",
    "dog water bottle for walking",
    "BPA free pet water bottle",
    "foldable dog bowl water bottle",
    "dog hiking water bottle",
    "pet travel essentials",
    "dog water bottle outdoor",
    "one hand dog water dispenser",
    "Tritan dog water bottle",
    "best portable dog water bottle 2024",
    "dog water bottle with filter",
    "puppy travel water bottle",
    "pet hydration on the go",
  ],

  profitAnalysis: {
    purchaseCost: 18,
    logisticsCost: 12,
    suggestedPrice: 16.99,
    platformFee: 2.55,
    adCost: 2.5,
    estimatedGrossMargin: 42,
    suggestions: [
      "建议售价 $16.99 处于中端价位，避开 $8-$12 红海低价区间，同时比头部品牌 $24.99 更有竞争力",
      "首批备货 200 件，总成本约 ¥6,000（含采购 + 物流），风险可控",
      "广告 ACOS 控制在 25% 以内，即单件广告成本不超过 $4.25",
      "建议首月投放 5-8 个精准长尾关键词，日预算 $30-$50 测试转化率",
      "若月销达 200 件，单件利润约 ¥30，月毛利约 ¥6,000",
      "后续可考虑捆绑销售（+ 替换滤芯 3 件装），提升客单价和复购率",
    ],
  },

  customerService: {
    preSaleFAQ: [
      {
        question: "Is this water bottle suitable for large dogs?",
        answer:
          "The 500ml bottle and 250ml bowl are best suited for small to medium-sized dogs (up to 40 lbs). For larger dogs, we recommend refilling during longer outings. The bottle is easy to refill from any water source.",
      },
      {
        question: "Does it really not leak when placed sideways in a bag?",
        answer:
          "Yes! Our upgraded locking mechanism and double silicone seal prevent any leakage. We've tested it extensively — you can confidently place it horizontally in your backpack, tote, or car door pocket.",
      },
      {
        question: "How do I clean the bottle and replace the filter?",
        answer:
          "The bottle and bowl are fully detachable for easy cleaning. We recommend hand-washing with warm soapy water every 3-5 uses. The carbon filter can be replaced by unscrewing the cap — each filter lasts approximately 2 months or 60 refills. 2 spare filters are included in the box.",
      },
      {
        question: "What material is the bottle made of? Is it safe?",
        answer:
          "The bottle is made from Tritan copolyester, a premium BPA-free material that is FDA-approved, dishwasher-safe, and odor-resistant. It won't develop any plastic taste even in hot weather, making it safe for daily pet use.",
      },
    ],
    afterSaleReply: [
      "Thank you for choosing SoloH2O! We're happy to help with any questions. Here are some quick tips: (1) Before first use, rinse the bottle and bowl with warm water. (2) Press the button gently — no need to squeeze hard. (3) After each walk, empty any remaining water to keep the bottle fresh. If you need a replacement filter or have any issues, simply reply to this message and we'll take care of it within 24 hours.",
      "We're sorry to hear about your experience. At SoloH2O, we stand behind our products quality. Please contact us with your order ID and a brief description — we'll send you a free replacement or a full refund, your choice. Your satisfaction is our top priority.",
      "Thank you for your feedback! We appreciate you taking the time to share your thoughts. Your suggestions help us improve our products. As a token of our appreciation, we'd like to offer you 15% off your next purchase — just use the code THANKYOU15 at checkout.",
    ],
    negativeReviewTemplates: [
      {
        scenario: "漏水问题",
        reply:
          "Dear [Customer], we sincerely apologize for the leaking issue you experienced. This is not the quality we promise. Please check if the silicone seal is properly seated and the lock is fully engaged — if the problem persists, we'd love to send you a free replacement. Please reply with your order ID and we'll take care of it immediately. Thank you for giving us a chance to make it right.",
      },
      {
        scenario: "出水按钮太硬",
        reply:
          "Thank you for your feedback, [Customer]. We hear you — the button pressure was one of the top improvement areas we worked on. Our latest batch features a redesigned spring mechanism that requires significantly less force. We'd be happy to send you the updated version at no cost. Please share your order ID and we'll get it shipped within 24 hours. Your comfort matters to us!",
      },
      {
        scenario: "塑料异味",
        reply:
          "Dear [Customer], we're sorry to hear about the plastic smell. Unlike standard plastic bottles, ours is made from Tritan, which should not have any odor. However, if you received a unit with an unusual smell, it may have been affected during storage. We'd like to replace it immediately — please provide your order ID and we'll ship a brand-new bottle from our latest stock. Thank you for your patience and understanding.",
      },
    ],
  },

  operationPlan: {
    todayTasks: [
      "完成 Listing 上架：上传标题、五点描述、详情页和 SEO 关键词到 Amazon Seller Central",
      "设置产品图片：主图纯白底 + 场景图 3 张 + 尺寸对比图 1 张 + 材质特写图 1 张",
      "启动自动广告：日预算 $30，竞价策略选择「动态竞价 - 仅降低」",
      "准备 5 条 QA：围绕防漏、材质安全、清洗方式、适用犬种进行自问自答",
      "注册 Vine 计划：邀请 Vine Voice 评论者获取首批评论",
    ],
    tomorrowPlan: [
      "检查广告数据：分析第一天曝光量、点击率、花费，调整无效关键词",
      "优化 Search Term：根据自动广告搜索词报告，提取高转化长尾词加入手动广告",
      "监控竞品动态：对比头部竞品价格变化和评论增长，调整定价策略",
      "准备 Coupon 优惠券：设置 5%-10% 折扣券，提升前期转化率",
      "回复客户消息：确保 24 小时内回复所有买家咨询，维护账户健康度",
    ],
    riskAlerts: [
      "新品期前 2 周是关键窗口，需密切关注广告 ACOS 和转化率，ACOS 超过 30% 需立即优化",
      "宠物用品类目差评影响较大，建议每天检查评论通知，差评需在 24 小时内回复",
      "首批备货 200 件，按日均 3-5 单计算，库存可支撑 40-60 天，需在第 3 周评估补货计划",
      "注意 Amazon 宠物用品类目合规要求，确保产品已通过必要安全认证，避免 Listing 被下架",
      "秋冬季节销量可能下滑 30%-40%，建议在旺季（Q2-Q3）积累评论和排名，为淡季做准备",
    ],
  },
};

export default mockAnalysis;
