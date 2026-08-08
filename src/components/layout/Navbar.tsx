import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  BarChart3,
  BookOpen,
  SlidersHorizontal,
  Settings,
  Search,
  PlusCircle,
  Database,
  Flame,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchBrand: (query: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onNewBrandDiagnosis: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onSearchBrand,
  demoMode,
  setDemoMode,
  onNewBrandDiagnosis,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchBrand(searchInput.trim());
    }
  };

  const navItems = [
    { id: "dashboard", label: "工作台", icon: Flame },
    { id: "pulse", label: "PULSE｜机会雷达", icon: Compass },
    { id: "spark", label: "SPARK｜共创策略", icon: Sparkles },
    { id: "echo", label: "ECHO｜价值复盘", icon: BarChart3 },
    { id: "cases", label: "案例资产库", icon: BookOpen },
    { id: "methodology", label: "数据与模型说明", icon: SlidersHorizontal },
    { id: "settings", label: "设置", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-800 shadow-lg">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab("dashboard")}
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-lg tracking-wider shadow-md">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wide text-white">
                RED EVENT MATCH
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-red-600/20 text-red-400 font-bold border border-red-500/30">
                大事件 IP 招商顾问
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden md:block">
              从市场信号，到共创方案，再到可证明的合作价值。
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-2 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="输入品牌名称/行业 (例如: 珀莱雅, 观夏, 美妆)..."
              className="w-full bg-stone-800/80 text-white text-xs rounded-full pl-9 pr-20 py-2 border border-stone-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-stone-500"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-red-600 text-white text-[11px] font-medium rounded-full hover:bg-red-500 transition-colors"
            >
              诊断品牌
            </button>
          </div>
        </form>

        {/* Action Controls & Demo Mode Badge */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Toggle Badge */}
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
              demoMode
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
            }`}
            title="点击切换真实数据/演示模拟数据"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{demoMode ? "演示数据模式" : "真实数据接入"}</span>
          </button>

          {/* Fast Action */}
          <button
            onClick={onNewBrandDiagnosis}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-500 transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">新建品牌诊断</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-stone-950/60 border-t border-stone-800/60 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-stone-800 text-white font-bold border border-stone-700 shadow-inner"
                    : "text-stone-400 hover:text-white hover:bg-stone-900/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-red-500" : "text-stone-500"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
