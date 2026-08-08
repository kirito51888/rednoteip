import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#42524F] text-xs py-8 border-t border-[#D6DCD9] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E6EAE7] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-serif-custom font-bold text-sm text-[#16211F]">
              <span className="text-[#E8384F] font-mono">RED COMPASS</span>
              <span>红罗盘 （RED Compass）</span>
            </div>
            <p className="text-[#7C8B88] text-xs font-mono max-w-3xl leading-relaxed">
              基于小红书大事件 IP 历史合作数据与用户画像模型，一端为 CBD 提供“品牌×IP”合作价值量化评估，一端为营销策划提供创意灵感与执行参考。
            </p>
          </div>
          <div className="flex items-center gap-4 text-[#42524F] text-xs font-mono">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#1F5C56]" />
              <span>灵犀 Adapter 数据模型</span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-4 h-4 text-[#E8A33D]" />
              <span>AI 输出需业务人工确认</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#7C8B88] font-mono">
          <div>
            © 2026 小红书商业化团队 (Internal Advisor Prototype) | 适配 IP: REDGALA (社会营销) / 夜人节 (情绪营销) / 小美说 (场景营销)
          </div>
          <div className="flex gap-3 text-[#7C8B88]">
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
