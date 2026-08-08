import React, { useState } from "react";
import { CaseStudy, IndustryType } from "../types";
import {
  BookOpen,
  Search,
  Filter,
  Sparkles,
  Tag,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
  Download,
  Flame,
  Layers,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  FolderPlus,
} from "lucide-react";

interface Props {
  cases: CaseStudy[];
  onSelectCaseForSpark?: (brandName: string, ipName: string) => void;
}

export const CasesPage: React.FC<Props> = ({ cases, onSelectCaseForSpark }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("全部行业");
  const [selectedIp, setSelectedIp] = useState<string>("全部IP");
  const [selectedBudget, setSelectedBudget] = useState<string>("全部预算");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudy | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const filteredCases = cases.filter((c) => {
    if (selectedIndustry !== "全部行业" && c.industry !== selectedIndustry) return false;
    if (selectedIp !== "全部IP" && c.ipName !== selectedIp) return false;
    if (selectedBudget !== "全部预算" && c.budgetTier !== selectedBudget) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchBrand = c.brandName.toLowerCase().includes(q);
      const matchIdea = c.creativeBigIdea.toLowerCase().includes(q);
      const matchTags = c.reusableTags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchBrand || matchIdea || matchTags;
    }
    return true;
  });

  const handleCopyCase = (c: CaseStudy) => {
    const text = `【小红书大事件招商标杆案例】\n标题：${c.title}\n品牌：${c.brandName} (${c.industry}) | IP：${c.ipName} | 预算：${c.budgetTier}\n核心Big Idea：${c.creativeBigIdea}\n策略：${c.strategy}\n亮点：${c.executionHighlights.join("；")}\n成果：${Object.entries(c.results).map(([k,v]) => `${k}:${v}`).join(" | ")}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl border border-stone-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>案例资产库 • 标杆复盘与沉淀</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">小红书大事件标杆案例资产库</h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
          收录历史大事件真实与标杆共创案例，提取可复用的策略打法、亮点与坑点经验，为新品牌招商提供沉淀参照。
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="sm:col-span-5 relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索案例标题、品牌、Big Idea 或标签..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Industry Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs border border-stone-300 rounded-xl p-2 bg-stone-50 focus:outline-none"
            >
              <option value="全部行业">全部行业</option>
              <option value="汽车出行">汽车出行</option>
              <option value="美妆个护">美妆个护</option>
              <option value="医疗医美">医疗医美</option>
              <option value="日化家清">日化家清</option>
              <option value="服饰鞋包">服饰鞋包</option>
            </select>
          </div>

          {/* IP Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedIp}
              onChange={(e) => setSelectedIp(e.target.value)}
              className="w-full text-xs border border-stone-300 rounded-xl p-2 bg-stone-50 focus:outline-none"
            >
              <option value="全部IP">全部 IP</option>
              <option value="REDGALA">REDGALA</option>
              <option value="夜人节">夜人节</option>
              <option value="小美说">小美说</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full text-xs border border-stone-300 rounded-xl p-2 bg-stone-50 focus:outline-none"
            >
              <option value="全部预算">全部预算档位</option>
              <option value="150w">150w 级 (基础型)</option>
              <option value="200w">200w 级 (推荐型)</option>
              <option value="250w">250w 级 (旗舰型)</option>
            </select>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pt-1 border-t border-stone-100">
          <span className="text-stone-400 text-[11px] font-medium shrink-0">热门标签:</span>
          {["夜间救急", "白皮书", "线下沉浸舱", "高爆UGC", "红利引爆"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] transition-colors shrink-0"
            >
              #{tag}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-red-600 font-bold hover:underline text-[11px] ml-auto"
            >
              清空搜索
            </button>
          )}
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-stone-200 hover:border-red-400 hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-100">
                  {c.ipName} × {c.brandName}
                </span>
                <span className="text-stone-500 font-semibold text-xs">{c.budgetTier}</span>
              </div>

              <h3 className="font-bold text-stone-900 text-base leading-snug">
                {c.title}
              </h3>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[10px] text-stone-400 font-medium block">核心 Big Idea:</span>
                <p className="text-xs text-stone-800 font-bold line-clamp-2">
                  “{c.creativeBigIdea}”
                </p>
              </div>

              <div className="space-y-1 text-xs text-stone-600">
                <div><strong className="text-stone-800">营销背景:</strong> {c.background}</div>
                <div><strong className="text-stone-800">人群洞察:</strong> {c.insight}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {c.reusableTags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setActiveCaseModal(c)}
                className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                查看完整案例拆解
              </button>

              {onSelectCaseForSpark && (
                <button
                  onClick={() => onSelectCaseForSpark(c.brandName, c.ipName)}
                  className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                >
                  套用此策略 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-2">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="font-bold text-stone-700">未找到符合条件的案例资产</p>
          <p className="text-xs">尝试切换行业或清空筛选条件</p>
        </div>
      )}

      {/* Case Detail Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6 border border-stone-200">
            <button
              onClick={() => setActiveCaseModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg">
                IP
              </div>
              <div>
                <span className="text-xs text-red-600 font-bold">{activeCaseModal.industry} • {activeCaseModal.ipName}</span>
                <h2 className="text-xl font-black text-stone-900">{activeCaseModal.title}</h2>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="font-bold text-stone-900 text-sm">一句话 Big Idea：</div>
              <p className="text-stone-800 text-sm font-black">“{activeCaseModal.creativeBigIdea}”</p>
              <div className="text-stone-500 pt-2 border-t border-stone-200 flex justify-between">
                <span>合作深度: {activeCaseModal.cooperationDepth}</span>
                <span>预算档位: {activeCaseModal.budgetTier}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <strong className="text-stone-900 block">人群洞察:</strong>
                <p className="text-stone-700">{activeCaseModal.insight}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <strong className="text-stone-900 block">共创策略:</strong>
                <p className="text-stone-700">{activeCaseModal.strategy}</p>
              </div>
            </div>

            {/* Execution Highlights */}
            <div className="space-y-2 text-xs">
              <strong className="text-stone-900 block text-sm font-bold">执行亮点 (Highlights)：</strong>
              <ul className="list-disc list-inside space-y-1 text-stone-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                {activeCaseModal.executionHighlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </div>

            {/* Wins & Failures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <strong className="text-emerald-800 block font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  经验成功点 (Wins)：
                </strong>
                <ul className="list-disc list-inside space-y-1 text-emerald-900">
                  {activeCaseModal.wins.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <strong className="text-amber-800 block font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  避坑指南与踩坑经验 (Failures)：
                </strong>
                <ul className="list-disc list-inside space-y-1 text-amber-900">
                  {activeCaseModal.failures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-stone-900 text-white rounded-xl text-xs space-y-1">
              <strong className="text-red-400 block font-bold">CBD 下轮推介建议：</strong>
              <p className="text-stone-300">{activeCaseModal.nextAdvice}</p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => handleCopyCase(activeCaseModal)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4 text-stone-600" />
                <span>{copySuccess ? "已复制到剪贴板！" : "复制案例摘要"}</span>
              </button>

              <button
                onClick={() => setActiveCaseModal(null)}
                className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
