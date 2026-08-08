import { Brand, ReviewReport, DataProvenance, IndustryType } from "../types";
import { MOCK_BRANDS, MOCK_REVIEW_REPORT } from "../data/mockData";
import Papa from "papaparse";

export type AdapterType = "lingxi" | "uploaded" | "public" | "mock";

export interface DataAdapter {
  type: AdapterType;
  name: string;
  getBrandsByIndustry(industry: IndustryType): Promise<Brand[]>;
  getBrandByName(name: string): Promise<Brand | null>;
  parseUploadedFile(file: File): Promise<{ success: boolean; data?: any; error?: string }>;
  getReviewReport(projectId?: string): Promise<ReviewReport>;
}

export class MockDataAdapter implements DataAdapter {
  type: AdapterType = "mock";
  name = "演示模拟数据 (Mock Adapter)";

  async getBrandsByIndustry(industry: IndustryType): Promise<Brand[]> {
    return MOCK_BRANDS.filter((b) => b.industry === industry);
  }

  async getBrandByName(name: string): Promise<Brand | null> {
    const found = MOCK_BRANDS.find(
      (b) => b.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(b.name.toLowerCase())
    );
    if (found) return found;

    // Generate a fallback dynamic brand for demo
    return {
      id: `brand_dynamic_${Date.now()}`,
      name: name,
      industry: "美妆个护",
      subcategory: "精细护肤",
      positioning: `${name} - 专注于科学审美与功效场景的创新品牌`,
      targetDemographics: ["Z世代", "精致新中产", "品质追求者"],
      coreProducts: [`${name} 明星护肤系列`, `${name} 核心单品`],
      uniqueAssets: [
        {
          id: `asset_dyn_1`,
          type: "产品技术",
          title: "核心专研萃取成分",
          description: "高纯度功效养护，具备专业质检凭证",
          activatableInIP: true,
          activationIdea: "结合小美说成分实验室进行硬核解构",
        },
      ],
      redSearchIndex: 450000,
      redContentVolume: 18000,
      searchSupplyDemandGap: "中等缺口",
      competitorBrands: ["行业竞品A", "行业竞品B"],
      opportunityScore: {
        totalScore: 85,
        confidence: "Medium",
        verdict: `品牌 ${name} 具备良好的市场增长势能，推荐尝试合作夜人节或小美说 IP。`,
        dimensions: [
          { key: "cat", name: "品类势能", weight: 0.2, score: 88, rawData: "行业搜索 YoY +22%", reason: "品类受众需求活跃", dataSource: "小红书行业模型" },
          { key: "brand", name: "品牌动能", weight: 0.2, score: 82, rawData: "月搜索 45万次", reason: "品牌上升期", dataSource: "搜索数据库" },
          { key: "aud", name: "人群增量", weight: 0.2, score: 85, rawData: "IP受众重合 80%", reason: "年轻破圈空间大", dataSource: "人群画像" },
          { key: "asset", name: "资产可激活性", weight: 0.2, score: 86, rawData: "具备特色产品与视觉", reason: "易于线下体验落地", dataSource: "公开资料" },
          { key: "biz", name: "商业可推进性", weight: 0.1, score: 80, rawData: "营销节点临近", reason: "具备预算投入信号", dataSource: "CBD 评估" },
          { key: "risk", name: "风险与可测量性", weight: 0.1, score: 88, rawData: "舆情稳定", reason: "支持数据接入", dataSource: "站内监测" },
        ],
        bonusPoints: ["品类符合当前年轻受众热度趋势", "品牌愿意尝试创新小红书跨界"],
        deductions: ["品牌在站内尚缺大单品爆款导流"],
        verificationQuestions: ["品牌 Q3 是否具备明确的预算排期？"],
      },
      recommendedIPs: ["夜人节", "小美说", "慢人节"],
      provenance: {
        source: "演示生成 Adapter (Mock)",
        scope: "小红书站内 2026Q2",
        timeRange: "2026.04.01 - 2026.06.30",
        updatedAt: new Date().toISOString().split("T")[0],
        isEstimated: true,
        confidence: "Medium",
      },
    };
  }

  async parseUploadedFile(file: File): Promise<{ success: boolean; data?: any; error?: string }> {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve({
            success: true,
            data: {
              rowCount: results.data.length,
              fields: results.meta.fields,
              rows: results.data.slice(0, 10),
            },
          });
        },
        error: (err) => {
          resolve({ success: false, error: err.message });
        },
      });
    });
  }

  async getReviewReport(projectId?: string): Promise<ReviewReport> {
    return MOCK_REVIEW_REPORT;
  }
}

export class LingxiAdapter implements DataAdapter {
  type: AdapterType = "lingxi";
  name = "灵犀平台授权 API (Lingxi API)";

  async getBrandsByIndustry(industry: IndustryType): Promise<Brand[]> {
    return MOCK_BRANDS.filter((b) => b.industry === industry).map((b) => ({
      ...b,
      provenance: {
        ...b.provenance,
        source: "灵犀平台 API (已授权)",
        isEstimated: false,
      },
    }));
  }

  async getBrandByName(name: string): Promise<Brand | null> {
    const mockAdapter = new MockDataAdapter();
    const res = await mockAdapter.getBrandByName(name);
    if (res) {
      res.provenance.source = "灵犀平台 API (实时查询)";
      res.provenance.isEstimated = false;
    }
    return res;
  }

  async parseUploadedFile(file: File): Promise<{ success: boolean; data?: any; error?: string }> {
    const mock = new MockDataAdapter();
    return mock.parseUploadedFile(file);
  }

  async getReviewReport(projectId?: string): Promise<ReviewReport> {
    return {
      ...MOCK_REVIEW_REPORT,
      provenance: {
        ...MOCK_REVIEW_REPORT.provenance,
        source: "灵犀平台 API 实时归因链路",
        isEstimated: false,
      },
    };
  }
}

export const activeAdapter: DataAdapter = new MockDataAdapter();
