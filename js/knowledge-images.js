const existingImages = {
  K_MAT_QI_SHENG: "images/materials/K_MAT_QI_SHENG.png",
  K_MAT_QI_SE: "images/materials/K_MAT_QI_SE.png",
  K_MAT_MU: "images/materials/K_MAT_MU.png",
  K_MAT_TUO: "images/materials/K_MAT_TUO.png",
  K_MAT_ZHU: "images/materials/K_MAT_ZHU.png",
  K_MAT_PI: "images/materials/K_MAT_PI.png",
  K_MAT_TAO: "images/materials/K_MAT_TAO.png",
  K_MAT_CI: "images/materials/K_MAT_CI.png",
  K_MAT_JIN: "images/materials/K_MAT_JIN.png",
  K_MAT_SHA: "images/materials/K_MAT_SHA.png",
  K_MAT_MU_ZHUO: "images/materials/K_MAT_MU_ZHUO.png",
  K_MAT_MU_JUAN: "images/materials/K_MAT_MU_JUAN.png",
  K_MAT_ZHU_JI: "images/materials/K_MAT_ZHU_JI.png",
  K_MAT_ZHI: "images/materials/K_MAT_ZHI.png",
  K_MAT_GU: "images/materials/K_MAT_GU.png",
  K_PAT_JH_YUNLEI: "images/patterns/knowledge/K_PAT_JH_YUNLEI.png",
  K_PAT_JH_JIANG: "images/patterns/knowledge/K_PAT_JH_JIANG.png",
  K_PAT_ZW_LIAN: "images/patterns/knowledge/K_PAT_ZW_LIAN.png",
  K_PAT_ZW_MUDAN: "images/patterns/knowledge/K_PAT_ZW_MUDAN.png",
  K_PAT_SS_LONG: "images/patterns/knowledge/K_PAT_SS_LONG.png",
  K_PAT_SS_QILIN: "images/patterns/knowledge/K_PAT_SS_QILIN.png",
  K_PAT_SS_TAOTIE: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png",
  K_PAT_NS_FENG: "images/patterns/knowledge/K_PAT_NS_FENG.png",
  K_PAT_NS_YU: "images/patterns/knowledge/K_PAT_NS_YU.png",
  K_PAT_NS_CHONG: "images/patterns/knowledge/K_PAT_NS_CHONG.png",
  K_PAT_RW_YINGXI: "images/patterns/knowledge/K_PAT_RW_YINGXI.png",
  K_PAT_RW_GAOSHI: "images/patterns/knowledge/K_PAT_RW_GAOSHI.png",
  K_PAT_SL_SHAN: "images/patterns/knowledge/K_PAT_SL_SHAN.png",
  K_PAT_SL_LOU: "images/patterns/knowledge/K_PAT_SL_LOU.png",
  K_PAT_JX_BABAO: "images/patterns/knowledge/K_PAT_JX_BABAO.png",
  K_PAT_JH_HUI: "images/knowledge/patterns/supplemental/K_PAT_JH_HUI/01.jpg",
  K_PAT_JH_LIANZHU: "images/knowledge/patterns/supplemental/K_PAT_JH_LIANZHU/01.jpg",
  K_PAT_JH_GUIBEI: "images/knowledge/patterns/supplemental/K_PAT_JH_GUIBEI/01.jpg",
  K_PAT_JH_WANZI: "images/knowledge/patterns/supplemental/K_PAT_JH_WANZI/01.jpg",
  K_PAT_JH_LINGHUA: "images/knowledge/patterns/supplemental/K_PAT_JH_LINGHUA/01.jpg",
  K_PAT_ZW_JUANCAO: "images/knowledge/patterns/supplemental/K_PAT_ZW_JUANCAO/01.jpg",
  K_PAT_ZW_BAOXIANG: "images/knowledge/patterns/supplemental/K_PAT_ZW_BAOXIANG/01.jpg",
  K_PAT_ZW_BINGMEI: "images/knowledge/patterns/supplemental/K_PAT_ZW_BINGMEI/01.jpg",
  K_PAT_ZW_LINGZHI: "images/knowledge/patterns/supplemental/K_PAT_ZW_LINGZHI/01.jpg",
  K_PAT_ZW_SUIHAN: "images/knowledge/patterns/supplemental/K_PAT_ZW_SUIHAN/01.jpg",
  K_PAT_ZW_ZHIZI: "images/knowledge/patterns/supplemental/K_PAT_ZW_ZHIZI/01.jpg",
  K_PAT_ZW_MEIHUA: "images/knowledge/patterns/supplemental/K_PAT_ZW_MEIHUA/01.jpg",
  K_PAT_SS_TUANLONG: "images/knowledge/patterns/supplemental/K_PAT_SS_TUANLONG/01.jpg",
  K_PAT_SS_KUILONG: "images/knowledge/patterns/supplemental/K_PAT_SS_KUILONG/01.jpg",
  K_PAT_SS_PANCHI: "images/knowledge/patterns/supplemental/K_PAT_SS_PANCHI/01.jpg",
  K_PAT_NS_SHUANGYU: "images/knowledge/patterns/supplemental/K_PAT_NS_SHUANGYU/01.jpg",
  K_PAT_NS_HE: "images/knowledge/patterns/supplemental/K_PAT_NS_HE/01.jpg",
  K_PAT_NS_LIANCHI: "images/knowledge/patterns/supplemental/K_PAT_NS_LIANCHI/01.jpg",
  K_PAT_JX_WUFU: "images/knowledge/patterns/supplemental/K_PAT_JX_WUFU/01.jpg",
  K_PAT_RW_CHEMA: "images/knowledge/patterns/supplemental/K_PAT_RW_CHEMA/01.jpg",
  K_PAT_RW_XIQU: "images/knowledge/patterns/supplemental/K_PAT_RW_XIQU/01.jpg",
  K_PAT_SL_SHANSHUI: "images/knowledge/patterns/supplemental/K_PAT_SL_SHANSHUI/01.jpg",
  K_PAT_SL_TINGYUAN: "images/knowledge/patterns/supplemental/K_PAT_SL_TINGYUAN/01.jpg",
  K_PAT_TW_SISHEN: "images/knowledge/patterns/supplemental/K_PAT_TW_SISHEN/01.jpg",
  K_PAT_TW_28XIU: "images/knowledge/patterns/supplemental/K_PAT_TW_28XIU/01.jpg",
  K_PAT_TW_BEIDOU: "images/knowledge/patterns/supplemental/K_PAT_TW_BEIDOU/01.jpg",
  K_PAT_JX_ANBAXIAN: "images/knowledge/patterns/supplemental/K_PAT_JX_ANBAXIAN/01.jpg",
  K_PAT_JH_RUYIYUN: "images/knowledge/patterns/supplemental/K_PAT_JH_RUYIYUN/01.jpg",
};

const folders = { material: "knowledge/materials", pattern: "knowledge/patterns" };

export function knowledgeImagePath(node) {
  if (!node || node.category === "color" || node.category === "technique") return null;
  const existingPath = existingImages[node.id];
  if (existingPath) {
    if (existingPath.startsWith("images/patterns/knowledge/")) {
      const fileName = existingPath.split("/").pop();
      return `images/${folders[node.category]}/${fileName}`;
    }
    return existingPath;
  }
  return `images/${folders[node.category]}/${node.id}.jpg`;
}
