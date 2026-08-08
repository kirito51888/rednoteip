import React from "react";
import { DataProvenance } from "../../types";
import { Info, ShieldCheck, AlertTriangle } from "lucide-react";

interface Props {
  provenance?: DataProvenance;
  compact?: boolean;
}

export const DataProvenanceBadge: React.FC<Props> = ({ provenance, compact }) => {
  if (!provenance) return null;
  const sourceStr = provenance.source || "";
  const isMock = sourceStr.includes("演示") || sourceStr.includes("Mock");

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
          isMock
            ? "bg-amber-100 text-amber-800 border border-amber-300"
            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
        }`}
        title={`数据源: ${provenance.source} | 口径: ${provenance.scope} | 更新于: ${provenance.updatedAt}`}
      >
        {isMock ? <AlertTriangle className="w-3 h-3 text-amber-600" /> : <ShieldCheck className="w-3 h-3 text-emerald-600" />}
        <span>{isMock ? "演示数据" : "授权数据"}</span>
      </span>
    );
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs text-stone-600 space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-semibold text-stone-800">
          <Info className="w-4 h-4 text-stone-500" />
          <span>数据透明度与存证卡片</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            isMock ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {isMock ? "⚠️ 演示模拟数据" : "✓ 官方授权/API"}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-600">
        <div>
          <span className="text-stone-400 block">数据来源</span>
          <span className="font-medium text-stone-700">{provenance.source}</span>
        </div>
        <div>
          <span className="text-stone-400 block">统计时间范围</span>
          <span className="font-medium text-stone-700">{provenance.timeRange}</span>
        </div>
        <div>
          <span className="text-stone-400 block">数据口径/范围</span>
          <span className="font-medium text-stone-700">{provenance.scope}</span>
        </div>
        <div>
          <span className="text-stone-400 block">样本/置信度</span>
          <span className="font-medium text-stone-700">
            {provenance.sampleSize || "N/A"} ({provenance.confidence} 置信)
          </span>
        </div>
      </div>
    </div>
  );
};
