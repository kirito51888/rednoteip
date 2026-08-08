import React from "react";
import { DimensionBreakdown, RiskGate } from "../../types";
import { X, HelpCircle, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  totalScore: number;
  confidence: "High" | "Medium" | "Low";
  dimensions: DimensionBreakdown[];
  verdict?: string;
  deductions?: string[];
  verificationQuestions?: string[];
  riskGates?: RiskGate[];
}

export const ScoreExplanationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  totalScore,
  confidence,
  dimensions,
  verdict,
  deductions = [],
  verificationQuestions = [],
  riskGates = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-2xl border border-red-100">
            {totalScore}
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">{title} - 评分推理与解释</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
              <span>置信度: <strong className="text-stone-800">{confidence}</strong></span>
              <span>•</span>
              <span>模型可解释架构 Version 2.4</span>
            </div>
          </div>
        </div>

        {verdict && (
          <div className="bg-stone-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-5 text-stone-700 text-sm">
            <span className="font-semibold text-stone-900 block mb-0.5">模型综合一句话判断：</span>
            {verdict}
          </div>
        )}

        {/* Dimension Breakdown Table */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-red-600" />
            指标权重与扣分明细表 (点击展开公式)
          </h3>
          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-600 uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">评估维度</th>
                  <th className="py-2.5 px-3">权重</th>
                  <th className="py-2.5 px-3">得分</th>
                  <th className="py-2.5 px-3">加权得分</th>
                  <th className="py-2.5 px-3">原始依据 / 数据源</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {dimensions.map((dim) => {
                  const weighted = Math.round(dim.score * dim.weight * 10) / 10;
                  return (
                    <tr key={dim.key} className="hover:bg-stone-50/80">
                      <td className="py-2.5 px-3 font-semibold text-stone-800">{dim.name}</td>
                      <td className="py-2.5 px-3 text-stone-500">{(dim.weight * 100).toFixed(0)}%</td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{dim.score}</td>
                      <td className="py-2.5 px-3 font-bold text-red-600">+{weighted}</td>
                      <td className="py-2.5 px-3 text-stone-600">
                        <div>{dim.rawData}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">源: {dim.dataSource}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Gates if present */}
        {riskGates.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              独立风险闸门 (不直接折算入分数的硬性排查)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {riskGates.map((rg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border text-xs ${
                    rg.passed
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                      : "bg-red-50/50 border-red-200 text-red-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span>{rg.category}</span>
                    {rg.passed ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 已通过
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" /> 存在风险 ({rg.severity})
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 text-[11px]">{rg.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deductions & Verification Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {deductions.length > 0 && (
            <div className="bg-red-50/60 border border-red-100 rounded-xl p-3">
              <span className="font-bold text-red-800 block mb-1">扣分项 / 扣分依据：</span>
              <ul className="list-disc list-inside space-y-1 text-stone-700">
                {deductions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {verificationQuestions.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3">
              <span className="font-bold text-amber-800 block mb-1">待业务人员验证的问题：</span>
              <ul className="list-disc list-inside space-y-1 text-stone-700">
                {verificationQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            确认并关闭
          </button>
        </div>
      </div>
    </div>
  );
};
