import React, { useState } from "react";
import { Search, Menu, PlusCircle, Sparkles, Database, Compass, Flame, BarChart3, BookOpen, SlidersHorizontal, Settings } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

interface TopHeaderProps {
  activeTab: string;
  onSearchBrand: (query: string) => void;
  onNewBrandDiagnosis: () => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onSearchBrand,
  onNewBrandDiagnosis,
  demoMode,
  setDemoMode,
  onOpenMobileSidebar,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchBrand(searchInput.trim());
    }
  };

  const currentNav = NAV_ITEMS.find((n) => n.id === activeTab) || NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-30 bg-[#FAFBF9]/90 backdrop-blur-md border-b border-[#E2E7E4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] header-top-rule transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle & Current Section Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg bg-white text-[#16211F] border border-[#E2E7E4] hover:bg-[#EEF0EC] transition-colors"
            aria-label="打开侧边栏"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#E8384F] font-bold tracking-widest uppercase px-2 py-0.5 bg-red-50 border border-red-200/80 rounded-md">
                MODULE {currentNav.idx}
              </span>
              <h2 className="font-serif-custom font-bold text-lg text-[#16211F]">
                {currentNav.label}
              </h2>
            </div>
            <p className="text-[11px] text-[#7C8B88] font-mono hidden sm:block">
              {currentNav.sub}
            </p>
          </div>
        </div>

        {/* Middle: Global Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md min-w-[220px]">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#7C8B88] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索品牌或行业 (例如: 一汽奥迪, Dior 迪奥, 汽车)..."
              className="w-full bg-white text-[#16211F] text-xs rounded-lg pl-9 pr-20 py-2 border border-[#E2E7E4] focus:outline-none focus:ring-2 focus:ring-[#1F5C56]/20 focus:border-[#1F5C56] transition-all placeholder:text-[#7C8B88] shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-[#16211F] text-white text-[11px] font-medium rounded-md hover:bg-[#1F5C56] transition-colors"
            >
              诊断品牌
            </button>
          </div>
        </form>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <div
            onClick={() => setDemoMode(!demoMode)}
            className="flex items-center gap-2 border border-[#E2E7E4] bg-white px-2.5 py-1.5 rounded-lg text-xs text-[#42524F] cursor-pointer hover:bg-[#EEF0EC] transition-all shadow-2xs"
            title="点击切换真实数据/演示模拟数据"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                demoMode ? "bg-[#E8A33D]" : "bg-[#2F7D74]"
              }`}
            />
            <span className="font-medium text-[11px]">
              {demoMode ? "演示模式" : "LIVE 接入"}
            </span>
          </div>

          <button
            onClick={onNewBrandDiagnosis}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#E8384F] text-white rounded-lg text-xs font-semibold hover:bg-[#B8202F] active:scale-[0.98] transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>新建诊断</span>
          </button>
        </div>
      </div>
    </header>
  );
};
