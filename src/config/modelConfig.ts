import { EventIP, BudgetPackage, NextStepAction } from "../types";

export interface WeightConfig {
  opportunityWeights: {
    categoryMomentum: number; // 品类势能 0.20
    brandMomentum: number;    // 品牌动能 0.20
    audienceGrowth: number;   // 人群增量 0.20
    assetActivation: number;  // 资产可激活性 0.20
    businessFeasibility: number; // 商业可推进性 0.10
    riskAndMeasurability: number; // 风险与可测量性 0.10
  };
  fitWeights: {
    audienceMatch: number;    // 核心人群契合 0.20
    positioningSpirit: number;// 品牌定位与IP精神契合 0.15
    assetActivation: number;  // 品牌独有资产可激活性 0.15
    trendMomentum: number;    // 行业趋势与节点势能 0.15
    ugcPotential: number;     // 内容延展与UGC潜力 0.15
    prAmplification: number;  // 站内外传播放大潜力 0.10
    dataMeasurability: number;// 数据可测量与复盘条件 0.10
  };
}

export const DEFAULT_WEIGHT_CONFIG: WeightConfig = {
  opportunityWeights: {
    categoryMomentum: 0.20,
    brandMomentum: 0.20,
    audienceGrowth: 0.20,
    assetActivation: 0.20,
    businessFeasibility: 0.10,
    riskAndMeasurability: 0.10,
  },
  fitWeights: {
    audienceMatch: 0.20,
    positioningSpirit: 0.15,
    assetActivation: 0.15,
    trendMomentum: 0.15,
    ugcPotential: 0.15,
    prAmplification: 0.10,
    dataMeasurability: 0.10,
  },
};

export const DEFAULT_IPS: EventIP[] = [
  {
    id: "ip_ye_ren_jie",
    name: "夜人节",
    tagline: "越夜越有光，青年夜间生活灵感聚场",
    spirit: "探索城市夜间生命力、打破日间约束、灵感与情绪社交、先锋时尚与露营音乐",
    targetAudience: "Z世代、城市夜行者、潮流青年、品质生活家",
    audienceSize: "9,200万+ 辐射全网夜间兴趣人群",
    scenarios: ["夜间美妆", "夜游/夜跑装备", "微醺酒饮与夜宵", "夜间护肤修护", "车载声效与户外"],
    cooperationWindow: "Q2-Q3 (夏季暑期 & 跨年季)",
    keyAssets: ["城市地标夜游大事件", "夜行灵感市集", "LED光影互动巨幕", "小红书深夜直播间"],
    pastHighlights: "累计曝光 28 亿+，话题讨论 450 万+，带动参与品牌夜间搜索增长 180%",
    fitWeights: {
      "美妆个护": 92,
      "服饰鞋包": 88,
      "日化家清": 72,
      "医疗医美": 65,
    },
  },
  {
    id: "ip_xiao_mei_shuo",
    name: "小美说",
    tagline: "美得有理有据，专业成分与品质生活对话",
    spirit: "硬核成分拆解、真实素人评测、品质审美沉淀、美妆趋势风向标",
    targetAudience: "成分党、精致护肤人群、高消费女性、医美美妆重度用户",
    audienceSize: "6,800万+ 精准美妆/美学高意向人群",
    scenarios: ["成分科学科普", "新品试用首发", "抗老/修护专项深度种草", "医美术后护理"],
    cooperationWindow: "全年常态 + Q2/Q4 大促前夕",
    keyAssets: ["小美实验室", "成分党大咖闭门会", "科学辟谣与白皮书首发", "体验官招募箱"],
    pastHighlights: "专业成分笔记互动率高出行业平均 2.4 倍，助力 12 款新品登顶搜索榜首",
    fitWeights: {
      "美妆个护": 98,
      "医疗医美": 90,
      "日化家清": 75,
      "服饰鞋包": 60,
    },
  },
  {
    id: "ip_red_gala",
    name: "REDGALA",
    tagline: "时尚与创意的巅峰舞台，品牌的年度红毯时刻",
    spirit: "顶尖美学风尚、高光品牌时刻、明星与博主盛典、红毯社交与奢品感",
    targetAudience: "时尚先锋、奢品买家、品牌高净值人群、品质生活追随者",
    audienceSize: "1.2亿+ 全网时尚舆论风向标",
    scenarios: ["年度高光品牌发布", "限量联名首发", "红毯明星妆容与造型", "品牌精神主张沉淀"],
    cooperationWindow: "Q4 (11-12月时尚盛典季)",
    keyAssets: ["红毯高光走秀", "年度颁奖盛典", "VIP闭门晚宴", "主会场巨幅超级入口"],
    pastHighlights: "微博/小红书热搜双榜 TOP3，跨平台曝光超过 40 亿，品牌社交声量爆发 320%",
    fitWeights: {
      "服饰鞋包": 96,
      "美妆个护": 94,
      "医疗医美": 82,
      "日化家清": 68,
    },
  },
  {
    id: "ip_man_ren_jie",
    name: "慢人节",
    tagline: "松弛有度，在自然与生活里找回自己的节奏",
    spirit: "情绪疗愈、松弛感生活方式、户外轻生活、可持续美学、心智解压",
    targetAudience: "新中产、户外爱好者、情绪疗愈需求人群、品质家庭",
    audienceSize: "7,500万+ 追求松弛感与生活质量用户",
    scenarios: ["户外露营与徒步", "家居香氛与疗愈", "无感知舒适服饰", "绿色环保洁净体验"],
    cooperationWindow: "Q2/Q3 (春秋季户外与假期)",
    keyAssets: ["慢生活松弛营地", "疗愈音乐会", "无痕自然工坊", "松弛感生活指南册"],
    pastHighlights: "带动“松弛感”相关笔记搜索同比增长 240%，品牌情绪价值满意度达到 96%",
    fitWeights: {
      "日化家清": 94,
      "服饰鞋包": 90,
      "美妆个护": 82,
      "医疗医美": 70,
    },
  },
];

export const DEFAULT_BUDGET_PACKAGES: BudgetPackage[] = [
  {
    id: "150w",
    title: "基础型 (150万) - 场景深度参与",
    priceText: "￥1,500,000",
    numericPrice: 1500000,
    targetGoal: "实现品牌大事件场景露出、基础声量引爆与核心受众初次触达",
    cooperationDepth: "场景参与",
    coreRights: [
      { name: "大事件主会场品牌 Logo 联合露出", category: "IP授权/主会场", amount: "标准位 1 套", note: "大事件专题页+地标展板", included: true },
      { name: "小红书官方号主题联合笔记发布", category: "IP授权/主会场", amount: "2 篇", note: "官方号背书", included: true },
      { name: "头部博主 (KOL) 体验合作", category: "内容与达人", amount: "3 人", note: "百万级粉丝头部博主", included: true },
      { name: "腰部博主 (KOC) 场景种草", category: "内容与达人", amount: "15 人", note: "垂直品类优质达人", included: true },
      { name: "站内火焰卡/搜索彩蛋流量承接", category: "站内流量与搜索", amount: "200 万次曝光", note: "搜索特定词触发", included: true },
      { name: "线下体验区品牌品牌微型展位", category: "线下/事件触点", amount: "9 ㎡ 开放卡位", note: "现场互动抽奖", included: true },
      { name: "基础数据结案与规模指标复盘", category: "复盘与监测", amount: "1 份", note: "包含曝光/阅读/搜索", included: true },
    ],
    budgetDistribution: [
      { name: "IP授权与官方资源", value: 30, fill: "#1E293B" },
      { name: "达人内容矩阵 (KOL/KOC)", value: 40, fill: "#E11D48" },
      { name: "站内精准硬广/搜索承接", value: 20, fill: "#0284C7" },
      { name: "线下体验与执行", value: 10, fill: "#D97706" },
    ],
    expectedMetrics: {
      impressions: "3,500万 - 5,000万",
      engagement: "120万 - 180万",
      searchIncrement: "+45% - +75%",
      notesVolume: "1,200+ 篇",
    },
    disclaimer: "演示预算结构与权益分配，实际合作金额与刊例权益请以小红书商业化团队最终确认为准。",
  },
  {
    id: "200w",
    title: "推荐型 (200万) - 品牌 × IP 联合共创",
    priceText: "￥2,000,000",
    numericPrice: 2000000,
    targetGoal: "深度融入 IP 核心机制，激活品牌独有资产，打造高互动与高搜索转化爆款",
    cooperationDepth: "联合共创",
    coreRights: [
      { name: "IP 独家联合定制身份 (如：夜人节独家夜修官)", category: "IP授权/主会场", amount: "联合主办身份", note: "主会场顶级视窗", included: true },
      { name: "IP 联合定制话题 + 独家 UGC 抽奖机制", category: "IP授权/主会场", amount: "1 个专属话题", note: "站内带#话题发帖", included: true },
      { name: "超头部/明星博主定制长图文/视频", category: "内容与达人", amount: "2 人", note: "千万级爆款缔造者", included: true },
      { name: "头部 KOL 深度定制 + 腰部 KOC 组团", category: "内容与达人", amount: "30 人", note: "多场景覆盖", included: true },
      { name: "薯条/品专/搜索拦截等精准流量池", category: "站内流量与搜索", amount: "450 万次曝光", note: "搜索联动拦截", included: true },
      { name: "线下独立品牌体验工坊/主题狂欢夜", category: "线下/事件触点", amount: "36 ㎡ 主题展馆", note: "现场互动排队体验", included: true },
      { name: "AURA 极光指标 + 人群渗透全链路复盘", category: "复盘与监测", amount: "1 份深度报告", note: "同源人群投前后对比", included: true },
    ],
    budgetDistribution: [
      { name: "IP授权与主会场顶规", value: 35, fill: "#1E293B" },
      { name: "达人共创矩阵", value: 35, fill: "#E11D48" },
      { name: "搜索拦截与流量承接", value: 20, fill: "#0284C7" },
      { name: "线下体验工坊", value: 10, fill: "#D97706" },
    ],
    expectedMetrics: {
      impressions: "6,500万 - 9,000万",
      engagement: "280万 - 400万",
      searchIncrement: "+80% - +130%",
      notesVolume: "3,500+ 篇",
    },
    disclaimer: "演示预算结构与权益分配，实际合作金额与刊例权益请以小红书商业化团队最终确认为准。",
  },
  {
    id: "250w",
    title: "旗舰型 (250万) - 全域战略共建",
    priceText: "￥2,500,000",
    numericPrice: 2500000,
    targetGoal: "全方位占领品类心智，沉淀品牌长线资产，实现站内外爆破与长期续约复用",
    cooperationDepth: "战略共建",
    coreRights: [
      { name: "大事件冠名/首席战略合作伙伴身份", category: "IP授权/主会场", amount: "独占首席位", note: "全域宣发联合署名", included: true },
      { name: "专属品牌大屏霸屏 + 开屏/焦点图联播", category: "IP授权/主会场", amount: "3 天开屏轮播", note: "全站顶级触达", included: true },
      { name: "明星代言人现场空降 + 直播间联动", category: "内容与达人", amount: "1 场明星专场", note: "现场+在线百万在线", included: true },
      { name: "矩阵式 KOL/KOC 种草（全阶梯覆盖）", category: "内容与达人", amount: "60+ 人", note: "形成刷屏效应", included: true },
      { name: "全维搜索品专 + 深度搜索拦截", category: "站内流量与搜索", amount: "800 万次曝光", note: "品类词全面拦截", included: true },
      { name: "线下 VIP 闭门晚宴 + 专属艺术装置", category: "线下/事件触点", amount: "独家 80 ㎡ 艺术展", note: "央媒/时尚媒体报道", included: true },
      { name: "定制同源归因建模 + 下轮招商优先锁定权", category: "复盘与监测", amount: "全套归因模型", note: "跨周期沉淀品牌资产", included: true },
    ],
    budgetDistribution: [
      { name: "首席冠名与全站顶级开屏", value: 40, fill: "#1E293B" },
      { name: "明星与顶级 KOL 组合", value: 30, fill: "#E11D48" },
      { name: "全维搜索与品专包揽", value: 18, fill: "#0284C7" },
      { name: "线下VIP巨型展区与公关", value: 12, fill: "#D97706" },
    ],
    expectedMetrics: {
      impressions: "1.2亿 - 1.8亿",
      engagement: "550万 - 800万",
      searchIncrement: "+150% - +260%",
      notesVolume: "8,000+ 篇",
    },
    disclaimer: "演示预算结构与权益分配，实际合作金额与刊例权益请以小红书商业化团队最终确认为准。",
  },
];

export const DEFAULT_NEXT_ACTIONS: NextStepAction[] = [
  {
    targetUser: "CBD",
    title: "挖掘客户核心痛点，抛出【大事件独家切入点】",
    timeframe: "48小时内",
    description: "基于品牌的独有资产与小红书搜索供需缺口，向客户 CMO/VP 提炼 1 页核心提纲，强调大事件的稀缺场地与流量扶持。",
    keyConfirmQuestions: [
      "品牌在 Q3 的核心新品发布节点与预算安排是否已锁定？",
      "客户对于‘线上声量’与‘线下体验’的权重分配偏好是什么？",
      "竞品近期在站内的动作是否触发了客户的焦虑点？",
      "决策链中是否有法务/合规审核的特殊禁忌？",
      "客户是否有现成的明星代言人或线下空间资产可带入 IP？",
    ],
    recommendedMaterials: ["《大事件 IP 招商一页纸推介》", "《同行业标杆品牌共创案例复盘》"],
    riskNotice: "切勿夸大官方包销效果，明确提示所有预算均为演示方案结构。",
  },
  {
    targetUser: "CBD",
    title: "锁定预算区间与合作深度，发起联合初审",
    timeframe: "1周内",
    description: "组织与客户决策团队的 30 分钟 Pitch 会议，演示预算权益对比表与 3 个差异化创意方向，促成意向 MOU。",
    keyConfirmQuestions: [
      "客户偏好的预算档位（150w/200w/250w）及内部审批流程？",
      "是否需要针对特定新品调整权益配比？",
    ],
    recommendedMaterials: ["《SPARK 方案工作台完整版》", "《预算权益分配对比表》"],
  },
  {
    targetUser: "营销策划",
    title: "深化共创创意母题，产出落地脚本与达人 Brief",
    timeframe: "1周内",
    description: "将确定的 Big Idea 拆解为 3-5 个内容支柱，制定达人角色分工表与站内#话题互动规则，发起平台合规预审。",
    keyConfirmQuestions: [
      "品牌提供的产品成分/技术白皮书是否具备完整资质证明？",
      "线下体验展区的搭建尺寸与安保要求是否满足大事件场地限制？",
    ],
    recommendedMaterials: ["《达人种草 Brief 模板》", "《小红书站内话题合规自查清单》"],
  },
  {
    targetUser: "营销策划",
    title: "建立投前数据基线与埋点监测口径",
    timeframe: "下一会议前",
    description: "与数据运营团队对齐品牌词、品类词、场景词在投前的 baseline，锁定 AURA 指标采集频次与归因模型。",
    keyConfirmQuestions: [
      "客户是否同意接入灵犀平台同源数据监测？",
      "品牌官方账号与店铺数据授权的对接人是谁？",
    ],
    recommendedMaterials: ["《AURA 极光指标监测方案》", "《投前基线数据确认单》"],
  },
];
