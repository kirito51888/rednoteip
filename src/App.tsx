import React, { useState } from "react";
import { Brand, EventIP, ReviewReport, IndustryData, CaseStudy, DimensionBreakdown } from "./types";
import {
  MOCK_BRANDS,
  MOCK_INDUSTRIES,
  MOCK_CASES,
  MOCK_REVIEW_REPORT,
} from "./data/mockData";
import { DEFAULT_IPS } from "./config/modelConfig";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScoreExplanationModal } from "./components/common/ScoreExplanationModal";

import { DashboardPage } from "./pages/DashboardPage";
import { PulsePage } from "./pages/PulsePage";
import { SparkPage } from "./pages/SparkPage";
import { EchoPage } from "./pages/EchoPage";
import { CasesPage } from "./pages/CasesPage";
import { MethodologyPage } from "./pages/MethodologyPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Core Data State
  const [brands, setBrands] = useState<Brand[]>(MOCK_BRANDS);
  const [ips, setIps] = useState<EventIP[]>(DEFAULT_IPS);
  const [selectedBrand, setSelectedBrand] = useState<Brand>(MOCK_BRANDS[0]);
  const [selectedIp, setSelectedIp] = useState<EventIP>(DEFAULT_IPS[0]);
  const [selectedReviewReport, setSelectedReviewReport] = useState<ReviewReport>(MOCK_REVIEW_REPORT);
  const [cases, setCases] = useState<CaseStudy[]>(MOCK_CASES);

  // Score Explanation Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    score: number;
    confidence: "High" | "Medium" | "Low";
    verdict: string;
    dimensions: DimensionBreakdown[];
    bonusPoints?: string[];
    deductions?: string[];
  }>({
    isOpen: false,
    title: "",
    score: 0,
    confidence: "High",
    verdict: "",
    dimensions: [],
  });

  // Handle Navbar brand search query
  const handleSearchBrand = (query: string) => {
    const matched = brands.find(
      (b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.industry.toLowerCase().includes(query.toLowerCase()) ||
        b.subcategory.toLowerCase().includes(query.toLowerCase())
    );

    if (matched) {
      setSelectedBrand(matched);
      setActiveTab("pulse");
    } else {
      // Create new transient brand for diagnosis
      const newTransientBrand: Brand = {
        id: `brand_search_${Date.now()}`,
        name: query,
        industry: "美妆个护",
        subcategory: "潜力品类",
        positioning: `${query} - 检索建立品牌`,
        targetDemographics: ["Z世代", "新中产"],
        coreProducts: [`${query} 主打产品`],
        uniqueAssets: [
          {
            id: `asset_${Date.now()}`,
            type: "产品技术",
            title: "核心研发展势",
            description: "用户好评与高口碑复购",
            activatableInIP: true,
            activationIdea: "大事件沉浸展区互动打卡",
          },
        ],
        redSearchIndex: 520000,
        redContentVolume: 28000,
        searchSupplyDemandGap: "中等缺口",
        competitorBrands: ["竞品甲", "竞品乙"],
        opportunityScore: {
          totalScore: 85,
          confidence: "High",
          verdict: `检索品牌 ${query} 具备良好大事件匹配度。`,
          dimensions: [
            { key: "cat", name: "品类势能", weight: 0.2, score: 86, rawData: "YoY +22%", reason: "需求持续上升", dataSource: "灵犀 API" },
            { key: "brand", name: "品牌动能", weight: 0.2, score: 84, rawData: "月搜索 52万", reason: "声量稳步积累", dataSource: "灵犀 API" },
            { key: "aud", name: "人群增量", weight: 0.2, score: 85, rawData: "重合率 82%", reason: "匹配核心受众", dataSource: "模型" },
            { key: "asset", name: "资产可激活性", weight: 0.2, score: 86, rawData: "具备口碑爆款", reason: "强互动潜力", dataSource: "公开" },
            { key: "biz", name: "商业可推进性", weight: 0.1, score: 82, rawData: "排期灵活", reason: "合作意向明确", dataSource: "CBD" },
            { key: "risk", name: "风险与可测量性", weight: 0.1, score: 90, rawData: "无重大负面", reason: "数据可追溯", dataSource: "监测" },
          ],
          bonusPoints: ["新中产人群好感度上升"],
          deductions: [],
          verificationQuestions: ["确定 Q3-Q4 主推新品计划？"],
        },
        recommendedIPs: ["夜人节", "小美说"],
        provenance: {
          source: "搜索实时计算",
          scope: "2026",
          timeRange: "2026.01 - 2026.06",
          updatedAt: new Date().toISOString().split("T")[0],
          isEstimated: true,
          confidence: "Medium",
        },
      };

      setBrands([newTransientBrand, ...brands]);
      setSelectedBrand(newTransientBrand);
      setActiveTab("pulse");
    }
  };

  const handleSelectBrandForSpark = (brandOrName: Brand | string) => {
    if (typeof brandOrName === "string") {
      const found = brands.find(
        (b) => b.name.toLowerCase().includes(brandOrName.toLowerCase())
      );
      if (found) {
        setSelectedBrand(found);
      } else {
        handleSearchBrand(brandOrName);
        return;
      }
    } else {
      setSelectedBrand(brandOrName);
    }
    setActiveTab("spark");
  };

  const handleSelectCaseForSpark = (brandName: string, ipName: string) => {
    const matchedBrand = brands.find((b) => b.name.includes(brandName)) || brands[0];
    const matchedIp = ips.find((ip) => ip.name.includes(ipName)) || ips[0];
    setSelectedBrand(matchedBrand);
    setSelectedIp(matchedIp);
    setActiveTab("spark");
  };

  const handleOpenModalForScore = (
    title: string,
    score: number,
    confidence: "High" | "Medium" | "Low",
    verdict: string,
    dimensions: DimensionBreakdown[],
    bonusPoints?: string[],
    deductions?: string[]
  ) => {
    setModalState({
      isOpen: true,
      title,
      score,
      confidence,
      verdict,
      dimensions,
      bonusPoints,
      deductions,
    });
  };

  const handleAddBrand = (newBrand: Brand) => {
    setBrands([newBrand, ...brands]);
    setSelectedBrand(newBrand);
  };

  const handleAddIP = (newIP: EventIP) => {
    setIps([...ips, newIP]);
    setSelectedIp(newIP);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div>
        {/* Sticky Header Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearchBrand={handleSearchBrand}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          onNewBrandDiagnosis={() => setActiveTab("settings")}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {activeTab === "dashboard" && (
            <DashboardPage
              brands={brands}
              ips={ips}
              cases={cases}
              reviewReport={selectedReviewReport}
              onSelectBrand={handleSelectBrandForSpark}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === "pulse" && (
            <PulsePage
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              industries={MOCK_INDUSTRIES}
              onSelectBrandForSpark={handleSelectBrandForSpark}
              onOpenExplainModal={handleOpenModalForScore}
            />
          )}

          {activeTab === "spark" && (
            <SparkPage
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              ips={ips}
              selectedIp={selectedIp}
              setSelectedIp={setSelectedIp}
              onOpenExplainModal={handleOpenModalForScore}
            />
          )}

          {activeTab === "echo" && (
            <EchoPage
              report={selectedReviewReport}
              onOpenExplainModal={handleOpenModalForScore}
            />
          )}

          {activeTab === "cases" && (
            <CasesPage
              cases={cases}
              onSelectCaseForSpark={handleSelectCaseForSpark}
            />
          )}

          {activeTab === "methodology" && <MethodologyPage />}

          {activeTab === "settings" && (
            <SettingsPage
              demoMode={demoMode}
              setDemoMode={setDemoMode}
              brands={brands}
              ips={ips}
              onAddBrand={handleAddBrand}
              onAddIP={handleAddIP}
            />
          )}
        </main>
      </div>

      {/* Score Explainability Detail Modal */}
      <ScoreExplanationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        score={modalState.score}
        confidence={modalState.confidence}
        verdict={modalState.verdict}
        dimensions={modalState.dimensions}
        bonusPoints={modalState.bonusPoints}
        deductions={modalState.deductions}
      />

      {/* Global Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
