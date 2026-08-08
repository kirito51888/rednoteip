export type IndustryType = "汽车出行" | "美妆个护" | "医疗医美" | "日化家清" | "服饰鞋包";

export interface DataProvenance {
  source: string; // e.g. "灵犀平台 API", "内部导盘", "公开研报", "演示模拟数据"
  scope: string; // e.g. "小红书站内 2026Q1-Q2"
  timeRange: string; // e.g. "2026.01.01 - 2026.06.30"
  updatedAt: string; // e.g. "2026-08-01"
  sampleSize?: string; // e.g. "N=1,250,000 笔记/搜索"
  isEstimated: boolean;
  confidence: "High" | "Medium" | "Low";
}

export interface DimensionBreakdown {
  key: string;
  name: string;
  weight: number; // e.g. 0.20
  score: number; // 0-100
  rawData: string;
  reason: string;
  deductionReason?: string;
  dataSource: string;
}

export interface BrandOpportunityScore {
  totalScore: number;
  confidence: "High" | "Medium" | "Low";
  verdict: string;
  dimensions: DimensionBreakdown[];
  bonusPoints: string[];
  deductions: string[];
  verificationQuestions: string[];
}

export interface RiskGate {
  category: "品牌安全/舆情" | "广告/内容合规" | "IP精神冲突" | "预算与资源匹配" | "数据不足" | "排他与竞品冲突";
  passed: boolean;
  severity: "High" | "Medium" | "Low" | "None";
  details: string;
  mitigation: string;
}

export interface BrandIPFitScore {
  ipId: string;
  ipName: string;
  totalScore: number;
  confidence: "High" | "Medium" | "Low";
  recommendation: "建议合作" | "条件合作" | "暂不建议合作";
  recommendationReason: string;
  recommendedDepth: "场景参与" | "联合共创" | "战略共建";
  dimensions: DimensionBreakdown[];
  riskGates: RiskGate[];
  comparisonHighlights: string[];
}

export interface UniqueAsset {
  id: string;
  type: "产品技术" | "明星单品" | "品牌符号" | "代言人" | "线下空间" | "会员资产" | "地域/文化资产";
  title: string;
  description: string;
  activatableInIP: boolean;
  activationIdea: string;
}

export interface SearchLandscapeItem {
  kw: string;
  idx: number; // 搜索指数
  own: number; // 自有内容占比 %
  note: string; // 判读
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  industry: IndustryType;
  subcategory: string;
  positioning: string;
  targetDemographics: string[];
  coreProducts: string[];
  uniqueAssets: UniqueAsset[];
  redSearchIndex: number; // e.g. 850000
  redContentVolume: number; // e.g. 42000
  searchSupplyDemandGap: "极大供不应求" | "中等缺口" | "供给过剩";
  competitorBrands: string[];
  opportunityScore: BrandOpportunityScore;
  recommendedIPs: string[];
  provenance: DataProvenance;

  // Enriched fields from HTML Engine
  logoTone?: string;
  fictional?: boolean;
  ownAsset?: string;
  outsideIntel?: string;
  hotspots?: string[];
  pits?: string[];
  searchLandscape?: SearchLandscapeItem[];
  userInsight?: string[];
  launchMonths?: number[];
  whiteSpace?: Record<string, number>; // IP ID -> score
  opportunity?: string;
}

export interface CoreActionItem {
  title: string;
  detail: string;
}

export interface EventIP {
  id: string;
  name: string;
  en?: string;
  color?: string;
  categoryType?: string; // e.g. "社会营销" | "情绪营销" | "场景营销"
  oneLineGoal?: string;  // 一句话目标
  coreActions?: CoreActionItem[]; // 核心动作
  tagline: string;
  oneline?: string;
  spirit: string; // 精神内核
  targetAudience: string; // 核心人群
  audienceSize: string; // e.g. "8,500万+ 月度覆盖"
  scenarios: string[]; // 适配场景
  cooperationWindow: string; // e.g. "Q3 (8-9月)"
  windowMonths?: number[];
  heroPosterUrl?: string;
  keyAssets: string[]; // 核心线下/线上资产
  pastHighlights: string; // 历史亮点/口碑
  fitWeights: Record<string, number>;

  // Enriched fields from HTML Engine
  ta?: string[];
  tone?: string[];
  scene?: string[];
  gene?: string[];
  slots?: string[];
  reachDemo?: string;
  history?: string[];
  fit?: Record<string, number>; // Industry -> Fit Score (0-100)
}

export interface FactorWeights {
  ta: number;
  tone: number;
  scene: number;
  timing: number;
  white: number;
  budget: number;
  compliance?: number;
}

export interface CreativeRoute {
  id: string;
  theme: string; // 创意母题
  bigIdea: string; // 一句话 Big Idea
  assetIntegration: string; // 品牌资产如何进入 IP
  userParticipationReason: string; // 用户为什么愿意参与
  redTopicName: string; // 小红书站内话题
  redTopicCopy: string; // 话题文案
  contentPillars: string[]; // 3-5个内容支柱
  ugcMechanism: string; // UGC互动机制
  touchpoints: string[]; // 主会场/线下/直播触点
  roleDivision: string; // 达人/用户/品牌号/IP号角色分工
  externalExtension: string; // 站外延展
  depthLevel: "场景参与" | "联合共创" | "战略共建";
  executionRisks: string;
  targetMetrics: string;
  isLocked?: boolean;
}

export interface BudgetRightItem {
  name: string;
  category: "IP授权/主会场" | "内容与达人" | "站内流量与搜索" | "线下/事件触点" | "复盘与监测";
  amount: string;
  note: string;
  included: boolean;
}

export interface BudgetPackage {
  id: "150w" | "200w" | "250w";
  title: string;
  priceText: string;
  numericPrice: number;
  targetGoal: string;
  cooperationDepth: "场景参与" | "联合共创" | "战略共建";
  coreRights: BudgetRightItem[];
  budgetDistribution: {
    name: string;
    value: number; // percentage or tens of thousands
    fill: string;
  }[];
  expectedMetrics: {
    impressions: string;
    engagement: string;
    searchIncrement: string;
    notesVolume: string;
  };
  disclaimer: string;
}

export interface NextStepAction {
  targetUser: "CBD" | "营销策划";
  title: string;
  timeframe: "48小时内" | "1周内" | "下一会议前";
  description: string;
  keyConfirmQuestions?: string[];
  recommendedMaterials?: string[];
  riskNotice?: string;
}

export interface PhaseRhythm {
  phase: "预热期" | "爆发期" | "长尾期";
  dateRange: string;
  goal: string;
  keyActions: string[];
  contentSupply: string;
  metricsGoal: string;
  actualPerformance: string;
  conclusion: string;
}

export interface ScaleMetricItem {
  label: string;
  target: number;
  actual: number;
  unit: string;
  achievementRate: number; // e.g. 112%
  baseline: number;
  yoYGrowth: string;
  dataOrigin: string;
}

export interface AuraDimension {
  key: "Awareness" | "UserResonance" | "Relevance" | "Action";
  name: string;
  titleCN: string;
  score: number;
  weight: number;
  evidence: string;
  metricsIncluded: string[];
}

export interface WordCloudItem {
  text: string;
  value: number;
  category: "高频词" | "增量词" | "品牌关联" | "产品功效" | "情绪价值" | "争议负面";
  period: "投前" | "投后";
  tag?: "new" | "grow" | "gone";
}

export interface TimeseriesPoint {
  date: string;
  searchIndex: number;
  readingIndex: number;
  eventMilestone?: string;
}

export interface ContentTier {
  tierName: "官方矩阵" | "头部/腰部达人" | "KOC/UGC自发";
  volume: number;
  engagement: number;
  highEngageRate: number;
  highSearchConversion: number;
  verdict: "规模贡献" | "高互动引领" | "长尾声量" | "偏题偏低";
  keyNotes: string[];
}

export interface AttributionStep {
  step: number;
  name: string; // e.g. "事件触达" -> "内容互动" -> "站内搜索" -> "深度阅读/收藏" -> "品牌行动"
  conversionRate: string;
  volume: number;
  method: "直接观测" | "规则归因" | "统计推断" | "业务假设";
  notes: string;
}

export interface ReviewReport {
  id: string;
  projectId: string;
  projectName: string;
  brandName: string;
  ipName: string;
  campaignPeriod: string;
  verifiedAt: string;
  dataConfidence: "High" | "Medium" | "Low";
  overallSummary: string;
  phases: PhaseRhythm[];
  scaleMetrics: ScaleMetricItem[];
  auraScore: {
    total: number;
    dimensions: AuraDimension[];
  };
  audiencePenetration: {
    segmentName: string;
    beforeRate: number;
    afterRate: number;
    lift: string;
  }[];
  wordsBeforeAfter: WordCloudItem[];
  trendTimeseries: TimeseriesPoint[];
  contentTiers: ContentTier[];
  attributionPath: AttributionStep[];
  nextRoundRecommendations: {
    continueDo: string[];
    stopDo: string[];
    scaleUp: string[];
    validateNext: string[];
    recommendedNextIP: string;
    recommendedBudget: string;
  };
  dataQualityChecks: {
    checkItem: string;
    passed: boolean;
    issueDescription?: string;
    remedy?: string;
  }[];
  provenance: DataProvenance;
}

export interface CaseStudy {
  id: string;
  title: string;
  brandName: string;
  industry: IndustryType;
  ipName: string;
  budgetTier: string;
  cooperationDepth: string;
  background: string;
  insight: string;
  strategy: string;
  creativeBigIdea: string;
  resourceMix: string;
  executionHighlights: string[];
  results: Record<string, string>;
  wins: string[];
  failures: string[];
  reusableTags: string[];
  nextAdvice: string;
  isDemo: boolean;
  coverImage?: string;
}

export interface FactorWeights {
  ta: number;
  tone: number;
  scene: number;
  timing: number;
  white: number;
  budget: number;
  compliance?: number;
}

export interface IndustryData {
  industry: IndustryType;
  subcategories: string[];
  heatIndex: number; // 0-100
  heatTrend: string; // e.g. "+18.4% YoY"
  searchVolume: string; // e.g. "4.2亿/月"
  supplyDemandGap: "极度匮乏 (供不应求)" | "平衡" | "供给饱和";
  topKeywords: { word: string; heat: number; tag: "高增长" | "稳定" | "风险" }[];
  brandLandscape: { brand: string; share: number; category: "头部" | "腰部" | "潜力" }[];
  audienceDemographics: {
    ageDistribution: { range: string; ratio: number }[];
    tierCityDistribution: { cityTier: string; ratio: number }[];
    motives: string[];
  };
  ipFitMap: {
    ipName: string;
    fitScore: number;
    reason: string;
  }[];
  opportunitySummary: string[];
}
