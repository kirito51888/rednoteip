import React from "react";
import {
  SlidersHorizontal,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Workflow,
  Info,
} from "lucide-react";

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl border border-stone-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>方法论与数据模型说明</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">灵犀 Adapter 数据模型与算法可解释性</h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
          详细说明红罗盘（RED Compass）底层的 7 大匹配维度、AURA 复盘模型、灵犀数据 API 映射字段与合规免责边界。
        </p>
      </div>

      {/* SECTION 1: SYSTEM ARCHITECTURE (PULSE -> SPARK -> ECHO) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Workflow className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold text-stone-900">招商顾问三大核心模块设计架构</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
            <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded">
              PULSE ｜ 机会雷达
            </span>
            <h3 className="font-bold text-stone-900 text-sm">投前洞察与热度扫描</h3>
            <p className="text-stone-600 leading-relaxed">
              实时监测小红书站内搜索供需差、行业搜索 YoY 增速与品牌独有资产，输出 0-100 的 Brand Opportunity Score。
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
            <span className="px-2.5 py-1 bg-stone-900 text-white text-[11px] font-bold rounded">
              SPARK ｜ 共创策略
            </span>
            <h3 className="font-bold text-stone-900 text-sm">4-IP 契合度与创意生成</h3>
            <p className="text-stone-600 leading-relaxed">
              通过 7 大评估维度与独立风险闸门，横向对比四大 IP 匹配得分，生成 3 个 Big Idea 与 150w-250w 刊例包。
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded">
              ECHO ｜ 价值复盘
            </span>
            <h3 className="font-bold text-stone-900 text-sm">同源数据证明合作价值</h3>
            <p className="text-stone-600 leading-relaxed">
              基于 AURA 极光模型与 9 大复盘模块，解释“发生了什么、为什么、下一轮怎么做”，支持沉淀至案例资产库。
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: LINGXI ADAPTER DATA MAPPING SPECIFICATION */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Database className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-stone-900">灵犀 Platform API 适配映射表 (Data Adapter Spec)</h2>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-600 uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">本系统通用字段</th>
                <th className="py-2.5 px-3">灵犀平台 API 原始字段</th>
                <th className="py-2.5 px-3">数据类型与说明</th>
                <th className="py-2.5 px-3">缺失回退处理 (Fallback)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              <tr>
                <td className="py-2.5 px-3 font-bold text-stone-900">redSearchIndex</td>
                <td className="py-2.5 px-3 font-mono text-red-600">brand_search_pv_30d</td>
                <td className="py-2.5 px-3">Int，近30天品牌主词及相关衍生词搜索总量</td>
                <td className="py-2.5 px-3 text-stone-500">取行业平均估算，标注 isEstimated: true</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-stone-900">searchSupplyDemandGap</td>
                <td className="py-2.5 px-3 font-mono text-red-600">cat_sd_ratio_gap</td>
                <td className="py-2.5 px-3">Float，搜索请求数 / 笔记有效供给数比值</td>
                <td className="py-2.5 px-3 text-stone-500">分类为“中等缺口”并提醒业务核实</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-stone-900">auraScore</td>
                <td className="py-2.5 px-3 font-mono text-red-600">aura_comprehensive_index</td>
                <td className="py-2.5 px-3">0-100 综合分，含 Awareness, Resonance 等4维</td>
                <td className="py-2.5 px-3 text-stone-500">使用各单维度加权合成并标注置信度</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-stone-900">audiencePenetration</td>
                <td className="py-2.5 px-3 font-mono text-red-600">target_user_reach_diff</td>
                <td className="py-2.5 px-3">Array，投前与投后 8 大精细人群重合提升率</td>
                <td className="py-2.5 px-3 text-stone-500">回退至 5 大城市线人群渗透数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: FORMULA & WEIGHTS EXPLAINABILITY */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Cpu className="w-5 h-5 text-stone-900" />
          <h2 className="text-lg font-bold text-stone-900">数学计算公式与 7 大维度权重设置</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm">
              1. Brand Opportunity Score 计算公式：
            </h3>
            <div className="p-3 bg-stone-900 text-red-400 font-mono rounded-lg text-[11px] overflow-x-auto">
              Score = ∑ (Dimension_i × Weight_i) + Bonus - Deductions
            </div>
            <ul className="space-y-1 text-stone-600">
              <li>• <strong>品类势能 (20%)</strong>：行业 YoY 增速与供需缺口</li>
              <li>• <strong>品牌动能 (20%)</strong>：近 30 天搜索绝对量与热度</li>
              <li>• <strong>人群增量 (20%)</strong>：与小红书核心客群重合度</li>
              <li>• <strong>资产可激活性 (20%)</strong>：独有资产与大事件结合度</li>
              <li>• <strong>商业推进性 (10%)</strong>：节点与预算排期匹配</li>
              <li>• <strong>风险与可测量性 (10%)</strong>：舆情与数据完备度</li>
            </ul>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm">
              2. Brand × IP Fit Score 7 大维度权重：
            </h3>
            <div className="p-3 bg-stone-900 text-emerald-400 font-mono rounded-lg text-[11px] overflow-x-auto">
              FitScore = ∑ (IPFitDim_i × IPWeight_i) [经 RiskGates 过滤]
            </div>
            <ul className="space-y-1 text-stone-600">
              <li>• <strong>核心人群契合 (20%)</strong></li>
              <li>• <strong>定位与 IP 精神契合 (15%)</strong></li>
              <li>• <strong>独有资产可激活性 (15%)</strong></li>
              <li>• <strong>行业趋势与节点势能 (15%)</strong></li>
              <li>• <strong>内容延展与 UGC 潜力 (15%)</strong></li>
              <li>• <strong>站内外传播放大潜力 (10%)</strong></li>
              <li>• <strong>数据可测量与复盘条件 (10%)</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPLIANCE DISCLAIMER */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 space-y-3 shadow-lg border border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>AI 决策辅助免责声明与数据透明度边界</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          本平台输出的所有评估分数、创意 Big Idea 与预估 ROI 指标均基于灵犀 Adapter 算法及历史数据推演，属于 <strong>CBD 商务推进与策划脑暴之辅助建议</strong>。业务人员在向客户提报前，必须完成对【法务合规】、【排他冲突】与【实际预算排期】的人工二次复核。
        </p>
      </section>
    </div>
  );
};
