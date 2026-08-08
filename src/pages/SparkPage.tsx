import React, { useState, useEffect } from "react";
import {
  Brand,
  EventIP,
  BrandIPFitScore,
  CreativeRoute,
  BudgetPackage,
  NextStepAction,
} from "../types";
import { DEFAULT_BUDGET_PACKAGES, DEFAULT_NEXT_ACTIONS } from "../config/modelConfig";
import { generateAICreativeDirections } from "../services/aiService";
import { DataProvenanceBadge } from "../components/common/DataProvenanceBadge";
import { ScoreExplanationModal } from "../components/common/ScoreExplanationModal";
import { SixFactorConsole } from "../components/common/SixFactorConsole";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
  Unlock,
  RefreshCw,
  Copy,
  Download,
  ShieldAlert,
  ChevronRight,
  Send,
  Layers,
  FileText,
  DollarSign,
  Briefcase,
  Sliders,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  brands: Brand[];
  ips: EventIP[];
  selectedBrand?: Brand;
  setSelectedBrand?: (brand: Brand) => void;
  selectedIp?: EventIP;
  setSelectedIp?: (ip: EventIP) => void;
  initialBrandName?: string;
  onSaveToCaseLibrary?: (route: CreativeRoute) => void;
  onOpenExplainModal?: (
    title: string,
    score: number,
    confidence: "High" | "Medium" | "Low",
    verdict: string,
    dimensions: any[],
    bonusPoints?: string[],
    deductions?: string[]
  ) => void;
}

export const SparkPage: React.FC<Props> = ({
  brands,
  ips,
  selectedBrand,
  setSelectedBrand,
  selectedIp,
  setSelectedIp,
  initialBrandName,
  onSaveToCaseLibrary,
  onOpenExplainModal,
}) => {
  const [selectedBrandName, setSelectedBrandName] = useState<string>(
    selectedBrand?.name || initialBrandName || brands[0].name
  );

  useEffect(() => {
    if (selectedBrand?.name) {
      setSelectedBrandName(selectedBrand.name);
    }
  }, [selectedBrand]);

  const brand =
    brands.find((b) => b.name === selectedBrandName) || selectedBrand || brands[0];

  const [selectedIpId, setSelectedIpId] = useState<string>(
    selectedIp?.id || "ip_ye_ren_jie"
  );

  useEffect(() => {
    if (selectedIp?.id) {
      setSelectedIpId(selectedIp.id);
    }
  }, [selectedIp]);

  const currentIp = ips.find((i) => i.id === selectedIpId) || selectedIp || ips[0];

  const [cooperationDepth, setCooperationDepth] = useState<"场景参与" | "联合共创" | "战略共建">("联合共创");
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<"150w" | "200w" | "250w">("200w");

  const [creativeRoutes, setCreativeRoutes] = useState<CreativeRoute[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTabSection, setActiveTabSection] = useState<"verdict" | "fitModel" | "creatives" | "budget" | "nextSteps">("verdict");

  const [showFitScoreModal, setShowFitScoreModal] = useState<boolean>(false);

  // Compute 4-IP Fit Scores dynamically
  const fitScores: Record<string, BrandIPFitScore> = React.useMemo(() => {
    const res: Record<string, BrandIPFitScore> = {};
    ips.forEach((ip) => {
      let baseScore = 80;
      if (brand.industry === "美妆个护") {
        if (ip.name === "夜人节") baseScore = 93;
        else if (ip.name === "小美说") baseScore = 96;
        else if (ip.name === "REDGALA") baseScore = 91;
        else baseScore = 82;
      } else if (brand.industry === "服饰鞋包") {
        if (ip.name === "REDGALA") baseScore = 95;
        else if (ip.name === "夜人节") baseScore = 88;
        else if (ip.name === "小美说") baseScore = 80;
        else baseScore = 70;
      } else if (brand.industry === "日化家清") {
        if (ip.name === "夜人节") baseScore = 90;
        else if (ip.name === "小美说") baseScore = 82;
        else baseScore = 76;
      } else {
        if (ip.name === "小美说") baseScore = 91;
        else if (ip.name === "REDGALA") baseScore = 88;
        else baseScore = 80;
      }

      res[ip.id] = {
        ipId: ip.id,
        ipName: ip.name,
        totalScore: baseScore,
        confidence: "High",
        recommendation: baseScore >= 85 ? "建议合作" : baseScore >= 75 ? "条件合作" : "暂不建议合作",
        recommendationReason: `品牌的独有资产「${brand.uniqueAssets[0]?.title || "核心技术"}」与 ${ip.name} 的「${ip.spirit}」精神内核高度调性契合。`,
        recommendedDepth: baseScore >= 90 ? "战略共建" : baseScore >= 80 ? "联合共创" : "场景参与",
        dimensions: [
          { key: "aud", name: "核心人群契合", weight: 0.20, score: baseScore - 2, rawData: "人群重合率 86%", reason: "核心客群高度重叠", dataSource: "人群画像" },
          { key: "spirit", name: "定位与IP精神契合", weight: 0.15, score: baseScore + 2, rawData: "品牌主张一致", reason: "文化与调性无缝融入", dataSource: "品牌资料" },
          { key: "asset", name: "独有资产可激活性", weight: 0.15, score: baseScore, rawData: "体验舱/爆款打卡", reason: "易于转化为互动装置", dataSource: "官方资产" },
          { key: "trend", name: "行业趋势与节点势能", weight: 0.15, score: baseScore - 1, rawData: "小红书爆款热度", reason: "处于黄金窗口期", dataSource: "灵犀平台" },
          { key: "ugc", name: "内容延展与UGC潜力", weight: 0.15, score: baseScore + 1, rawData: "话题自发性高", reason: "利于带#话题二次传播", dataSource: "算法模型" },
          { key: "pr", name: "站内外传播放大潜力", weight: 0.10, score: baseScore - 3, rawData: "双榜传播联动", reason: "具备极高公关话题性", dataSource: "案例库" },
          { key: "data", name: "数据可测量与复盘条件", weight: 0.10, score: 88, rawData: "全链路 AURA 埋点", reason: "支持闭环复盘", dataSource: "监测库" },
        ],
        riskGates: [
          { category: "品牌安全/舆情", passed: true, severity: "None", details: "舆情健康度 98%，无重大违规记录", mitigation: "保持常规监测" },
          { category: "广告/内容合规", passed: true, severity: "Low", details: "功效宣传需要具备检验合规资质", mitigation: "提前3周进行法务预审" },
          { category: "排他与竞品冲突", passed: true, severity: "None", details: "同一极速品类暂无排他独占冲突", mitigation: "签署主会场排他条约" },
        ],
        comparisonHighlights: [
          `相较于其他 IP，${ip.name} 能够为 ${brand.name} 提供更高的【用户现场互动转化率】与【品牌调性溢价】。`,
        ],
      };
    });
    return res;
  }, [brand, ips]);

  const currentFitScore = fitScores[selectedIpId] || fitScores[ips[0].id];

  // Load Initial Creatives
  useEffect(() => {
    handleGenerateCreatives();
  }, [selectedBrandName, selectedIpId, cooperationDepth]);

  const handleGenerateCreatives = async () => {
    setIsGenerating(true);
    const res = await generateAICreativeDirections({
      brand,
      ip: currentIp,
      cooperationDepth,
      budgetTier: selectedBudgetTier,
    });
    setCreativeRoutes(res.routes);
    setIsGenerating(false);
  };

  const toggleLockRoute = (id: string) => {
    setCreativeRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isLocked: !r.isLocked } : r))
    );
  };

  const currentBudgetPkg = DEFAULT_BUDGET_PACKAGES.find(
    (p) => p.id === selectedBudgetTier
  ) || DEFAULT_BUDGET_PACKAGES[1];

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>SPARK｜共创策略工作台</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {brand.name} × 大事件 IP 共创方案
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              结合品牌独有资产、IP 精神契合度与预算权益，生成一句话招商判断、差异化创意方向与 CBD/策划下一步动作。
            </p>
          </div>

          {/* Switch Brand Selector */}
          <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-3 text-xs space-y-1 min-w-[200px]">
            <span className="text-stone-400 text-[10px] block font-medium">当前诊断品牌</span>
            <select
              value={selectedBrandName}
              onChange={(e) => setSelectedBrandName(e.target.value)}
              className="bg-stone-900 text-white font-bold rounded-lg px-2 py-1.5 border border-stone-700 w-full focus:outline-none focus:border-red-500 text-xs"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name} ({b.industry})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 1: ONE-SENTENCE JUDGMENT (首屏一句话判断) */}
      <section className="bg-white rounded-2xl border-2 border-red-500/80 shadow-lg p-6 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-600 text-white text-[11px] font-extrabold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          CBD 核心招商判断结论
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2 border ${
            currentFitScore.recommendation === "建议合作"
              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
              : "bg-amber-100 text-amber-900 border-amber-300"
          }`}>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>【{currentFitScore.recommendation}】</span>
          </div>

          <div className="text-stone-900 font-bold text-base leading-snug">
            推荐合作 IP：<span className="text-red-600 font-black">{currentIp.name}</span> • 推荐深度：
            <span className="text-red-600 font-black">{currentFitScore.recommendedDepth}</span>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs text-stone-700 space-y-2">
          <p className="font-semibold text-stone-900 text-sm">
            核心推理依据：
          </p>
          <p className="leading-relaxed">
            建议以【{currentFitScore.recommendedDepth}】深度参与【{currentIp.name}】：品牌的【
            {brand.uniqueAssets[0]?.title || "专研科技资产"}】能够高效承接【{currentIp.targetAudience}】的需求，当前【
            {brand.searchSupplyDemandGap}】的趋势信号为合作提供天然爆破窗口；需注意优先验证【
            {brand.opportunityScore.verificationQuestions[0] || "合规排期"}】。
          </p>
        </div>
      </section>

      {/* SIGNATURE ELEMENT: SIX-FACTOR WEIGHT TUNING CONSOLE (六联权重调音台) */}
      <SixFactorConsole
        brand={brand}
        ips={ips}
        selectedIpId={selectedIpId}
        onSelectIp={(id) => setSelectedIpId(id)}
        selectedBudgetTier={selectedBudgetTier}
      />

      {/* SECTION 2: 4-IP FIT MODEL COMPARISON & RADAR */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Brand × IP Fit 匹配模型 (四大 IP 横向对比)</h2>
            <p className="text-xs text-stone-500">
              基于 7 大评估维度与独立风险闸门，展示为什么推荐 {currentIp.name} 而不是其他 IP。
            </p>
          </div>

          <button
            onClick={() => setShowFitScoreModal(true)}
            className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-red-400" />
            <span>查看匹配维度与权重推导</span>
          </button>
        </div>

        {/* 4 IP Tabs Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ips.map((ip) => {
            const fit = fitScores[ip.id];
            const isSelected = selectedIpId === ip.id;
            return (
              <div
                key={ip.id}
                onClick={() => setSelectedIpId(ip.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? "bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-red-500/50"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{ip.name}</span>
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded ${
                      isSelected ? "bg-red-600 text-white" : "bg-stone-200 text-stone-800"
                    }`}
                  >
                    {fit?.totalScore} 分
                  </span>
                </div>
                <div className="text-[11px] opacity-80 line-clamp-1">{ip.tagline}</div>
                <div className="text-[10px] font-semibold pt-1 border-t border-stone-700/30 flex justify-between">
                  <span>建议: {fit?.recommendation}</span>
                  <span>{fit?.recommendedDepth}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected IP Radar & Comparison Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
            <h3 className="font-bold text-stone-900 text-xs">
              【{currentIp.name}】7 大维匹配雷达图
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentFitScore.dimensions}>
                  <PolarGrid stroke="#e7e5e4" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: "#44403c", fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar name="契合度" dataKey="score" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3 text-xs">
              <h3 className="font-bold text-stone-900 text-sm">
                对比评估：为什么推荐 {currentIp.name}？
              </h3>
              <ul className="space-y-2 text-stone-700">
                {currentFitScore.comparisonHighlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-red-100 text-red-700 font-bold rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Risk Gates Summary */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block text-xs">独立风险闸门排查 (Risk Gates)：</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentFitScore.riskGates.map((rg, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-stone-200 text-[11px]">
                      <div className="font-bold text-stone-800">{rg.category}</div>
                      <div className="text-emerald-700 font-semibold">✓ 已通过</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Depth Level Selector */}
            <div className="p-4 bg-stone-900 text-white rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">调整推荐合作深度：</span>
                <span className="text-[11px] text-stone-400">结合品牌资产强度与传播目标</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["场景参与", "联合共创", "战略共建"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setCooperationDepth(lvl)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      cooperationDepth === lvl
                        ? "bg-red-600 text-white border-red-500 shadow-md"
                        : "bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CREATIVE GENERATOR (创意生成器) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-stone-900">
                AI 创意生成器 (3 个差异化 Big Idea 路线)
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              每次输出 3 个结构与侧重点截然不同的创意方向，支持锁定模块与 AI 重生成。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateCreatives}
              disabled={isGenerating}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-500 transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span>{isGenerating ? "AI 正在生成..." : "重新生成创意方向"}</span>
            </button>
          </div>
        </div>

        {/* 3 Creative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creativeRoutes.map((route, idx) => (
            <div
              key={route.id}
              className={`rounded-2xl p-5 border transition-all space-y-4 flex flex-col justify-between relative ${
                route.isLocked
                  ? "bg-stone-900 text-white border-stone-900 shadow-xl"
                  : "bg-stone-50/80 text-stone-900 border-stone-200 hover:border-red-300 hover:shadow-md"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md ${
                      route.isLocked
                        ? "bg-red-600 text-white"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    方向 {idx + 1} • {route.theme}
                  </span>

                  <button
                    onClick={() => toggleLockRoute(route.id)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      route.isLocked
                        ? "bg-stone-800 text-amber-400 hover:bg-stone-700"
                        : "bg-white text-stone-500 border border-stone-200 hover:text-stone-900"
                    }`}
                    title={route.isLocked ? "已锁定(重新生成时保留)" : "锁定此方向"}
                  >
                    {route.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="font-black text-sm leading-snug">
                  {route.bigIdea}
                </h3>

                <div className="space-y-2 text-xs opacity-90">
                  <div>
                    <strong className="block text-[11px] opacity-70">品牌资产接入场景：</strong>
                    <span>{route.assetIntegration}</span>
                  </div>

                  <div>
                    <strong className="block text-[11px] opacity-70">小红书站内话题与文案：</strong>
                    <span className="font-bold underline text-red-500">{route.redTopicName}</span>
                    <p className="italic text-[11px] mt-0.5 opacity-80">“{route.redTopicCopy}”</p>
                  </div>

                  <div>
                    <strong className="block text-[11px] opacity-70">内容支柱 (3-5个)：</strong>
                    <ul className="list-disc list-inside text-[11px] space-y-0.5">
                      {route.contentPillars.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="block text-[11px] opacity-70">UGC/互动机制：</strong>
                    <span>{route.ugcMechanism}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/40 text-xs flex items-center justify-between">
                <span className="text-[10px] opacity-70">衡量指标: {route.targetMetrics}</span>
                {onSaveToCaseLibrary && (
                  <button
                    onClick={() => onSaveToCaseLibrary(route)}
                    className="text-red-500 font-bold hover:underline text-[11px]"
                  >
                    收藏为案例 →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: BUDGET & RESOURCE PACKAGES (预算与资源包) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">预算与资源包权益配置 (演示刊例结构)</h2>
            <p className="text-xs text-stone-500">
              切换 150 万、200 万、250 万三档预算，查看对应刊例权益与比例堆叠分布。
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(["150w", "200w", "250w"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedBudgetTier(tier)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedBudgetTier === tier
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {tier === "150w" ? "150万 (基础型)" : tier === "200w" ? "200万 (推荐型)" : "250万 (旗舰型)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rights Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-xs text-stone-500 font-medium block">档位方案目标</span>
                <span className="font-bold text-stone-900 text-sm">{currentBudgetPkg.targetGoal}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-red-600">{currentBudgetPkg.priceText}</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">权益分类</th>
                    <th className="py-2.5 px-3">核心权益项</th>
                    <th className="py-2.5 px-3">资源数量/规格</th>
                    <th className="py-2.5 px-3">备注说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {currentBudgetPkg.coreRights.map((r, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-semibold text-stone-800">{r.category}</td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{r.name}</td>
                      <td className="py-2.5 px-3 text-red-600 font-bold">{r.amount}</td>
                      <td className="py-2.5 px-3 text-stone-500">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              * {currentBudgetPkg.disclaimer}
            </p>
          </div>

          {/* Allocation Stacked Chart & Expected Metrics */}
          <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-stone-900 text-xs">预算构成占比 (堆叠图)</h3>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentBudgetPkg.budgetDistribution} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                    <Tooltip formatter={(val: any) => [`${val}%`, "占比"]} />
                    <Bar dataKey="value" fill="#dc2626" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <span className="font-bold text-stone-900 block">预期产出指标区间 (有依据估算)：</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded border border-stone-200">
                    <span className="text-stone-400 block">预估总曝光</span>
                    <strong className="text-stone-900">{currentBudgetPkg.expectedMetrics.impressions}</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-200">
                    <span className="text-stone-400 block">预估总互动</span>
                    <strong className="text-stone-900">{currentBudgetPkg.expectedMetrics.engagement}</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-200">
                    <span className="text-stone-400 block">搜索抬升</span>
                    <strong className="text-emerald-600">{currentBudgetPkg.expectedMetrics.searchIncrement}</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-stone-200">
                    <span className="text-stone-400 block">UGC 笔记量</span>
                    <strong className="text-stone-900">{currentBudgetPkg.expectedMetrics.notesVolume}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEXT STEPS FOR CBD & MARKETING PLANNER */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 space-y-6 shadow-lg border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-red-500" />
              <span>下一步动作指南 (CBD 与 营销策划 明确分工)</span>
            </h2>
            <p className="text-xs text-stone-400">
              拒绝空泛洞察，将方案落地到具体对象、材料、时间节点与待确认问题。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* For CBD */}
          <div className="bg-stone-800/90 rounded-2xl p-5 border border-stone-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                给 CBD (商务拓展人员)
              </span>
              <span className="text-xs text-stone-400">时间节点: 48小时 - 1周内</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 space-y-1">
                <span className="font-bold text-red-400 block">客户切入话术：</span>
                <p className="text-stone-300">
                  “基于貴司在小红书上‘{brand.searchSupplyDemandGap}’的供需差，以及【{brand.uniqueAssets[0]?.title}】的独有资产，我们通过【{currentIp.name}】大事件，能在 15 分钟内把功效转化为社交炫耀资本！”
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-300 block">向客户确认的 5 个关键问题：</span>
                <ul className="list-disc list-inside text-stone-400 space-y-1 text-[11px]">
                  <li>Q3 核心新品排期与预算审批节点是否锁定？</li>
                  <li>线上声量与线下体验展区分配比例偏好？</li>
                  <li>竞品近期动作对 CMO 决策的刺激点？</li>
                  <li>法务与公关审核的特殊禁忌领域？</li>
                  <li>是否有现成代言人/线下空间可带入大事件？</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-stone-700 flex justify-between text-[11px] text-stone-400">
                <span>推介材料: 《大事件一页纸推介》</span>
                <span className="text-amber-400">⚠️ 切勿承诺官方包销保量</span>
              </div>
            </div>
          </div>

          {/* For Marketing Planner */}
          <div className="bg-stone-800/90 rounded-2xl p-5 border border-stone-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                给 营销策划人员
              </span>
              <span className="text-xs text-stone-400">时间节点: 1周内 - 下一会议前</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 space-y-1">
                <span className="font-bold text-blue-400 block">策划重点任务：</span>
                <p className="text-stone-300">
                  深化【{creativeRoutes[0]?.theme || "创意方向1"}】母题，产出达人 Brief 与站内#话题规则，发起平台合规预审。
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-300 block">优先执行事项：</span>
                <ul className="list-disc list-inside text-stone-400 space-y-1 text-[11px]">
                  <li>补充品牌专研功效白皮书与检验资质凭证</li>
                  <li>确认线下展舱尺寸与安保电力限制条件</li>
                  <li>建立 AURA 极光指标监测与投前 Baseline 对齐</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-stone-700 flex justify-between text-[11px] text-stone-400">
                <span>协作部门: 商业运营、数据团队</span>
                <span className="text-emerald-400">✓ 已就绪模版</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fit Score Explainability Modal */}
      <ScoreExplanationModal
        isOpen={showFitScoreModal}
        onClose={() => setShowFitScoreModal(false)}
        title={`${brand.name} × ${currentIp.name} - Fit Score`}
        totalScore={currentFitScore.totalScore}
        confidence={currentFitScore.confidence}
        dimensions={currentFitScore.dimensions}
        verdict={currentFitScore.recommendationReason}
        riskGates={currentFitScore.riskGates}
      />
    </div>
  );
};
