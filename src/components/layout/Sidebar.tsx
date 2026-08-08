import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  BarChart3,
  BookOpen,
  SlidersHorizontal,
  Settings,
  Database,
  Flame,
  PlusCircle,
  Menu,
  X,
  ChevronRight,
  Sparkle,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onNewBrandDiagnosis: () => void;
  isOpenMobile?: boolean;
  setIsOpenMobile?: (open: boolean) => void;
}

export const NAV_ITEMS = [
  { id: "dashboard", idx: "00", label: "工作台", sub: "DASHBOARD", icon: Flame },
  { id: "constellation", idx: "01", label: "IP 星图", sub: "CONSTELLATION", icon: Database },
  { id: "pulse", idx: "02", label: "望势", sub: "赛道势能罗盘", icon: Compass },
  { id: "spark", idx: "03", label: "谋局", sub: "品牌机会引擎", icon: Sparkles },
  { id: "echo", idx: "04", label: "验效", sub: "价值回声舱", icon: BarChart3 },
  { id: "cases", idx: "05", label: "案例资产库", sub: "CASES", icon: BookOpen },
  { id: "methodology", idx: "06", label: "模型说明", sub: "METHODOLOGY", icon: SlidersHorizontal },
  { id: "settings", idx: "07", label: "弹药库", sub: "ARSENAL / SETTINGS", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  demoMode,
  setDemoMode,
  onNewBrandDiagnosis,
  isOpenMobile = false,
  setIsOpenMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#FAFBF9] border-r border-[#E2E7E4] shadow-[4px_0_20px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 select-none ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-4 sm:p-5 border-b border-[#E6EAE7] bg-white/60">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setActiveTab("dashboard");
                if (setIsOpenMobile) setIsOpenMobile(false);
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-[#E8384F] text-white flex items-center justify-center font-black text-xl tracking-wider shadow-sm font-serif-custom shrink-0 group-hover:scale-105 transition-transform">
                红
              </div>
              <div>
                <h1 className="font-serif-custom font-bold text-base tracking-wide text-[#16211F] leading-tight group-hover:text-[#E8384F] transition-colors">
                  红罗盘
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-bold text-[#E8384F] tracking-wide font-mono">
                    RED Compass
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-50 text-[#E8384F] border border-red-200 font-mono font-bold">
                    PRO
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            {setIsOpenMobile && (
              <button
                onClick={() => setIsOpenMobile(false)}
                className="lg:hidden p-1.5 rounded-lg text-[#7C8B88] hover:bg-[#EEF0EC] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <p className="text-[10.5px] text-[#7C8B88] font-mono mt-2.5 leading-relaxed border-t border-dotted border-[#D6DCD9] pt-2 flex items-center gap-1">
            <Sparkle className="w-3 h-3 text-[#E8384F] shrink-0" />
            <span>招商靠数据 · 策划有支撑</span>
          </p>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin">
          <div className="px-2 pb-1 text-[10px] font-mono text-[#7C8B88] tracking-widest uppercase flex items-center justify-between">
            <span>导航模块</span>
            <span className="text-[9px] bg-[#EEF0EC] px-1.5 py-0.5 rounded text-[#42524F]">8 个功能</span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setIsOpenMobile) setIsOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                  isActive
                    ? "bg-white text-[#E8384F] font-bold shadow-[0_2px_10px_rgba(232,56,79,0.08)] border border-[#E8384F]/20 translate-x-0.5"
                    : "text-[#16211F] hover:bg-[#EEF0EC]/70 hover:text-[#1F5C56] hover:translate-x-1"
                }`}
              >
                {/* Active Indicator Accent Line */}
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-[#E8384F] rounded-r-full" />
                )}

                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-red-50 text-[#E8384F]"
                        : "bg-[#F0F2EE] text-[#7C8B88] group-hover:bg-[#DCE9E6] group-hover:text-[#1F5C56]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#7C8B88] tracking-wider shrink-0">
                        {item.idx}
                      </span>
                      <span className="font-serif-custom text-sm tracking-wide truncate">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#7C8B88] tracking-widest uppercase block truncate">
                      {item.sub}
                    </span>
                  </div>
                </div>

                {isActive ? (
                  <ChevronRight className="w-4 h-4 text-[#E8384F] shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-[#7C8B88]/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Sidebar Action & Data Mode */}
        <div className="p-3 border-t border-[#E6EAE7] bg-white/80 space-y-2">
          {/* New Diagnosis Button */}
          <button
            onClick={() => {
              onNewBrandDiagnosis();
              if (setIsOpenMobile) setIsOpenMobile(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#E8384F] text-white rounded-lg text-xs font-semibold hover:bg-[#B8202F] active:scale-[0.98] transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>新建品牌诊断</span>
          </button>

          {/* Data Source Toggle Button */}
          <div
            onClick={() => setDemoMode(!demoMode)}
            className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] text-xs text-[#42524F] cursor-pointer hover:bg-[#EEF0EC] transition-all select-none"
            title="点击切换真实数据/演示模拟数据"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  demoMode ? "bg-[#E8A33D]" : "bg-[#2F7D74]"
                }`}
              />
              <span className="text-[11px] font-mono">
                数据源: <b>{demoMode ? "内置示例" : "LIVE已接入"}</b>
              </span>
            </div>
            <span className="text-[10px] text-[#7C8B88] underline hover:text-[#16211F]">切换</span>
          </div>

          <div className="text-[10px] text-center text-[#7C8B88] font-mono pt-0.5">
            V2.4 · 灵犀数据引擎
          </div>
        </div>
      </aside>
    </>
  );
};
