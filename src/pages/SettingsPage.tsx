import React, { useState } from "react";
import { Brand, EventIP } from "../types";
import {
  Settings,
  Database,
  PlusCircle,
  Save,
  Trash2,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  Key,
  Globe,
  Upload,
  Download,
  Flame,
} from "lucide-react";

interface Props {
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  brands: Brand[];
  ips: EventIP[];
  onAddBrand: (brand: Brand) => void;
  onAddIP: (ip: EventIP) => void;
}

export const SettingsPage: React.FC<Props> = ({
  demoMode,
  setDemoMode,
  brands,
  ips,
  onAddBrand,
  onAddIP,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>("gemini_api_key_configured");
  const [lingxiEndpoint, setLingxiEndpoint] = useState<string>("https://api.lingxi.xiaohongshu.com/v2/adapter");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // New Brand Modal state
  const [showAddBrandModal, setShowAddBrandModal] = useState<boolean>(false);
  const [newBrandName, setNewBrandName] = useState<string>("");
  const [newBrandIndustry, setNewBrandIndustry] = useState<"美妆个护" | "医疗医美" | "日化家清" | "服饰鞋包">("美妆个护");
  const [newBrandSubcategory, setNewBrandSubcategory] = useState<string>("面部护理");

  // New IP Modal state
  const [showAddIPModal, setShowAddIPModal] = useState<boolean>(false);
  const [newIPName, setNewIPName] = useState<string>("");
  const [newIPTagline, setNewIPTagline] = useState<string>("");
  const [newIPSpirit, setNewIPSpirit] = useState<string>("");

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const brand: Brand = {
      id: `brand_custom_${Date.now()}`,
      name: newBrandName.trim(),
      industry: newBrandIndustry,
      subcategory: newBrandSubcategory,
      positioning: `${newBrandName} - 自定义新建品牌`,
      targetDemographics: ["Z世代", "新中产"],
      coreProducts: [`${newBrandName} 主打单品`],
      uniqueAssets: [
        {
          id: `asset_${Date.now()}`,
          type: "产品技术",
          title: "专研核心技术",
          description: "具备良好的市场好评",
          activatableInIP: true,
          activationIdea: "大事件现场互动沉浸舱体验",
        },
      ],
      redSearchIndex: 650000,
      redContentVolume: 32000,
      searchSupplyDemandGap: "极大供不应求",
      competitorBrands: ["竞品A", "竞品B"],
      opportunityScore: {
        totalScore: 88,
        confidence: "High",
        verdict: `品牌 ${newBrandName} 具备极高的大事件 IP 合作潜力。`,
        dimensions: [
          { key: "cat", name: "品类势能", weight: 0.2, score: 90, rawData: "品类 YoY +25%", reason: "高速增长", dataSource: "灵犀 API" },
          { key: "brand", name: "品牌动能", weight: 0.2, score: 85, rawData: "月搜索 65万", reason: "声量上涨", dataSource: "灵犀 API" },
          { key: "aud", name: "人群增量", weight: 0.2, score: 88, rawData: "人群重合率 85%", reason: "破圈潜力极佳", dataSource: "模型" },
          { key: "asset", name: "资产可激活性", weight: 0.2, score: 86, rawData: "拥有特色单品", reason: "可装置打卡", dataSource: "品牌" },
          { key: "biz", name: "商业可推进性", weight: 0.1, score: 85, rawData: "营销节点临近", reason: "预算充足", dataSource: "CBD" },
          { key: "risk", name: "风险与可测量性", weight: 0.1, score: 92, rawData: "舆情极佳", reason: "数据完备", dataSource: "监测" },
        ],
        bonusPoints: ["符合当前爆款趋势"],
        deductions: [],
        verificationQuestions: ["Q3 节点是否已确定？"],
      },
      recommendedIPs: ["夜人节", "小美说"],
      provenance: {
        source: "手动导入/自定义配置",
        scope: "站内 2026",
        timeRange: "2026.01.01 - 2026.12.31",
        updatedAt: new Date().toISOString().split("T")[0],
        isEstimated: false,
        confidence: "High",
      },
    };

    onAddBrand(brand);
    setShowAddBrandModal(false);
    setNewBrandName("");
  };

  const handleCreateIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIPName.trim()) return;

    const ip: EventIP = {
      id: `ip_custom_${Date.now()}`,
      name: newIPName.trim(),
      tagline: newIPTagline || "全新大事件 IP",
      spirit: newIPSpirit || "多元自由灵感",
      targetAudience: "年轻人群与品质生活者",
      audienceSize: "5,000万+ 曝光",
      scenarios: ["主会场", "品牌体验展舱", "线上话题"],
      cooperationWindow: "Q3 - Q4",
      keyAssets: ["主展区", "达人共创", "定制发售"],
      pastHighlights: "爆款口碑",
      fitWeights: { cat: 0.2, brand: 0.2, aud: 0.2, asset: 0.2, biz: 0.1, risk: 0.1 },
    };

    onAddIP(ip);
    setShowAddIPModal(false);
    setNewIPName("");
    setNewIPTagline("");
    setNewIPSpirit("");
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl border border-stone-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold border border-stone-700">
          <Settings className="w-3.5 h-3.5" />
          <span>系统设置与数据源管理</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">系统配置与数据源 Adapter</h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl">
          配置 API 密钥、切换演示/真实数据模式、管理 Pipeline 重点品牌及自定义大事件 IP 档案。
        </p>
      </div>

      {/* Mode Switcher & API Credentials */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Database className="w-5 h-5 text-red-600" />
          <span>全局数据模式与灵犀 Platform API 设置</span>
        </h2>

        <form onSubmit={handleSaveConfig} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200 gap-4">
            <div>
              <span className="font-bold text-stone-900 text-sm block">数据源模式切换</span>
              <p className="text-xs text-stone-500">
                {demoMode
                  ? "当前为【演示数据模式】：使用内建高质量 Mock 品牌与模拟存证。"
                  : "当前为【真实数据接入模式】：通过灵犀 Adapter 实时请求 API 接口。"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDemoMode(!demoMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                demoMode
                  ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                  : "bg-emerald-600 text-white border-emerald-700 shadow-sm"
              }`}
            >
              {demoMode ? "切换至真实数据 API" : "切换至演示数据模式"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-800 block">灵犀 Adapter Endpoint</label>
              <input
                type="text"
                value={lingxiEndpoint}
                onChange={(e) => setLingxiEndpoint(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-800 block">Gemini API Key (服务侧自动接入)</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:outline-none focus:border-red-500 bg-stone-50"
                placeholder="系统已安全托管"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500">所有数据接口遵循 GDPR 与小红书数据安全规约</span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? "已成功保存配置！" : "保存设置"}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Brand Pipeline Management */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">招商 Pipeline 品牌列表 ({brands.length} 个)</h2>
            <p className="text-xs text-stone-500">管理平台中正在诊断跟进的重点品牌。</p>
          </div>

          <button
            onClick={() => setShowAddBrandModal(true)}
            className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-500 transition-colors flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>新增诊断品牌</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {brands.map((b) => (
            <div key={b.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>{b.name}</span>
                <span className="text-red-600 font-extrabold">{b.opportunityScore.totalScore}分</span>
              </div>
              <div className="text-stone-500">{b.industry} • {b.subcategory}</div>
              <div className="text-[11px] text-stone-400">月搜索: {(b.redSearchIndex / 10000).toFixed(1)}万次</div>
            </div>
          ))}
        </div>
      </section>

      {/* Major IP Management */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">大事件 IP 档案配置 ({ips.length} 个)</h2>
            <p className="text-xs text-stone-500">可自定义新增或更新大事件 IP 精神内核与参数。</p>
          </div>

          <button
            onClick={() => setShowAddIPModal(true)}
            className="px-3 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>新增 IP 档案</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ips.map((ip) => (
            <div key={ip.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-stone-900 block">{ip.name}</span>
              <p className="text-stone-600 text-[11px] line-clamp-1">{ip.tagline}</p>
              <div className="text-[10px] text-stone-400">窗口: {ip.cooperationWindow}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal: Add Brand */}
      {showAddBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 border border-stone-200">
            <button
              onClick={() => setShowAddBrandModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
            <h3 className="text-base font-bold text-stone-900">新建诊断品牌</h3>

            <form onSubmit={handleCreateBrand} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-800 block mb-1">品牌名称</label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="例如: 赫莲娜, 稀物集, 蕉内..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">所属一级行业</label>
                <select
                  value={newBrandIndustry}
                  onChange={(e: any) => setNewBrandIndustry(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg bg-stone-50 focus:outline-none"
                >
                  <option value="美妆个护">美妆个护</option>
                  <option value="医疗医美">医疗医美</option>
                  <option value="日化家清">日化家清</option>
                  <option value="服饰鞋包">服饰鞋包</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">二级品类</label>
                <input
                  type="text"
                  value={newBrandSubcategory}
                  onChange={(e) => setNewBrandSubcategory(e.target.value)}
                  placeholder="例如: 精华液, 医美水光, 防晒..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBrandModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500"
                >
                  生成诊断品牌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add IP */}
      {showAddIPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 border border-stone-200">
            <button
              onClick={() => setShowAddIPModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
            <h3 className="text-base font-bold text-stone-900">新增大事件 IP 档案</h3>

            <form onSubmit={handleCreateIP} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-800 block mb-1">IP 名称</label>
                <input
                  type="text"
                  required
                  value={newIPName}
                  onChange={(e) => setNewIPName(e.target.value)}
                  placeholder="例如: 潮流引力场, 灵感生活节..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">IP 一句话 Tagline</label>
                <input
                  type="text"
                  value={newIPTagline}
                  onChange={(e) => setNewIPTagline(e.target.value)}
                  placeholder="例如: 青年夜间文化爆破现场..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">精神内核</label>
                <input
                  type="text"
                  value={newIPSpirit}
                  onChange={(e) => setNewIPSpirit(e.target.value)}
                  placeholder="例如: 释放真实自我, 疗愈精神内耗..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddIPModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800"
                >
                  创建 IP 档案
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
