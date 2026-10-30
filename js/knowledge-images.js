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
  K_PAT_JH_HUI: "images/patterns/knowledge/K_PAT_JH_HUI.png",
  K_PAT_JH_JIANG: "images/patterns/knowledge/K_PAT_JH_JIANG.png",
  K_PAT_ZW_LIAN: "images/patterns/knowledge/K_PAT_ZW_LIAN.png",
  K_PAT_ZW_MUDAN: "images/patterns/knowledge/K_PAT_ZW_MUDAN.png",
  K_PAT_ZW_ZHIZI: "images/patterns/knowledge/K_PAT_ZW_ZHIZI.png",
  K_PAT_SS_LONG: "images/patterns/knowledge/K_PAT_SS_LONG.png",
  K_PAT_SS_QILIN: "images/patterns/knowledge/K_PAT_SS_QILIN.png",
  K_PAT_SS_TAOTIE: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png",
  K_PAT_NS_FENG: "images/patterns/knowledge/K_PAT_NS_FENG.png",
  K_PAT_NS_HE: "images/patterns/knowledge/K_PAT_NS_HE.png",
  K_PAT_NS_YU: "images/patterns/knowledge/K_PAT_NS_YU.png",
  K_PAT_NS_CHONG: "images/patterns/knowledge/K_PAT_NS_CHONG.png",
  K_PAT_RW_YINGXI: "images/patterns/knowledge/K_PAT_RW_YINGXI.png",
  K_PAT_RW_GAOSHI: "images/patterns/knowledge/K_PAT_RW_GAOSHI.png",
  K_PAT_SL_SHAN: "images/patterns/knowledge/K_PAT_SL_SHAN.png",
  K_PAT_SL_LOU: "images/patterns/knowledge/K_PAT_SL_LOU.png",
  K_PAT_TW_SISHEN: "images/patterns/knowledge/K_PAT_TW_SISHEN.png",
  K_PAT_TW_28XIU: "images/patterns/knowledge/K_PAT_TW_28XIU.png",
  K_PAT_JX_BABAO: "images/patterns/knowledge/K_PAT_JX_BABAO.png",
  K_TEC_SUXIU: "images/techniques/K_TEC_SUXIU.png",
  K_TEC_CAIHUI: "images/techniques/K_TEC_CAIHUI.png",
  K_TEC_MIAOJIN: "images/techniques/K_TEC_MIAOJIN.png",
  K_TEC_QJ: "images/techniques/K_TEC_QJ.png",
  K_TEC_DIAOQI: "images/techniques/K_TEC_DIAOQI.png",
  K_TEC_KUANCAI: "images/techniques/K_TEC_KUANCAI.png",
  K_TEC_LUODIAN: "images/techniques/K_TEC_LUODIAN.png",
  K_TEC_PINGTUO: "images/techniques/K_TEC_PINGTUO.png",
  K_TEC_BAOBAO: "images/techniques/K_TEC_BAOBAO.png",
  K_TEC_XIPI: "images/techniques/K_TEC_XIPI.png",
  K_TEC_TUOTAI: "images/techniques/K_TEC_TUOTAI.png",
  K_TEC_TUIGUANG: "images/techniques/K_TEC_TUIGUANG.png",
  K_TEC_TIHONG: "images/techniques/K_TEC_TIHONG.png",
  K_TEC_TIHEI: "images/techniques/K_TEC_TIHEI.png",
  K_TEC_TIXI: "images/techniques/K_TEC_TIXI.png",
  K_TEC_TICAI: "images/techniques/K_TEC_TICAI.png",
  K_TEC_BOLUO: "images/techniques/K_TEC_BOLUO.png"
};

const folders = { material: "knowledge/materials", pattern: "knowledge/patterns", technique: "knowledge/techniques", era: "knowledge/eras" };

export function knowledgeImagePath(node) {
  if (!node || node.category === "color") return null;
  const existingPath = existingImages[node.id];
  if (existingPath) {
    const fileName = existingPath.split("/").pop();
    return `images/${folders[node.category]}/${fileName}`;
  }
  return `images/${folders[node.category]}/${node.id}.jpg`;
}
