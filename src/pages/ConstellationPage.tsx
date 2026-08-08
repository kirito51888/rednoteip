import React, { useState } from "react";
import { EventIP, IndustryType } from "../types";
import { DEFAULT_IPS } from "../config/modelConfig";
import { Sparkles, Calendar, Users, Eye, Layers, Tag, Edit3, Award, ArrowRight } from "lucide-react";

interface Props {
  ips?: EventIP[];
  onSelectIpForDiagnosis?: (ipId: string) => void;
  onNavigateToPulse?: (industry: IndustryType) => void;
}

export const ConstellationPage: React.FC<Props> = ({
  ips = DEFAULT_IPS,
  onSelectIpForDiagnosis,
  onNavigateToPulse,
}) => {
  const [ipList, setIpList] = useState<EventIP[]>(ips);

  const handleUpdateOneline = (ipId: string, val: string) => {
    setIpList((prev) =>
      prev.map((ip) => (ip.id === ipId ? { ...ip, oneline: val, tagline: val } : ip))
    );
  };

  const industries: IndustryType[] = ["美妆个护", "医疗医美", "日化家清", "服饰鞋包"];

  return (
    <div className="space-y-6">
      {/* Module Eyebrow & Title */}
      <div className="space-y-1">
        <span className="font-mono text-[10.5px] tracking-widest text-[#7C8B88] uppercase block">
          MODULE 00 · CONSTELLATION
        </span>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-serif-custom text-2xl font-bold tracking-wide text-[#16211F]">
            IP 星图
          </h2>
          <span className="seal-badge seal-badge-cal">最新官方档案 (2026)</span>
        </div>
        <p className="text-xs text-[#42524F] max-w-4xl leading-relaxed">
          平台四大核心大事件 IP 的基础档案、一句话目标与核心动作规划。卡片中虚线标注区域可直接点击改写，修改后实时参与模型匹配计算。
        </p>
      </div>

      {/* Notice Banner */}
      <div className="border-l-4 border-[#1F5C56] bg-[#E8F0EE] p-3 text-xs text-[#16211F] font-medium rounded-r flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E8384F] animate-pulse"></span>
          <span>已同步小红书大事件四大核心赛道：<strong>REDGALA (社会营销)</strong> · <strong>夜人节 (情绪营销)</strong> · <strong>小美说 (场景营销)</strong> · <strong>慢人节 (情绪营销)</strong></span>
        </div>
        <span className="font-mono text-[11px] text-[#7C8B88]">时间更新完成</span>
      </div>

      {/* IP Cards Grid: 2x2 Layout (上2下2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ipList.map((ip) => {
          const color = ip.color || "#1F5C56";
          return (
            <div
              key={ip.id}
              className="bg-white rounded-none border border-[#D6DCD9] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Card Header with Theme Color Accent */}
              <div
                className="p-5 border-b border-[#E6EAE7] relative space-y-3"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif-custom text-xl font-bold text-[#16211F] tracking-wide">
                        {ip.name}
                      </h3>
                      {ip.categoryType && (
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-[#16211F] text-white font-mono">
                          {ip.categoryType}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10.5px] text-[#7C8B88] tracking-widest uppercase mt-0.5">
                      {ip.en || ip.id}
                    </div>
                  </div>
                </div>

                {/* One Line Goal */}
                {ip.oneLineGoal && (
                  <div className="bg-[#F7F8F6] p-2.5 border-l-2 border-[#16211F] text-xs text-[#16211F] font-medium leading-relaxed">
                    <span className="font-bold text-[#E8384F] block text-[10px] font-mono uppercase mb-0.5">
                      🎯 一句话目标
                    </span>
                    {ip.oneLineGoal}
                  </div>
                )}

                <div className="group relative">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleUpdateOneline(ip.id, e.currentTarget.textContent || "")}
                    className="text-xs text-[#42524F] leading-relaxed p-1.5 rounded border border-dashed border-transparent hover:border-[#E8A33D] hover:bg-[#FBF0DC] cursor-text focus:outline-none focus:bg-white focus:border-[#1F5C56] transition-all"
                  >
                    {ip.oneline || ip.tagline}
                  </p>
                  <span className="text-[10px] text-[#7C8B88] opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 bottom-1 pointer-events-none">
                    ✏️ 点击编辑改写
                  </span>
                </div>
              </div>

              {/* Card Body Key-Value Attributes */}
              <div className="p-5 space-y-3.5 text-xs text-[#16211F] flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-dotted border-[#D6DCD9]">
                  <div>
                    <span className="text-[#7C8B88] block text-[11px] font-mono">档期/时间</span>
                    <span className="font-bold text-[#16211F] text-xs">{ip.cooperationWindow}</span>
                  </div>
                  <div>
                    <span className="text-[#7C8B88] block text-[11px] font-mono">量级规模</span>
                    <span className="font-bold text-[#E8384F] text-xs">{ip.reachDemo || ip.audienceSize}</span>
                  </div>
                </div>

                {/* Core Actions section if available */}
                {ip.coreActions && ip.coreActions.length > 0 && (
                  <div className="space-y-2 border-b border-dotted border-[#D6DCD9] pb-3">
                    <span className="text-[#16211F] block text-[11.5px] font-bold font-mono">
                      ⚡ 核心动作与策略升级
                    </span>
                    <div className="space-y-1.5">
                      {ip.coreActions.map((act, idx) => (
                        <div key={idx} className="bg-[#F7F8F6] p-2 border border-[#E6EAE7] rounded-sm text-[11.5px]">
                          <span className="font-bold text-[#1F5C56] block text-[11px]">
                            • {act.title}
                          </span>
                          <p className="text-[#42524F] text-[11px] mt-0.5 leading-tight">
                            {act.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TA Tags */}
                <div>
                  <span className="text-[#7C8B88] block text-[11px] font-mono mb-1">核心人群</span>
                  <div className="flex flex-wrap gap-1">
                    {(ip.ta || ip.targetAudience.split("、")).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#F7F8F6] text-[#42524F] text-[11.5px] border border-[#D6DCD9] rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Tone */}
                <div>
                  <span className="text-[#7C8B88] block text-[11px] font-mono mb-1">内容基因与词云</span>
                  <div className="flex flex-wrap gap-1">
                    {(ip.gene || ip.keyAssets).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#F7F8F6] text-[#42524F] text-[11px] border border-[#E6EAE7] rounded-sm font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Resource Slots */}
                <div>
                  <span className="text-[#7C8B88] block text-[11px] font-mono mb-1">可售权益资源</span>
                  <p className="text-[11.5px] text-[#42524F] leading-relaxed bg-[#F7F8F6] p-2 border border-[#E6EAE7]">
                    {(ip.slots || ip.keyAssets).join(" · ")}
                  </p>
                </div>
              </div>

              {/* Category Fit Matrix Bar Footer */}
              <div className="bg-[#F7F8F6] p-4 border-t border-[#E6EAE7] space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#7C8B88] font-mono">品类承载力系数 (FIT SCORE)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {industries.map((ind) => {
                    const score = ip.fit ? ip.fit[ind] || 70 : ip.fitWeights[ind] || 70;
                    const isHigh = score >= 85;
                    return (
                      <button
                        key={ind}
                        onClick={() => onNavigateToPulse && onNavigateToPulse(ind)}
                        className={`p-1.5 border text-[11.5px] transition-all hover:border-[#1F5C56] ${
                          isHigh
                            ? "bg-[#DCE9E6] text-[#1F5C56] border-[#2F7D74] font-bold"
                            : "bg-white text-[#42524F] border-[#D6DCD9]"
                        }`}
                      >
                        <span className="block text-[10px] text-[#7C8B88]">{ind}</span>
                        <span className="font-mono text-xs font-bold">{score}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

