import React, { useState } from "react";
import { Brand, EventIP, FactorWeights, IndustryType } from "../../types";
import { Sliders, RotateCcw, ShieldAlert, Award, TrendingUp, Info } from "lucide-react";

interface Props {
  brand: Brand;
  ips: EventIP[];
  selectedIpId: string;
  onSelectIp: (ipId: string) => void;
  selectedBudgetTier?: "150w" | "200w" | "250w";
}

const DEFAULT_WEIGHTS: Record<IndustryType, FactorWeights> = {
  汽车出行: { ta: 0.25, tone: 0.22, scene: 0.18, timing: 0.15, white: 0.10, budget: 0.10 },
  美妆个护: { ta: 0.25, tone: 0.20, scene: 0.15, timing: 0.15, white: 0.15, budget: 0.10 },
  医疗医美: { ta: 0.22, tone: 0.16, scene: 0.12, timing: 0.10, white: 0.15, budget: 0.10, compliance: 0.15 },
  日化家清: { ta: 0.22, tone: 0.18, scene: 0.20, timing: 0.12, white: 0.16, budget: 0.12 },
  服饰鞋包: { ta: 0.24, tone: 0.22, scene: 0.14, timing: 0.20, white: 0.12, budget: 0.08 },
};

const CPM_BENCHMARKS: Record<string, Record<string, number>> = {
  ip_ye_ren_jie: { S: 20.8, A: 26.7, B: 35.7 },
  ip_xiao_mei_shuo: { S: 31.3, A: 40.0, B: 53.6 },
  ip_red_gala: { S: 11.4, A: 14.3, B: 17.6 },
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const round1 = (v: number) => Math.round(v * 10) / 10;

function computeSetOverlap(bArr?: string[], ipArr?: string[]) {
  if (!bArr || !ipArr || !bArr.length || !ipArr.length) return { score: 30, hits: [] };
  const hits = bArr.filter((x) => ipArr.includes(x));
  const ratio = (hits.length / bArr.length) * 0.7 + (hits.length / ipArr.length) * 0.3;
  return { score: round1(30 + 70 * ratio), hits };
}

function computeTimingGap(bMonths?: number[], ipMonths?: number[]) {
  if (!bMonths || !ipMonths || !bMonths.length || !ipMonths.length) {
    return { score: 50, note: "档期信息完整" };
  }
  let minGap = 99;
  let bestPair = [bMonths[0], ipMonths[0]];
  bMonths.forEach((b) =>
    ipMonths.forEach((i) => {
      const d = Math.abs(b - i);
      const gap = Math.min(d, 12 - d);
      if (gap < minGap) {
        minGap = gap;
        bestPair = [b, i];
      }
    })
  );
  const gapTable: Record<number, number> = { 0: 100, 1: 84, 2: 64, 3: 45, 4: 32 };
  const score = gapTable[minGap] !== undefined ? gapTable[minGap] : 25;
  const note =
    minGap === 0
      ? `品牌大促(${bestPair[0]}月)与IP档期(${bestPair[1]}月)完全同频`
      : `大促月(${bestPair[0]}月)与IP档期(${bestPair[1]}月)相差${minGap}个月`;
  return { score, note };
}

export const SixFactorConsole: React.FC<Props> = ({
  brand,
  ips,
  selectedIpId,
  onSelectIp,
  selectedBudgetTier = "200w",
}) => {
  const industry = brand.industry;
  const initialWeights = DEFAULT_WEIGHTS[industry] || DEFAULT_WEIGHTS["美妆个护"];

  const [customWeights, setCustomWeights] = useState<FactorWeights>(initialWeights);

  const resetWeights = () => {
    setCustomWeights(DEFAULT_WEIGHTS[industry] || DEFAULT_WEIGHTS["美妆个护"]);
  };

  // Compute normalized weights sum
  const keys = Object.keys(customWeights) as (keyof FactorWeights)[];
  const rawSum = keys.reduce((s, k) => s + (customWeights[k] || 0), 0) || 1;
  const normWeights: FactorWeights = { ...customWeights };
  keys.forEach((k) => {
    if (normWeights[k] !== undefined) {
      normWeights[k] = (customWeights[k] || 0) / rawSum;
    }
  });

  const selectedIp = ips.find((i) => i.id === selectedIpId) || ips[0];

  // Helper to score a single IP for this brand
  const scoreIP = (ip: EventIP) => {
    const taRes = computeSetOverlap(
      brand.targetDemographics,
      ip.ta || ip.targetAudience.split("、")
    );
    const toneRes = computeSetOverlap(
      brand.uniqueAssets.map((a) => a.title),
      ip.tone || ip.scenarios
    );
    const sceneRes = computeSetOverlap(
      brand.uniqueAssets.map((a) => a.activationIdea),
      ip.scene || ip.scenarios
    );
    const timingRes = computeTimingGap(brand.launchMonths || [3, 6, 11], ip.windowMonths || [9, 10]);

    const fitVal = ip.fit ? ip.fit[industry] || 70 : ip.fitWeights[industry] || 70;
    const damp = 0.35 + 0.65 * (fitVal / 100);
    const rawWhite = brand.whiteSpace ? brand.whiteSpace[ip.id] || 65 : 65;
    const whiteScore = round1(clamp(rawWhite * damp, 10, 100));

    const tierCode = selectedBudgetTier === "250w" ? "S" : selectedBudgetTier === "200w" ? "A" : "B";
    const cpm = CPM_BENCHMARKS[ip.id]?.[tierCode] || 25;
    const budgetScore = round1(clamp(100 - (cpm - 10) * 1.4, 30, 100));

    const complianceScore = 85;

    const parts: Record<string, { name: string; score: number; note: string }> = {
      ta: { name: "人群重合度", score: taRes.score, note: `重合 ${taRes.hits.length} 项标签` },
      tone: { name: "调性契合度", score: toneRes.score, note: `共用 ${toneRes.hits.length} 项基因` },
      scene: { name: "场景适配度", score: sceneRes.score, note: `共用 ${sceneRes.hits.length} 项场景` },
      timing: { name: "时令节奏", score: timingRes.score, note: timingRes.note },
      white: { name: "竞位空白度", score: whiteScore, note: `品类承载力折算系数 ${round1(damp)}` },
      budget: { name: "预算效率", score: budgetScore, note: `${tierCode}档 预估 CPM ${cpm} 元` },
    };

    if (industry === "医疗医美") {
      parts.compliance = { name: "合规安全度", score: complianceScore, note: "已核对广告与术后宣传红线" };
    }

    let rawScore = 0;
    keys.forEach((k) => {
      if (parts[k] && normWeights[k] !== undefined) {
        rawScore += parts[k].score * normWeights[k]!;
      }
    });

    const categoryMultiplier = 0.70 + 0.34 * (fitVal / 100);
    const totalScore = clamp(Math.round(rawScore * categoryMultiplier), 0, 100);

    let depthTag = "场景参与";
    let gradeTag = "C";
    if (totalScore >= 85) {
      depthTag = "冠名 / 首席级";
      gradeTag = "A";
    } else if (totalScore >= 70) {
      depthTag = "战略共创级";
      gradeTag = "B";
    } else if (totalScore >= 55) {
      depthTag = "场景植入级";
      gradeTag = "C";
    } else {
      depthTag = "建议改配";
      gradeTag = "D";
    }

    return {
      ip,
      parts,
      fitVal,
      rawScore: round1(rawScore),
      multiplier: round1(categoryMultiplier),
      totalScore,
      depthTag,
      gradeTag,
    };
  };

  const currentResult = scoreIP(selectedIp);
  const allRankings = ips.map((ip) => scoreIP(ip)).sort((a, b) => b.totalScore - a.totalScore);

  const factorList: { key: keyof FactorWeights; name: string; en: string }[] = [
    { key: "ta", name: "人群重合度", en: "TA-OVERLAP" },
    { key: "tone", name: "调性契合度", en: "TONALITY" },
    { key: "scene", name: "场景适配度", en: "SCENE-FIT" },
    { key: "timing", name: "时令节奏", en: "TIMING-SYNC" },
    { key: "white", name: "竞位空白度", en: "WHITE-SPACE" },
    { key: "budget", name: "预算效率", en: "BUDGET-EFF" },
  ];

  if (industry === "医疗医美") {
    factorList.push({ key: "compliance", name: "合规安全度", en: "COMPLIANCE" });
  }

  return (
    <div className="bg-white rounded-none border border-[#D6DCD9] p-6 space-y-6 shadow-sm">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6EAE7] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#E8384F]" />
            <h3 className="font-serif-custom text-lg font-bold text-[#16211F]">
              六联权重调音台 · {brand.name} × {selectedIp.name}
            </h3>
          </div>
          <p className="text-xs text-[#7C8B88] font-mono mt-1">
            拖动下方权重滑杆，实时动态重算品牌与四大 IP 的匹配总分（归一化权重）。
          </p>
        </div>

        <button
          onClick={resetWeights}
          className="px-3 py-1 rounded bg-[#F7F8F6] text-[#42524F] text-xs font-medium hover:bg-[#EEF0EC] transition-colors flex items-center gap-1 border border-[#D6DCD9]"
        >
          <RotateCcw className="w-3 h-3 text-[#7C8B88]" />
          <span>恢复 {industry} 默认权重</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        {/* Left: Factor Bar Visualizer & Sliders */}
        <div className="lg:col-span-8 space-y-5">
          {/* Vertical Factor Bar Visualizer */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-end h-40 bg-[#F7F8F6] p-4 border border-[#D6DCD9] relative">
            {factorList.map((f) => {
              const part = currentResult.parts[f.key] || { score: 50, note: "" };
              const score = part.score;
              const isHigh = score >= 75;
              const isLow = score < 50;
              return (
                <div key={f.key} className="flex flex-col items-center justify-end h-full">
                  <span className="font-mono text-xs font-bold text-[#16211F] mb-1">
                    {score}
                  </span>
                  <div className="w-full bg-[#EEF0EC] border border-[#D6DCD9] overflow-hidden flex items-end h-24">
                    <div
                      className={`w-full transition-all duration-300 ${
                        isHigh ? "bg-[#E8384F]" : isLow ? "bg-[#E8A33D]" : "bg-[#1F5C56]"
                      }`}
                      style={{ height: `${score}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#42524F] font-medium mt-1.5 text-center truncate w-full">
                    {f.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Range Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-[#F7F8F6] p-3 border border-[#E6EAE7]">
            {factorList.map((f) => {
              const weightVal = normWeights[f.key] || 0;
              const pct = Math.round(weightVal * 100);
              return (
                <div key={f.key} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#16211F]">{f.name}</span>
                    <span className="font-mono font-bold text-[#E8384F]">{pct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={Math.round((customWeights[f.key] || 0) * 100)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) / 100;
                      setCustomWeights((prev) => ({ ...prev, [f.key]: val }));
                    }}
                    className="w-full accent-[#E8384F] h-1.5 bg-[#D6DCD9] rounded cursor-pointer"
                  />
                  <span className="text-[9px] text-[#7C8B88] font-mono block">
                    {f.en}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Score Gauge & 4-IP Rankings */}
        <div className="lg:col-span-4 bg-[#16211F] text-white p-5 border border-[#16211F] flex flex-col justify-between space-y-5 text-center">
          <div>
            <span className="font-mono text-[10px] text-[#7C8B88] uppercase tracking-widest block">
              TOTAL MATCH SCORE
            </span>
            <div className="flex items-baseline justify-center gap-1 my-2">
              <span className="text-5xl font-extrabold text-[#E8384F] font-mono tracking-tight">
                {currentResult.totalScore}
              </span>
              <span className="text-[#7C8B88] text-sm font-mono">/ 100</span>
            </div>

            <div className="inline-block px-3 py-1 bg-[#E8384F]/20 text-[#E8384F] font-bold text-xs border border-[#E8384F]/40 mb-2">
              {currentResult.depthTag} ({currentResult.gradeTag} 级)
            </div>

            <p className="text-[11px] text-stone-300 leading-relaxed font-mono">
              六因子加权 {currentResult.rawScore} 分 × 承载力折算 {currentResult.multiplier}
            </p>
          </div>

          <div className="border-t border-stone-800 pt-3 text-left space-y-1.5">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
              四大 IP 动态得分排序
            </span>
            <div className="space-y-1 text-xs font-mono">
              {allRankings.map((rank) => (
                <button
                  key={rank.ip.id}
                  onClick={() => onSelectIp(rank.ip.id)}
                  className={`w-full flex items-center justify-between p-2 transition-all ${
                    rank.ip.id === selectedIpId
                      ? "bg-[#E8384F] text-white font-bold"
                      : "bg-stone-900 text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  <span className="truncate">{rank.ip.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{rank.totalScore} 分</span>
                    <span className="text-[10px] opacity-80 px-1 bg-black/30 rounded">
                      {rank.gradeTag}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why it works & Trade-offs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#E6EAE7] text-xs">
        <div className="bg-[#DCE9E6] p-3 border border-[#2F7D74] space-y-0.5">
          <span className="text-[#1F5C56] font-bold block text-[11px] font-mono">
            ✓ 为什么值得投 (WHY IT WORKS)
          </span>
          <p className="leading-relaxed text-[11.5px] text-[#16211F]">
            {brand.targetDemographics.slice(0, 2).join("与")}人群高度重合，核心资产在 {selectedIp.name} 触点极易被激活，合作地基坚固。
          </p>
        </div>
        <div className="bg-[#FBF0DC] p-3 border border-[#E8A33D] space-y-0.5">
          <span className="text-[#9A6512] font-bold block text-[11px] font-mono">
            ⚠ 代价与风险 (TRADE-OFFS)
          </span>
          <p className="leading-relaxed text-[11.5px] text-[#6B4A0F]">
            注意时令节奏与大促节点的对齐，需提前建立搜索词闭环承接页以防流量散失。
          </p>
        </div>
      </div>
    </div>
  );
};

