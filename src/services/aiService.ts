import { CreativeRoute, Brand, EventIP } from "../types";

export interface GenerateCreativeRequest {
  brand: Brand;
  ip: EventIP;
  cooperationDepth: "场景参与" | "联合共创" | "战略共建";
  budgetTier: "150w" | "200w" | "250w";
}

export async function generateAICreativeDirections(
  req: GenerateCreativeRequest
): Promise<{ routes: CreativeRoute[]; isAiGenerated: boolean }> {
  try {
    const prompt = `你是一个资深小红书营销策略专家。
请为品牌「${req.brand.name}」（行业：${req.brand.industry}，定位：${req.brand.positioning}）与小红书大事件 IP「${req.ip.name}」（精神内核：${req.ip.spirit}）生成 3 个【截然不同】的整合营销创意方向（Cooperation Depth: ${req.cooperationDepth}）。

品牌独有资产：
${req.brand.uniqueAssets.map((a) => `- ${a.title}: ${a.description}`).join("\n")}

请以 JSON 格式输出，包含一个数组 routes，每个对象字段包括：
- theme: 创意母题 (短巧有力)
- bigIdea: 一句话 Big Idea
- assetIntegration: 品牌资产如何融入 IP 场景
- userParticipationReason: 用户为什么愿意参与/自发发帖
- redTopicName: 小红书站内话题名 (如 #越夜越焕亮)
- redTopicCopy: 话题文案
- contentPillars: 3个内容支柱 (字符串数组)
- ugcMechanism: UGC互动与抽奖机制
- touchpoints: 主会场/线下展区/直播等触点 (字符串数组)
- roleDivision: 达人/用户/品牌号/IP号角色分工
- externalExtension: 站外传播放大
- executionRisks: 执行难点与风险
- targetMetrics: 建议衡量指标

请仅返回 JSON，格式如下：
{ "routes": [ ... ] }`;

    const res = await fetch("/api/gemini/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        systemInstruction: "你是一个小红书商业化大事件招商策略专家，擅长爆款创意设计。",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text) {
        let cleaned = data.text.trim();
        if (cleaned.startsWith("```json")) {
          cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
        } else if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
        }
        const parsed = JSON.parse(cleaned);
        if (parsed.routes && Array.isArray(parsed.routes) && parsed.routes.length >= 3) {
          return {
            routes: parsed.routes.map((r: any, idx: number) => ({
              ...r,
              id: `route_ai_${Date.now()}_${idx}`,
              depthLevel: req.cooperationDepth,
            })),
            isAiGenerated: true,
          };
        }
      }
    }
  } catch (err) {
    console.warn("Gemini API direct call failed, falling back to deterministic generator:", err);
  }

  // Deterministic fallback if API fails or no key
  return {
    routes: getFallbackCreatives(req.brand, req.ip, req.cooperationDepth),
    isAiGenerated: false,
  };
}

function getFallbackCreatives(
  brand: Brand,
  ip: EventIP,
  depth: "场景参与" | "联合共创" | "战略共建"
): CreativeRoute[] {
  const assetName = brand.uniqueAssets[0]?.title || brand.coreProducts[0] || "核心单品";

  return [
    {
      id: `route_fb_1`,
      theme: "硬核场景体验与沉浸破圈",
      bigIdea: `【${ip.name}】专属定制：把${brand.name}的「${assetName}」变成现场高光解毒剂！`,
      assetIntegration: `在${ip.name}线下核心场地打造专属体验舱，将${assetName}的极致功效转化为现场高颜值打卡试用装置。`,
      userParticipationReason: "打卡可领取限量‘小红书大事件试用包’，并有机会登上主会场大屏。",
      redTopicName: `#${brand.name}x${ip.name}高光时刻`,
      redTopicCopy: `越夜越美！在${ip.name}现场感受【${brand.name}】的硬核黑科技，晒图赢限量好礼！`,
      contentPillars: [
        "头部KOL线下第一视角打卡Vlog",
        "科学成分/面料硬核对比评测",
        "素人现场15分钟前后效果图文",
      ],
      ugcMechanism: "带指定#话题 晒现场体验照片，即有机会抽取大事件联名礼盒。",
      touchpoints: ["大事件主会场互动舱", "小红书大事件专题页", "深夜23点搜索彩蛋"],
      roleDivision: "品牌号发起悬念 -> KOL深度体验 -> KOC组团晒图 -> IP官方号转发表扬",
      externalExtension: "微信朋友圈/微博热搜双榜联动，微信公众号联合发布《场景白皮书》",
      depthLevel: depth,
      executionRisks: "现场试用装与安保人员预估不足，需准备额外备用货盘。",
      targetMetrics: "曝光 >5000万，互动 >200万，UGC笔记 >1.5万篇",
    },
    {
      theme: "情绪疗愈与生活方式共鸣",
      bigIdea: `停下匆忙脚步，在【${ip.name}】与${brand.name}一起感受松弛与好心态`,
      assetIntegration: `将${brand.name}的品牌美学与${ip.name}的灵感氛围结合，营造‘无侵入感’的情绪沉淀空间。`,
      userParticipationReason: "获得一份静心解压的情绪小卡与专属于自己的独特感官体验。",
      redTopicName: `#松弛感种草日志`,
      redTopicCopy: "美得有理有据，生活需要一点缓释。快来分享你的松弛感瞬间！",
      contentPillars: [
        "生活方式博主美学图文",
        "情绪短视频与声音采样",
        "深度故事访谈与品牌理念传递",
      ],
      ugcMechanism: "分享你的生活松弛时刻，带话题@品牌号 抽取专属情绪礼包。",
      touchpoints: ["慢生活静心区域", "高颜值风铃/光影走廊", "小红书美学直播间"],
      roleDivision: "生活方式达人主导调性 -> 品牌号做精神升华 -> 用户情感倾诉",
      externalExtension: "小红书播客栏目合作与户外时尚杂志专题报道",
      depthLevel: depth,
      executionRisks: "硬广露出会削弱情绪共鸣，需严格控制品牌Logo比例与露出口径。",
      targetMetrics: "爆款笔记比例 >15%，品牌美誉度抬升 +25%",
      id: `route_fb_2`,
    },
    {
      theme: "全维搜索拦截与爆款单品带货",
      bigIdea: `精准搜索拦截！让每一位寻找【${ip.name}】受众都能买到${brand.name}明星爆款`,
      assetIntegration: `依托${ip.name}主会场的巨大流量，全网包揽行业关键词、场景词与特定品类搜索品专。`,
      userParticipationReason: "搜索特定专属暗号，解锁限定优惠券与赠品试用装。",
      redTopicName: `#${brand.name}必买清单`,
      redTopicCopy: "看完大事件种草，直接搜暗号领专属好礼！今晚就入手！",
      contentPillars: [
        "测评博主干货红黑榜",
        "大促前夕抄作业清单",
        "优惠券领用与凑单攻略",
      ],
      ugcMechanism: "搜暗号晒实物订单，平分小红书薯券与品牌年货包。",
      touchpoints: ["小红书全维品专", "搜索彩蛋弹窗", "天猫/小红书店铺直接跳转"],
      roleDivision: "种草达人种下心智 -> 搜索品专承接拦截 -> 店铺快速闭环",
      externalExtension: "站外电商直播间配合喊话，全渠道货盘协同",
      depthLevel: depth,
      executionRisks: "必须保障库存充沛，避免因搜索暴涨导致断货体验落差。",
      targetMetrics: "搜索增量 >120%，店铺直接进店率 >35%",
      id: `route_fb_3`,
    },
  ];
}
