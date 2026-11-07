const STORAGE_KEY = "unlockedEasterEggs";

export const easterEggs = [
  {
    id: "diaoqi-yinhua",
    name: "雕漆隐花",
    recipe: "M02 脱胎 / 夹纻胎 + [C09, C06, C01] 蓝紫 / 黄 / 黑灰 + P02 花草植物纹",
    material: "M02",
    colors: ["C09", "C06", "C01"],
    pattern: "P02",
    link: "https://www.bilibili.com/video/BV1TsmtY7Egu/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196",
    description: "“雕漆隐花”是成都漆艺中极尽低调奢华的绝技。它的表面看似是一层平滑光润的单色漆，但若迎着光，或者用手轻轻触摸，便会发现漆层之下隐藏着精美的雕花。李子柒用大半年的时间还原了一门古老手艺，不仅是一次高难度的手工展示，也具象化地展现了传统匠人“与时间做朋友”的极致耐心。"
  },
  {
    id: "qichengzhuanhe",
    name: "起承转合",
    recipe: "M03 陶瓷胎 + [C01] 黑灰 + P01 几何 / 气象纹",
    material: "M03",
    colors: ["C01"],
    pattern: "P01",
    link: "https://db.traditionowlab.cn/",
    description: "中国非物质文化遗产基因数据库（简称非遗基因库）是一个基于中国非物质文化遗产大数据的知识共享平台。该数据库搜集、整合了海量中国非物质文化遗产的多媒体资料，搭建了基于专业术语及其知识网络的非遗知识图谱，并从工艺、色彩和纹案三个维度对非遗知识进行拆解、再现和重组，打造了非遗多媒体资源库、非遗知识库和非遗创新转化案例库，旨在探索中国非遗在大数据及人工智能时代的创承新模式。"
  },
  {
    id: "yishengyishi",
    name: "一生一事",
    recipe: "M01 木胎 + [C11, C02] 棕色 / 白色 + P06 人物与场景纹",
    material: "M01",
    colors: ["C11", "C02"],
    pattern: "P06",
    link: "https://www.bilibili.com/video/BV1TF4m1u7Zx/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196",
    description: "如果文物会说话，它们最想感谢的人一定是修复师。唐诗逸的《一生一事》，演绎了一个文物修复师的极致浪漫与极致孤独。她伏案修补残卷，却在恍惚间穿越进画中，亲历画中人的盛世与战火。看着文物受难，她无能为力；回到现实，她只能流着泪，用手中的工具一点点拼凑起破碎的历史。“择一事，终一生”，这是每一个文物修复师案头前无数个日日夜夜的具象写照。"
  },
  {
    id: "genben-meiyou",
    name: "根本没有这样的漆器",
    recipe: "M03 陶瓷胎 + C09 蓝紫系 + P08 天文星象纹",
    material: "M03",
    colors: ["C09"],
    pattern: "P08",
    link: null,
    description: "或许也只是因为还没有发现"
  },
  {
    id: "qilian",
    name: "漆恋",
    recipe: "M01 木胎 + C02 白色 + P02 花草植物纹",
    material: "M01",
    colors: ["C02"],
    pattern: "P02",
    link: "https://www.bilibili.com/tr/video/BV1LBiTBTENx/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196",
    description: "《漆恋》是国内第一支词曲编唱与古乐演奏均由博物馆工作者独立完成的文物主题音乐作品。作品由湖北省博物馆文物保护中心陈亦奇作词，编钟乐团曾炫作曲、编曲，石江珊演唱，以漆工和漆器对话的独特视角，将两者之间深厚的情感联结与超越时空的精神羁绊娓娓道来。歌词植根古典文化，曲风古朴简练，编配融合篪、瑟、笛、笙等先秦器乐，传递出“哀而不伤”的动人意境。"
  },
  {
    id: "dangwo-zaili",
    name: "当我在这里",
    recipe: "M01 木胎 + [C01, C04, C06] 黑灰 / 红橙粉 / 黄色 + P06 人物与场景纹",
    material: "M01",
    colors: ["C01", "C04", "C06"],
    pattern: "P06",
    link: "https://www.bilibili.com/video/BV1Xs411W7Zr/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196",
    description: "纪录电影《我在故宫修文物》主题曲《当我在这里》，由姚谦填词，陈粒作曲并献唱，黄裕翔钢琴伴奏，刘胡轶编曲。在悠扬清缓的旋律中，“文物医生”们以淡定从容的姿态，上演了一场现代与古代时空交叠的思想碰撞，诠释“择一事，终一生”的工匠精神。"
  },
  {
    id: "feiyizhisheng",
    name: "非遗之声",
    recipe: "M04 皮 / 竹胎 + [C07, C11, C06] 青绿 / 棕色 / 黄色 + P03 动物题材纹",
    material: "M04",
    colors: ["C07", "C11", "C06"],
    pattern: "P03",
    link: "https://www.ihchina.cn/",
    description: "中国非物质文化遗产网·中国非物质文化遗产数字博物馆，是面向公众展示、传播和了解中国非物质文化遗产的重要线上平台。网站涵盖国家级非物质文化遗产代表性项目名录、联合国教科文组织非遗名录项目、新闻动态、专题报道、非遗地图、代表性传承人、线上展览及影音资料等内容，涉及民间文学、传统音乐、传统美术、传统技艺、传统医药和民俗等多个领域，为了解非遗的历史背景、艺术特色及保护传承现状提供了丰富资源。"
  },
  {
    id: "lets-play",
    name: "let's play",
    recipe: "M07 金属胎 + [C09, C07] 蓝紫 / 青绿 + P01 几何 / 气象纹",
    material: "M07",
    colors: ["C09", "C07"],
    pattern: "P01",
    link: "https://artsandculture.google.com/",
    description: "一个很有意思的网站，可以通过数字展览、艺术作品和互动内容重新发现世界各地的艺术。（可能需要魔法）"
  },
  {
    id: "dongfang-dingshe",
    name: "东方顶奢",
    recipe: "M01 木胎 + [C01, C11] 黑 / 棕 + P00 无 / 素面",
    material: "M01",
    colors: ["C01", "C11"],
    pattern: "P00",
    link: "https://www.bilibili.com/video/BV1gN41157W9/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196",
    description: "这是一期关于中国传统大漆工艺的硬核科普。UP主南翔通过亲身复刻古代漆器，揭示了生漆制作的极致艰辛：从割漆时的严重过敏，到上百次髹涂的漫长等待。视频生动展现了中国漆器如何以“时间与生命”为代价，成就千年不腐、温润如玉的顶级品质，也探讨了这门古老非遗在当代面临的传承困境。它曾是古人的日用之器，也是真正的东方顶奢。"
  }
];

const aliases = {
  M05: "M04",
  C03: "C01",
  C10: "C09",
  P04: "P03",
  P07: "P06"
};

export function canonicalCode(code) {
  return aliases[code] || code;
}

export function matchesEasterEgg(egg, selection) {
  const selectedColors = [...new Set(selection.colors.map(canonicalCode))].sort();
  const requiredColors = [...new Set(egg.colors.map(canonicalCode))].sort();
  return canonicalCode(egg.material) === canonicalCode(selection.material)
    && egg.pattern && canonicalCode(egg.pattern) === canonicalCode(selection.pattern)
    && selectedColors.length === requiredColors.length
    && selectedColors.every((color, index) => color === requiredColors[index]);
}

export function getUnlockedEasterEggs() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (error) {
    console.error("读取隐藏成就失败：", error);
    return new Set();
  }
}

export function unlockEasterEggs(eggs) {
  const unlocked = getUnlockedEasterEggs();
  eggs.forEach((egg) => unlocked.add(egg.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
  return unlocked;
}
