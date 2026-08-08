import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="text-red-500">RED EVENT MATCH</span>
              <span>小红书大事件 IP 招商顾问</span>
            </div>
            <p className="text-stone-500 text-xs">
              助力 CBD 与营销策划构建“从市场信号，到共创方案，再到可证明的合作价值”全流程决策闭环。
            </p>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>灵犀 Adapter 数据模型</span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-4 h-4 text-amber-500" />
              <span>AI 输出需业务人工确认</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
          <div>
            © 2026 小红书商业化团队 (Internal Advisor Prototype) | 适配 IP: 夜人节 / 小美说 / REDGALA / 慢人节
          </div>
          <div className="flex gap-4 text-stone-400">
            <span>隐私与数据边界</span>
            <span>•</span>
            <span>合规免责声明</span>
            <span>•</span>
            <span>V2.4 稳定版</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
