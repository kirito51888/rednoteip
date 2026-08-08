import React from "react";
import { Brand, EventIP, CaseStudy, ReviewReport } from "../types";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  FolderUp,
  BarChart2,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Zap,
  Users,
  Calendar,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { DataProvenanceBadge } from "../components/common/DataProvenanceBadge";

interface Props {
  onNavigate: (tab: string, extra?: any) => void;
  brands: Brand[];
  ips: EventIP[];
  cases: CaseStudy[];
  reviewReport: ReviewReport;
  onSelectBrand: (brandName: string) => void;
}

export const DashboardPage: React.FC<Props> = ({
  onNavigate,
  brands,
  ips,
  cases,
  reviewReport,
  onSelectBrand,
}) => {
  const [quickQuery, setQuickQuery] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onSelectBrand(quickQuery.trim());
      onNavigate("spark");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Cockpit Section */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-stone-800">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 mb-2">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>小红书大事件 IP 招商与策划决策平台</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                红罗盘 （RED Compass）
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-3xl leading-relaxed">
                基于小红书大事件 IP 的历史合作数据与用户画像模型，<strong className="text-white font-semibold">一端为 CBD 提供“品牌 × IP”合作价值的量化评估</strong>，<strong className="text-white font-semibold">一端为营销策划提供创意灵感与执行参考</strong>，让招商决策从“凭经验”升级为“靠数据”，让方案创作从“空想灵感”升级为“数据支撑的灵感”。
              </p>
            </div>

            {/* Data Source Ratio Indicator */}
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-3.5 text-xs text-stone-300 flex flex-col gap-2 min-w-[220px]">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>全局数据接入源占比</span>
                <span className="text-emerald-400 text-[11px] font-mono">100% 存证</span>
              </div>
              <div className="w-full bg-stone-700 rounded-full h-2 flex overflow-hidden">
                <div className="bg-emerald-500 h-full w-[60%]" title="灵犀授权 API (60%)" />
                <div className="bg-blue-500 h-full w-[25%]" title="内部文件上传 (25%)" />
                <div className="bg-amber-500 h-full w-[15%]" title="演示模拟数据 (15%)" />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 灵犀 60%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> 上传 25%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> 演示 15%
                </span>
              </div>
            </div>
          </div>

          {/* Large Hero Search & Fast Actions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="md:col-span-8 flex items-center bg-stone-950/80 border border-stone-700 rounded-2xl p-2 shadow-inner focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30 transition-all"
            >
              <Search className="w-5 h-5 text-stone-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="搜索品牌 (例如: 一汽奥迪, Dior 迪奥, 珀莱雅, 华熙生物) 或输入品类..."
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-stone-500 pr-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>立即诊断匹配</span>
              </button>
            </form>

            <div className="md:col-span-4 flex items-center justify-end gap-2">
              <button
                onClick={() => onNavigate("pulse")}
                className="flex-1 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl text-xs font-semibold border border-stone-700 transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span>扫描行业热度</span>
              </button>
              <button
                onClick={() => onNavigate("echo")}
                className="flex-1 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl text-xs font-semibold border border-stone-700 transition-all flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <span>导入投后复盘</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Opportunity Signals Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-stone-900">今日/本周招商机会信号</h2>
          </div>
          <span className="text-xs text-stone-500">更新时间: 2026-08-08 08:00 (灵犀平台实时推送)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => {
              onSelectBrand("一汽奥迪 FAW-Audi");
              onNavigate("spark");
            }}
            className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-md">
                新能源智驾 YoY +38%
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 group-hover:text-red-600 transition-colors">
                汽车出行 • 一汽奥迪 FAW-Audi
              </h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                双车格 PPE 纯电平台首发，匹配【小美说】‘城市双生计划’，完美契合都市精英，合作势能 95 分！
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <span>推荐切入点: 城市双生AB面生活方式</span>
              <span className="font-bold text-red-600">点击生成方案 →</span>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectBrand("Dior 迪奥");
              onNavigate("spark");
            }}
            className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-md">
                夜人节奢品独家
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 group-hover:text-red-600 transition-colors">
                美妆个护 • Dior 迪奥
              </h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                Rouge Dior On Stage Ink Blur 柔焦唇釉 × 夜人节 ‘今夜上妆即上场’，四城四店 HPP 联动，合作势能 94 分！
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <span>推荐切入点: 夜人节早鸟高点与1v1彩妆教室</span>
              <span className="font-bold text-red-600">点击生成方案 →</span>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectBrand("华熙生物 Bloomage");
              onNavigate("spark");
            }}
            className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">
                合规红利期
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 group-hover:text-red-600 transition-colors">
                医疗医美 • 华熙生物
              </h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                小红书‘轻医美术后修护’供需比达 1:3.8，亟需通过【小美说】官方专家白皮书建立安全信任。
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <span>推荐切入点: 医美科普白皮书</span>
              <span className="font-bold text-red-600">点击生成方案 →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Brand Pipeline */}
      <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">重点品牌招商 Pipeline (跟进队列)</h2>
            <p className="text-xs text-stone-500">
              包含品牌诊断分、建议推荐 IP、目前商务推进阶段与 CBD 下一步动作。
            </p>
          </div>
          <button
            onClick={() => onNavigate("pulse")}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            查看全部品牌机会 →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-bold">品牌名称 / 行业</th>
                <th className="py-3 px-4 font-bold">机会分 (Opportunity Score)</th>
                <th className="py-3 px-4 font-bold">适配推荐 IP</th>
                <th className="py-3 px-4 font-bold">跟进阶段</th>
                <th className="py-3 px-4 font-bold">CBD 负责人</th>
                <th className="py-3 px-4 font-bold">下一步动作</th>
                <th className="py-3 px-4 font-bold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    <div>{b.name}</div>
                    <div className="text-[11px] font-normal text-stone-500">{b.industry} • {b.subcategory}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-extrabold text-red-600 text-sm">
                      {b.opportunityScore.totalScore}
                      <span className="text-[10px] text-stone-400 font-normal">/ 100</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {b.recommendedIPs.map((ip) => (
                        <span key={ip} className="px-2 py-0.5 bg-red-50 text-red-700 text-[11px] font-medium rounded border border-red-100">
                          {ip}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 bg-amber-50 text-amber-800 text-[11px] font-medium rounded-full border border-amber-200">
                      意向沟通中
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 font-medium">张经理 (CBD)</td>
                  <td className="py-3.5 px-4 text-stone-600 text-[11px] max-w-xs truncate">
                    向 CMO 发送《一页纸推介》，确认 Q3 预算节点
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        onSelectBrand(b.name);
                        onNavigate("spark");
                      }}
                      className="px-3 py-1 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 text-[11px] transition-colors"
                    >
                      共创方案
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Major Event IPs Profile Overview Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">小红书四大重点大事件 IP 档案</h2>
            <p className="text-xs text-stone-500">点击可查看 IP 受众规模、精神内核与可配置合作权益。</p>
          </div>
          <button
            onClick={() => onNavigate("settings")}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
          >
            编辑/增加 IP 档案 →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ips.map((ip) => (
            <div
              key={ip.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 hover:border-red-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-stone-900 text-white text-xs font-extrabold rounded-lg">
                    {ip.name}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">{ip.cooperationWindow}</span>
                </div>
                <p className="text-xs font-bold text-stone-800 line-clamp-1">{ip.tagline}</p>
                <div className="text-[11px] text-stone-600 space-y-1">
                  <div><strong className="text-stone-700">受众规模:</strong> {ip.audienceSize}</div>
                  <div><strong className="text-stone-700">核心精神:</strong> {ip.spirit}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px]">历史曝光 20亿+</span>
                <button
                  onClick={() => onNavigate("pulse")}
                  className="text-red-600 font-bold hover:underline flex items-center gap-0.5 text-[11px]"
                >
                  匹配品牌 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Review & Case Studies */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ECHO Review Teaser */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-stone-900">最近完成的项目投后复盘 (ECHO)</h3>
            </div>
            <DataProvenanceBadge provenance={reviewReport.provenance} compact />
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 text-sm">{reviewReport.projectName}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                AURA 得分 {reviewReport.auraScore.total} 分
              </span>
            </div>
            <p className="text-xs text-stone-600 line-clamp-2">
              {reviewReport.overallSummary}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-center">
              <div>
                <span className="text-[10px] text-stone-400 block">全网总曝光</span>
                <span className="text-xs font-extrabold text-stone-900">8,200 万+</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">品牌搜索增量</span>
                <span className="text-xs font-extrabold text-emerald-600">+128%</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">UGC 自发笔记</span>
                <span className="text-xs font-extrabold text-stone-900">3.8 万篇</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("echo")}
            className="w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>进入 ECHO 查看完整 9 大复盘模块与续约建议</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Case Studies Library Teaser */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-stone-900">精选招商案例资产库</h3>
            </div>
            <p className="text-xs text-stone-500">
              支持按行业、预算、IP 与成功经验检索，快速复制标杆招商策略。
            </p>

            <div className="space-y-2">
              {cases.slice(0, 2).map((c) => (
                <div key={c.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-800">
                    <span>{c.title}</span>
                    <span className="text-red-600">{c.budgetTier}</span>
                  </div>
                  <p className="text-stone-500 line-clamp-1">{c.creativeBigIdea}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("cases")}
            className="w-full py-2.5 bg-stone-100 text-stone-800 text-xs font-bold rounded-xl hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>浏览更多标杆案例 →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
