import React, { useState } from "react";
import { IndustryType, Brand, EventIP } from "../types";
import { MOCK_INDUSTRIES } from "../data/mockData";
import { DataProvenanceBadge } from "../components/common/DataProvenanceBadge";
import { ScoreExplanationModal } from "../components/common/ScoreExplanationModal";
import {
  Search,
  Compass,
  TrendingUp,
  AlertCircle,
  Users,
  PieChart as PieIcon,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
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
  ips?: EventIP[];
  selectedBrand?: Brand;
  setSelectedBrand?: (brand: Brand) => void;
  industries?: any;
  onSelectBrandForSpark: (brandName: string) => void;
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

export const PulsePage: React.FC<Props> = ({
  brands,
  ips,
  selectedBrand: propSelectedBrand,
  setSelectedBrand: propSetSelectedBrand,
  onSelectBrandForSpark,
  onOpenExplainModal,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>("美妆个护");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("全部品类");
  const [searchBrandInput, setSearchBrandInput] = useState("");
  const [internalSelectedBrand, setInternalSelectedBrand] = useState<Brand>(propSelectedBrand || brands[0]);

  const selectedBrand = propSelectedBrand || internalSelectedBrand;
  const setSelectedBrand = (b: Brand) => {
    setInternalSelectedBrand(b);
    if (propSetSelectedBrand) propSetSelectedBrand(b);
  };
  const [showScoreModal, setShowScoreModal] = useState(false);

  const currentIndustryData = MOCK_INDUSTRIES[selectedIndustry];

  const handleBrandSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchBrandInput.trim()) return;
    const found = brands.find(
      (b) => b.name.toLowerCase().includes(searchBrandInput.toLowerCase())
    );
    if (found) {
      setSelectedBrand(found);
    } else {
      // Create dynamic dummy brand if not found in mock list
      setSelectedBrand({
        id: `brand_search_${Date.now()}`,
        name: searchBrandInput,
        industry: selectedIndustry,
        subcategory: "综合品类",
        positioning: `${searchBrandInput} - 具备强劲市场口碑与场景爆破引力的潜力品牌`,
        targetDemographics: ["Z世代", "新中产", "场景偏好者"],
        coreProducts: [`${searchBrandInput} 核心主打单品`],
        uniqueAssets: [
          {
            id: `asset_dyn_${Date.now()}`,
            type: "产品技术",
            title: "专研核心技术",
            description: "具备临床功效或独特体感",
            activatableInIP: true,
            activationIdea: "大事件现场互动沉浸舱体验",
          },
        ],
        redSearchIndex: 520000,
        redContentVolume: 24000,
        searchSupplyDemandGap: "中等缺口",
        competitorBrands: ["竞品品牌A", "竞品品牌B"],
        opportunityScore: {
          totalScore: 84,
          confidence: "Medium",
          verdict: `品牌 ${searchBrandInput} 在${selectedIndustry}领域具备较高的跨界机会，建议推进大事件 IP 合作。`,
          dimensions: [
            { key: "cat", name: "品类势能", weight: 0.2, score: 86, rawData: "品类搜索 YoY +20%", reason: "赛道需求活跃", dataSource: "小红书行业模型" },
            { key: "brand", name: "品牌动能", weight: 0.2, score: 82, rawData: "月搜索 52万次", reason: "处于快速上升期", dataSource: "搜索数据库" },
            { key: "aud", name: "人群增量", weight: 0.2, score: 85, rawData: "人群重合率 81%", reason: "年轻破圈潜力高", dataSource: "人群模型" },
            { key: "asset", name: "资产可激活性", weight: 0.2, score: 84, rawData: "拥有特色单品", reason: "可线下装置打卡", dataSource: "官方资料" },
            { key: "biz", name: "商业可推进性", weight: 0.1, score: 80, rawData: "营销节点临近", reason: "意向明确", dataSource: "CBD接触" },
            { key: "risk", name: "风险与可测量性", weight: 0.1, score: 88, rawData: "舆情健康", reason: "数据可得性好", dataSource: "监测" },
          ],
          bonusPoints: ["品类契合目前站内爆款场景方向"],
          deductions: ["缺口大单品在站内的心智沉淀时间较短"],
          verificationQuestions: ["品牌 Q3 是否具备明确的大促投放排期？"],
        },
        recommendedIPs: ["夜人节", "小美说"],
        provenance: {
          source: "演示生成 Adapter (Mock)",
          scope: "小红书站内 2026Q2",
          timeRange: "2026.04.01 - 2026.06.30",
          updatedAt: new Date().toISOString().split("T")[0],
          isEstimated: true,
          confidence: "Medium",
        },
      });
    }
  };

  const radarData = selectedBrand.opportunityScore.dimensions.map((d) => ({
    dimension: d.name,
    score: d.score,
  }));

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden border border-stone-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
          <Compass className="w-3.5 h-3.5" />
          <span>PULSE｜机会雷达</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">投前洞察 • 行业行情与品牌机会扫描</h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
          抓取站内搜索供需缺口、赛道热度与品牌独有资产，输出具备数学可解释性的 Brand Opportunity Score (0-100)。
        </p>
      </div>

      {/* Industry Market Scanner Section */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">四大行业行情雷达</h2>
            <p className="text-xs text-stone-500">选择一级行业与二级品类，查看实时搜索与供给分布。</p>
          </div>

          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(["美妆个护", "医疗医美", "日化家清", "服饰鞋包"] as IndustryType[]).map((ind) => (
              <button
                key={ind}
                onClick={() => {
                  setSelectedIndustry(ind);
                  setSelectedSubcategory("全部品类");
                  const brandInInd = brands.find((b) => b.industry === ind);
                  if (brandInInd) setSelectedBrand(brandInInd);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedIndustry === ind
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100 text-xs">
          <span className="text-stone-400 font-medium shrink-0">二级分类:</span>
          {["全部品类", ...currentIndustryData.subcategories].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                selectedSubcategory === sub
                  ? "bg-stone-900 text-white font-bold"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Industry Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <span className="text-[11px] text-stone-400 font-medium block">行业热度指数</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-stone-900">{currentIndustryData.heatIndex}</span>
              <span className="text-xs font-bold text-emerald-600">{currentIndustryData.heatTrend}</span>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <span className="text-[11px] text-stone-400 font-medium block">月度搜索总量</span>
            <div className="text-2xl font-black text-stone-900 mt-1">
              {currentIndustryData.searchVolume}
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <span className="text-[11px] text-stone-400 font-medium block">搜索供需缺口 (Supply & Demand Gap)</span>
            <div className="text-sm font-extrabold text-red-600 mt-2">
              {currentIndustryData.supplyDemandGap}
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <span className="text-[11px] text-stone-400 font-medium block">大事件 IP 最佳适配</span>
            <div className="flex items-center gap-1 mt-2">
              <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">
                {currentIndustryData.ipFitMap[0]?.ipName} ({currentIndustryData.ipFitMap[0]?.fitScore}分)
              </span>
            </div>
          </div>
        </div>

        {/* Keywords Matrix & Brand Landscape */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Keywords Matrix */}
          <div className="lg:col-span-7 bg-stone-50/70 rounded-xl p-5 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-red-600" />
                高增长、稳定与风险关键词矩阵
              </h3>
              <span className="text-[10px] text-stone-400">小红书词频算法</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentIndustryData.topKeywords.map((kw) => (
                <div
                  key={kw.word}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
                    kw.tag === "高增长"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : kw.tag === "稳定"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  <span>{kw.word}</span>
                  <span className="text-[10px] font-normal opacity-80">热度:{kw.heat}</span>
                  <span className="text-[9px] px-1 bg-white/60 rounded">{kw.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Landscape */}
          <div className="lg:col-span-5 bg-stone-50/70 rounded-xl p-5 border border-stone-200 space-y-3">
            <h3 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-stone-600" />
              行业头部与腰部品牌格局
            </h3>
            <div className="space-y-2 text-xs">
              {currentIndustryData.brandLandscape.map((b) => (
                <div key={b.brand} className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-800">{b.brand}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-mono text-[11px]">{b.share}% 声量</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded font-bold ${
                      b.category === "头部" ? "bg-red-100 text-red-800" : "bg-stone-100 text-stone-700"
                    }`}>{b.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to pitch now (现在值得谈什么) */}
        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>【现在值得谈什么】 自动生成 3—5 条招商机会摘要</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-700">
            {currentIndustryData.opportunitySummary.map((opt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand Opportunity Scanner (品牌机会扫描) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">品牌机会档案与 Opportunity Score 扫描</h2>
            <p className="text-xs text-stone-500">
              输入品牌名称或选择已有品牌，拆解其独有资产与可衡量评分。
            </p>
          </div>

          {/* Search or Select Brand */}
          <form onSubmit={handleBrandSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchBrandInput}
                onChange={(e) => setSearchBrandInput(e.target.value)}
                placeholder="搜索新品牌..."
                className="pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-red-500 w-48"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              扫描
            </button>
          </form>
        </div>

        {/* Current Selected Brand Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Brand Info & Assets */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-red-600 font-bold uppercase">{selectedBrand.industry} • {selectedBrand.subcategory}</span>
                <h3 className="text-xl font-black text-stone-900">{selectedBrand.name}</h3>
                <p className="text-xs text-stone-600 mt-1">{selectedBrand.positioning}</p>
              </div>
              <DataProvenanceBadge provenance={selectedBrand.provenance} compact />
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-3 gap-2 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block text-[10px]">小红书月搜索量</span>
                <span className="font-extrabold text-stone-900 text-sm">{(selectedBrand.redSearchIndex / 10000).toFixed(1)}万次</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">月度笔记讨论量</span>
                <span className="font-extrabold text-stone-900 text-sm">{(selectedBrand.redContentVolume / 10000).toFixed(1)}万篇</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">站内搜索缺口</span>
                <span className="font-bold text-red-600 text-xs">{selectedBrand.searchSupplyDemandGap}</span>
              </div>
            </div>

            {/* Unique Assets List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900">品牌独有资产清单 (Unique Assets)</h4>
              <div className="space-y-2">
                {selectedBrand.uniqueAssets.map((asset) => (
                  <div key={asset.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800">{asset.title}</span>
                      <span className="px-2 py-0.5 bg-stone-200 text-stone-700 text-[10px] font-medium rounded">{asset.type}</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">{asset.description}</p>
                    <div className="text-red-700 font-medium text-[11px] pt-1 border-t border-stone-200/60">
                      💡 大事件激活想法: {asset.activationIdea}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opportunity Score Radar & Verdict */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">Brand Opportunity Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-red-600">{selectedBrand.opportunityScore.totalScore}</span>
                    <span className="text-xs text-stone-500">/ 100 分</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowScoreModal(true)}
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>展开评分依据</span>
                </button>
              </div>

              {/* Radar Chart */}
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e7e5e4" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#44403c", fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar name="得分" dataKey="score" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">机会诊断结论：</strong>
                {selectedBrand.opportunityScore.verdict}
              </div>
            </div>

            <button
              onClick={() => onSelectBrandForSpark(selectedBrand.name)}
              className="w-full py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-500 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>带入 SPARK 生成 4-IP 匹配与方案</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Model Explainability Modal */}
      <ScoreExplanationModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        title={`${selectedBrand.name} - Brand Opportunity Score`}
        totalScore={selectedBrand.opportunityScore.totalScore}
        confidence={selectedBrand.opportunityScore.confidence}
        dimensions={selectedBrand.opportunityScore.dimensions}
        verdict={selectedBrand.opportunityScore.verdict}
        deductions={selectedBrand.opportunityScore.deductions}
        verificationQuestions={selectedBrand.opportunityScore.verificationQuestions}
      />
    </div>
  );
};
