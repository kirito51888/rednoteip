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
    id: "ip_red_gala",
    name: "REDGALA",
    en: "RED GALA",
    color: "#B8202F",
    categoryType: "社会营销",
    oneLineGoal: "不止于盛典，做一场调度全民情绪的社会营销大事件",
    coreActions: [
      {
        title: "价值叙事升级",
        detail: "做大规模用户情绪共鸣，从做盛典延伸至做社会情绪大事件",
      },
      {
        title: "生态宣发升级",
        detail: "从明星互动升级为好作品宣发与用户二创生态场，赋能视频3.0",
      },
      {
        title: "C端体验与合作",
        detail: "开放游园会区块，支持品牌深度绑定代言人与影视综共创",
      },
    ],
    tagline: "不止于盛典，做一场真的调度全民情绪的社会营销大事件",
    oneline: "不止于盛典，做一场真的调度全民情绪的社会营销大事件。",
    spirit: "顶尖美学风尚、高光品牌时刻、明星与博主盛典、红毯社交与奢品感、全民情绪共鸣",
    targetAudience: "时尚先锋、奢品买家、品牌高净值人群、品质生活追随者、全网C端大众",
    audienceSize: "4.5亿曝光级",
    scenarios: ["节庆", "社交聚会", "约会", "旅行", "影视综宣发"],
    cooperationWindow: "年度大事件（3月-4月）",
    windowMonths: [3, 4],
    keyAssets: ["盛典冠名 / 联合呈现", "红毯造型指定合作", "游园会开放区块", "影视综衍生共创", "视频3.0二创生态"],
    pastHighlights: "跨平台曝光超过 45 亿，250+ 全网热搜，100+ 明星嘉宾，直播观看人数 500w+",
    fitWeights: {
      "服饰鞋包": 95,
      "汽车出行": 92,
      "美妆个护": 90,
      "医疗医美": 58,
      "日化家清": 46,
    },
    ta: ["高线女性", "新中产", "一线白领", "Z世代"],
    tone: ["高级", "热烈", "精致", "先锋"],
    scene: ["节庆", "社交聚会", "约会", "旅行"],
    gene: ["社会情绪", "红毯造型", "好作品宣发", "二创生态", "全民共建", "高光时刻"],
    slots: ["盛典冠名 / 联合呈现", "红毯造型指定合作", "开放游园会互动", "影视综作品赞助", "视频3.0二创包"],
    reachDemo: "4.5亿曝光级",
    history: ["高端美妆", "奢侈品配饰", "时装品牌", "高端汽车", "影视综作品"],
    fit: { 汽车出行: 92, 美妆个护: 90, 医疗医美: 58, 日化家清: 46, 服饰鞋包: 95 },
  },
  {
    id: "ip_ye_ren_jie",
    name: "夜人节",
    en: "NIGHT PEOPLE FEST",
    color: "#3B4A9E",
    categoryType: "情绪营销",
    oneLineGoal: "用户的夜晚灵感索引第一阵地，品牌夜晚场景营销首选",
    coreActions: [
      {
        title: "建构夜生活优质资源库",
        detail: "联合夜生活 partner 供给内容，助力品牌定制线下玩法与大预算落地",
      },
      {
        title: "沉淀长线心智栏目",
        detail: "打造一千零一夜电台与社区科技薯联动，长线培养私域活跃度",
      },
      {
        title: "提前摸排锁定高点",
        detail: "与社区业务提前协同 share 成本与目标，做深做透夜间场域",
      },
    ],
    tagline: "用户的夜晚灵感索引第一阵地，品牌夜晚场景营销首选",
    oneline: "用户的夜晚灵感索引第一阵地，品牌夜晚场景营销首选。",
    spirit: "探索城市夜间生命力、打破日间约束、灵感与情绪社交、先锋时尚与夜人码头派对",
    targetAudience: "Z世代、城市夜行者、潮流青年、品质生活家、夜生活爱好者",
    audienceSize: "2.8亿曝光级",
    scenarios: ["夜间美妆", "夜游/夜跑装备", "微醺酒饮与夜宵", "夜间护肤修护", "四城四店夜生活地标"],
    cooperationWindow: "长线活动 1月-9月，线下活动高点 8月",
    windowMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    keyAssets: ["夜人节 H5 柔焦红主阵地", "四城四店夜生活联盟地图", "一千零一夜电台", "线下夜人码头", "漂流瓶互动派样"],
    pastHighlights: "全网曝光 75.9 亿+，站内外热榜 18 个，UGC 笔记 123 万+，线下流量 4.5万+ 人，人均停留 181 分钟",
    fitWeights: {
      "汽车出行": 80,
      "美妆个护": 94,
      "服饰鞋包": 70,
      "日化家清": 74,
      "医疗医美": 61,
    },
    ta: ["Z世代", "一线白领", "职场新人", "小城青年"],
    tone: ["松弛", "热烈", "幽默", "野性"],
    scene: ["夜间", "独处自愈", "社交聚会", "睡前"],
    gene: ["夜晚灵感", "一千零一夜电台", "夜生活联盟", "夜人码头", "漂流瓶派样", "夜游地图"],
    slots: ["主阵地换肤 + 品牌话题页", "夜生活联盟线下城市路线", "线上漂流瓶派样", "独占彩妆教室/体验专场", "一千零一夜栏目植入"],
    reachDemo: "2.8亿曝光级",
    history: ["Dior 迪奥彩妆", "饮品 / 酒饮类", "便利食品", "助眠家清", "夜间护理"],
    fit: { 汽车出行: 80, 美妆个护: 94, 医疗医美: 61, 日化家清: 74, 服饰鞋包: 70 },
  },
  {
    id: "ip_xiao_mei_shuo",
    name: "小美说",
    en: "BEAUTY TALKS",
    color: "#C2185B",
    categoryType: "场景营销",
    oneLineGoal: "让小美说成为小红书首个可商业化的影响力杂志厂牌，在小美说，每个人都可以是自己生活的主编",
    coreActions: [
      {
        title: "成立小美编辑部，构建多元共创内容体系",
        detail: "整合多圈层人群专业内容力与用户共创力，强化 IP 内容价值与可看性",
      },
      {
        title: "小美刊物拓展，每季度推出两本主题刊物",
        detail: "打破单一小城探索边界，延伸至生活美学领域",
      },
      {
        title: "四季小美大赏",
        detail: "每季度落地一场主题化“小美大赏”活动，邀约明星与用户共同赏当季小美",
      },
    ],
    tagline: "小红书首个可商业化的影响力杂志厂牌，每个人都可以是自己生活的主编",
    oneline: "小红书首个可商业化的影响力杂志厂牌，每个人都可以是自己生活的主编。",
    spirit: "小美编辑部杂志厂牌、生活美学主题刊物、四季小美大赏、每个人都是生活的主编",
    targetAudience: "都市精英白领、有消费力重审美的智雅人群、品质车主与生活主理人",
    audienceSize: "1.6亿曝光级",
    scenarios: ["城市生活美学", "自驾出游", "四季小美大赏", "精致日常"],
    cooperationWindow: "全年均有，按季节划分 (1月-12月)",
    windowMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    keyAssets: ["小美编辑部主题特刊", "四季小美大赏盛典", "小美社区小程序", "明星与用户共创大片"],
    pastHighlights: "联动 57 个品牌，招商金额 1.4 亿，毛利率 70%，私域用户 35w+，涵盖全行业品牌合作",
    fitWeights: {
      "汽车出行": 98,
      "美妆个护": 94,
      "医疗医美": 86,
      "日化家清": 52,
      "服饰鞋包": 44,
    },
    ta: ["高线精英", "汽车车主", "品质生活家", "一线白领"],
    tone: ["质感", "高级", "深度", "优雅"],
    scene: ["城市生活", "美学探索", "四季大赏", "精致日常"],
    gene: ["小美编辑部", "主题特刊", "四季大赏", "生活美学", "商业化杂志", "生活主编"],
    slots: ["主题特刊封面/内页植入", "四季小美大赏独家冠名", "小美小程序派样与社区专栏", "明星与生活主理人共创"],
    reachDemo: "1.6亿曝光级",
    history: ["豪华汽车/新能源", "高端美妆", "奢品珠宝", "高端手袋"],
    fit: { 汽车出行: 98, 美妆个护: 94, 医疗医美: 86, 日化家清: 52, 服饰鞋包: 44 },
  },
  {
    id: "ip_man_ren_jie",
    name: "慢人节",
    en: "SLOW LIVING FEST",
    color: "#1F5C56",
    categoryType: "情绪营销",
    oneLineGoal: "involve 国内更顶的艺术、音乐、市集资源，将慢慢来样样好做到极致",
    coreActions: [
      {
        title: "维持慢生活艺术心智",
        detail: "继续合作候鸟300或联动顶级艺术表演团队，拔高艺术气质与品牌调性",
      },
      {
        title: "打造全新形态音乐节",
        detail: "缩减成本，打造小红书慢摇滚乐队，从音乐象限做更长周期传播",
      },
      {
        title: "挖掘慢生活趋势引领",
        detail: "带动更多用户心智提升与品牌营销合作的新视角",
      },
    ],
    tagline: "以生活即艺术、慢速即表达为内核，重新构建现代人的精神栖居地",
    oneline: "involve 国内更顶的艺术、音乐、市集资源，将慢慢来样样好做到极致。",
    spirit: "慢生活艺术心智、候鸟300艺术共建、慢摇滚音乐节、慢慢来样样好",
    targetAudience: "新中产、城市漫游者、艺术爱好者、慢生活追求者、Z世代",
    audienceSize: "120亿+曝光级",
    scenarios: ["户外市集", "艺术展演", "音乐节", "慢生活体验", "度假疗愈"],
    cooperationWindow: "年度大事件（5月-6月）",
    windowMonths: [5, 6],
    keyAssets: ["慢人部落", "候鸟300艺术共建", "慢人市集/花房/疗愈舱", "慢摇滚音乐节"],
    pastHighlights: "全网曝光 120亿+，话题页浏览 17亿+，累计笔记 30w+，站内外热搜 25+",
    fitWeights: {
      "日化家清": 92,
      "服饰鞋包": 90,
      "汽车出行": 85,
      "美妆个护": 82,
      "医疗医美": 70,
    },
    ta: ["新中产", "一线白领", "艺术青年", "Z世代"],
    tone: ["治愈", "松弛", "艺术", "自然"],
    scene: ["居家", "户外", "音乐节", "度假"],
    gene: ["候鸟300", "慢人部落", "慢摇滚乐队", "慢人市集", "慢人疗愈", "慢慢来"],
    slots: ["慢人部落主阵地", "候鸟300艺术装置冠名", "慢摇滚音乐节赞助", "慢人市集品牌互动体验舱"],
    reachDemo: "120亿+曝光级",
    history: ["家清家护", "户外服饰", "美妆护肤", "新能源汽车", "家居香氛"],
    fit: { 汽车出行: 85, 美妆个护: 82, 医疗医美: 70, 日化家清: 92, 服饰鞋包: 90 },
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
