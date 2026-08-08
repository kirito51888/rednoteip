import React, { useState } from "react";
import { ReviewReport } from "../types";
import { DataProvenanceBadge } from "../components/common/DataProvenanceBadge";
import {
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  Search,
  Filter,
  PieChart as PieIcon,
  HelpCircle,
  Download,
  Share2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  Edit3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  report: ReviewReport;
  onSaveReportAsCase?: () => void;
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

export const EchoPage: React.FC<Props> = ({ report, onSaveReportAsCase, onOpenExplainModal }) => {
  const [wizardStep, setWizardStep] = useState<number>(5); // Default to Step 5 (Preview full report)
  const [editedSummary, setEditedSummary] = useState<string>(report.overallSummary);
  const [isEditingSummary, setIsEditingSummary] = useState<boolean>(false);

  const steps = [
    "1. 选择项目与目标",
    "2. 确认投前基线",
    "3. 数据接入 (灵犀/上传)",
    "4. 质量检查与映射",
    "5. 报告浏览与编辑",
    "6. 案例沉淀与导出",
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>ECHO｜价值复盘系统</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {report.brandName} × {report.ipName} 投后效果复盘
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              基于真实同源数据与 9 大复盘模块，证明合作价值，解释“发生了什么、为什么、下一轮怎么做”。
            </p>
          </div>

          <DataProvenanceBadge provenance={report.provenance} />
        </div>

        {/* Wizard Step Navigation Bar */}
        <div className="pt-4 border-t border-stone-800 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-[650px] text-xs">
            {steps.map((st, i) => {
              const stepNum = i + 1;
              const isActive = wizardStep === stepNum;
              const isCompleted = wizardStep > stepNum;
              return (
                <button
                  key={st}
                  onClick={() => setWizardStep(stepNum)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-[11px] whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md"
                      : isCompleted
                      ? "bg-stone-800 text-stone-300 hover:bg-stone-700"
                      : "bg-stone-900/60 text-stone-500 border border-stone-800"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{st}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Quality & Attribution Confidence Meter */}
      <section className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-stone-900">数据质量与归因可信度检查 (Attribution Confidence)</h2>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-lg">
            复盘置信度: {report.dataConfidence} (灵犀平台校验通过)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {report.dataQualityChecks.map((qc, idx) => (
            <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-stone-800 text-[11px]">
                <span>{qc.checkItem}</span>
                {qc.passed ? (
                  <span className="text-emerald-600 font-bold">✓ 通过</span>
                ) : (
                  <span className="text-amber-600 font-bold">⚠️ 需复核</span>
                )}
              </div>
              {qc.issueDescription && (
                <p className="text-[10px] text-stone-500">{qc.issueDescription}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUMMARY HEADER CARD WITH MANUAL EDIT */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 space-y-3 shadow-lg border border-stone-800 relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
            复盘结案摘要 (AI 初稿生成 + 业务人员确认)
          </span>
          <button
            onClick={() => setIsEditingSummary(!isEditingSummary)}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEditingSummary ? "锁定保存" : "编辑结论"}</span>
          </button>
        </div>

        {isEditingSummary ? (
          <textarea
            value={editedSummary}
            onChange={(e) => setEditedSummary(e.target.value)}
            className="w-full bg-stone-950 text-white text-xs p-3 rounded-xl border border-stone-700 focus:outline-none focus:border-emerald-500 h-24"
          />
        ) : (
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
            {editedSummary}
          </p>
        )}
      </section>

      {/* 9 REVIEWS MODULES CONTAINER */}
      <div className="space-y-8">
        {/* MODULE 1: PHASE 三阶段节奏 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">1</span>
            <h2 className="text-base font-bold text-stone-900">复盘 1：整体策略与 PHASE 三阶段节奏</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.phases.map((ph, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-900 border-b border-stone-200 pb-2">
                  <span className="text-sm text-emerald-700">{ph.phase}</span>
                  <span className="text-stone-400 text-[11px]">{ph.dateRange}</span>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">阶段目标:</span>
                  <span className="text-stone-800 font-semibold">{ph.goal}</span>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">主要动作:</span>
                  <ul className="list-disc list-inside text-stone-600 space-y-0.5 text-[11px]">
                    {ph.keyActions.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-stone-200/80 font-bold text-stone-900 flex justify-between">
                  <span>实际表现:</span>
                  <span className="text-emerald-600">{ph.actualPerformance}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULE 2: 项目核心规模指标 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">2</span>
            <h2 className="text-base font-bold text-stone-900">复盘 2：项目核心规模指标 (Scale Metrics)</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {report.scaleMetrics.map((sm, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs space-y-1">
                <span className="text-stone-400 block text-[10px] font-medium">{sm.label}</span>
                <div className="text-lg font-black text-stone-900">
                  {sm.actual.toLocaleString()} <span className="text-[10px] font-normal text-stone-500">{sm.unit}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1 border-t border-stone-200/60">
                  <span>达成率: <strong className="text-emerald-600">{sm.achievementRate}%</strong></span>
                  <span className="text-stone-400">{sm.yoYGrowth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULE 3: AURA 极光指标 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
              <h2 className="text-base font-bold text-stone-900">复盘 3：AURA 极光综合评估指标</h2>
            </div>
            <div className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              AURA 总分: {report.auraScore.total} 分
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {report.auraScore.dimensions.map((dim) => (
              <div key={dim.key} className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-stone-900">{dim.key} ({dim.titleCN})</span>
                  <span className="text-emerald-600 font-extrabold text-base">{dim.score}分</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">{dim.evidence}</p>
                <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-200/60">
                  含指标: {dim.metricsIncluded.join(" / ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULE 4 & 5: AUDIENCE PENETRATION & WORD CLOUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MODULE 4: 核心人群渗透 */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">4</span>
              <h2 className="text-base font-bold text-stone-900">复盘 4：核心人群渗透 (投前 VS 投后)</h2>
            </div>

            <div className="space-y-3 text-xs">
              {report.audiencePenetration.map((ap, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between font-bold text-stone-800">
                    <span>{ap.segmentName}</span>
                    <span className="text-emerald-600">{ap.lift}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden flex">
                    <div style={{ width: `${ap.beforeRate}%` }} className="bg-stone-400 h-full" title={`投前 ${ap.beforeRate}%`} />
                    <div style={{ width: `${ap.afterRate - ap.beforeRate}%` }} className="bg-emerald-500 h-full" title={`投后增量`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>投前覆盖: {ap.beforeRate}%</span>
                    <span className="font-bold text-stone-800">投后提升至: {ap.afterRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODULE 5: 用户讨论词云 */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">5</span>
              <h2 className="text-base font-bold text-stone-900">复盘 5：用户讨论词云 (投前后对比)</h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {report.wordsBeforeAfter.map((w, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 border transition-all ${
                    w.tag === "new"
                      ? "bg-red-50 text-red-900 border-red-300 shadow-sm"
                      : w.tag === "grow"
                      ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                      : w.tag === "gone"
                      ? "bg-stone-100 text-stone-400 border-stone-200 line-through"
                      : "bg-blue-50 text-blue-900 border-blue-200"
                  }`}
                >
                  <span>{w.text}</span>
                  {w.tag === "new" && (
                    <span className="text-[9px] font-extrabold px-1 bg-red-600 text-white rounded">
                      NEW 爆火
                    </span>
                  )}
                  {w.tag === "grow" && (
                    <span className="text-[9px] font-extrabold px-1 bg-emerald-600 text-white rounded">
                      GROW 暴涨
                    </span>
                  )}
                  {w.tag === "gone" && (
                    <span className="text-[9px] font-medium px-1 bg-stone-200 text-stone-500 rounded no-underline">
                      GONE 消失
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODULE 6: 搜索指数 + 内容阅读指数 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">6</span>
            <h2 className="text-base font-bold text-stone-900">复盘 6：搜索指数 + 内容阅读指数时间序列</h2>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.trendTimeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="searchIndex" name="搜索指数" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="readingIndex" name="阅读指数" stroke="#0284c7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* MODULE 7: 内容分层 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">7</span>
            <h2 className="text-base font-bold text-stone-900">复盘 7：内容分层 (Content Tiering)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {report.contentTiers.map((ct, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2">
                <div className="flex justify-between font-bold text-stone-900 border-b border-stone-200 pb-2">
                  <span className="text-sm">{ct.tierName}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">{ct.verdict}</span>
                </div>
                <div>笔记发布数: <strong>{ct.volume} 篇</strong></div>
                <div>互动贡献: <strong>{ct.engagement.toLocaleString()} 次</strong></div>
                <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/60">
                  代表爆款: {ct.keyNotes.join(" / ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULE 8: 归因路径 */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">8</span>
            <h2 className="text-base font-bold text-stone-900">复盘 8：全链路归因路径 (Attribution Path)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            {report.attributionPath.map((ap) => (
              <div key={ap.step} className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                <div className="text-[10px] text-stone-400 font-bold">STEP {ap.step}</div>
                <div className="font-extrabold text-stone-900 text-sm">{ap.name}</div>
                <div className="text-emerald-600 font-bold">{ap.volume.toLocaleString()} 次</div>
                <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-200">
                  转化: {ap.conversionRate} ({ap.method})
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULE 9: 下轮合作建议 */}
        <section className="bg-stone-900 text-white rounded-2xl p-6 space-y-6 shadow-xl border border-stone-800">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
            <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">9</span>
            <h2 className="text-base font-bold text-white">复盘 9：下轮招商与续约建议指南</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
              <strong className="text-emerald-400 font-bold block text-sm">✓ 继续保留 (Continue)</strong>
              <ul className="list-disc list-inside text-stone-300 space-y-1 text-[11px]">
                {report.nextRoundRecommendations.continueDo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
              <strong className="text-amber-400 font-bold block text-sm">✕ 停止执行 (Stop)</strong>
              <ul className="list-disc list-inside text-stone-300 space-y-1 text-[11px]">
                {report.nextRoundRecommendations.stopDo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
              <strong className="text-blue-400 font-bold block text-sm">↑ 扩大规模 (Scale Up)</strong>
              <ul className="list-disc list-inside text-stone-300 space-y-1 text-[11px]">
                {report.nextRoundRecommendations.scaleUp.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2">
              <strong className="text-purple-400 font-bold block text-sm">? 待验证 (Validate)</strong>
              <ul className="list-disc list-inside text-stone-300 space-y-1 text-[11px]">
                {report.nextRoundRecommendations.validateNext.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-red-600/20 border border-red-500/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-300 block">推荐下一轮续约 IP 与预算：</span>
              <span className="text-sm font-black text-white">
                推荐 IP: {report.nextRoundRecommendations.recommendedNextIP} • 推荐预算: {report.nextRoundRecommendations.recommendedBudget}
              </span>
            </div>

            {onSaveReportAsCase && (
              <button
                onClick={onSaveReportAsCase}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-500 transition-colors shrink-0 shadow-md"
              >
                将复盘一键沉淀为【案例资产库】
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
