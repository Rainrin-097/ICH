export const attributes = {
  materials: [
    { id: "M01", name: "木胎", note: "木材为胎，温润坚实", image: "images/materials/K_MAT_MU.png" },
    { id: "M02", name: "脱胎 / 夹纻胎", note: "去模存壳，轻如浮云", image: "images/materials/K_MAT_TUO.png" },
    { id: "M03", name: "陶瓷胎", note: "陶胎与瓷胎外壁髹漆", image: "images/materials/K_MAT_TAO.png" },
    { id: "M04", name: "皮 / 竹胎", note: "皮革柔韧，竹材轻巧", image: "images/materials/K_MAT_PI.png" },
    { id: "M07", name: "金属胎", note: "金属为骨，漆为衣", image: "images/materials/K_MAT_JIN.png" },
    { id: "M08", name: "漆砂胎", note: "薄胎漆砂制", image: "images/materials/K_MAT_SHA.png" }
  ],
  colors: [
    { id: "C01", name: "黑灰系", hex: "#1a1a1a", note: "玄、皂、黛、灰，沉静内敛的深色系" },
    { id: "C02", name: "白色", hex: "#e9e7dd", note: "蛤粉入漆，温润珠光" },
    { id: "C04", name: "红橙粉系", hex: "#b53b31", note: "朱砂为正，兼含银朱橙与胭脂粉" },
    { id: "C06", name: "黄色", hex: "#d0a83e", note: "藤黄，中央之色" },
    { id: "C07", name: "青绿系", hex: "#557653", note: "石绿、铜绿与青，古朴沉静" },
    { id: "C09", name: "蓝紫系", hex: "#385b7f", note: "石青之蓝，兼含青莲紫" },
    { id: "C11", name: "棕色", hex: "#8b5a3e", note: "赭石，大地的颜色" }
  ],
  patterns: [
    { id: "P00", name: "无 / 素面", note: "不饰纹样，以漆色见器", image: "images/patterns/knowledge/K_PAT_JH.png" },
    { id: "P01", name: "几何 / 气象纹", note: "云雷、回纹与抽象秩序", image: "images/patterns/knowledge/K_PAT_JH_YUNLEI.png" },
    { id: "P02", name: "花草植物纹", note: "莲、牡丹、栀子等折枝花卉", image: "images/patterns/knowledge/K_PAT_ZW_MUDAN.png" },
    { id: "P03", name: "动物题材纹", note: "神兽、凤鸟、鱼虫等动物题材", image: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png" },
    { id: "P06", name: "人物与场景纹", note: "人物故事、山水楼阁与庭园", image: "images/patterns/knowledge/K_PAT_RW_YINGXI.png" },
    { id: "P08", name: "天文星象纹", note: "二十八宿与四象北斗", image: "images/patterns/knowledge/K_PAT_TW_28XIU.png" }
  ]
};

export const artifacts = [
  { name: "河姆渡文化木胎朱漆碗", era: "新石器时代", location: "浙江省博物馆 · 浙江余姚", description: "整木镟挖，外壁瓜棱形，是中国发现最早的漆器之一。它让我们看见八千年前先民对漆液的最初驯化。", req_material: "M01", req_colors: ["C04"], req_pattern: "P00", technique: "素髹 / 髹涂", image: "images/artifacts/01_河姆渡文化木胎朱漆碗/01.jpg" },
  { name: "马家浜文化彩绘陶质漆器", era: "新石器时代", location: "嘉兴博物馆 · 浙江嘉兴", description: "最早的陶胎漆器实物，在陶器上施漆衣，增加了器表的绘画性。", req_material: "M03", req_colors: ["C04", "C01"], req_pattern: "P01", technique: "彩绘 / 描漆", image: "images/artifacts/04_马家浜文化彩绘陶质漆器/01.jpg" },
  { name: "良渚文化嵌玉漆杯", era: "新石器时代", location: "良渚博物院 · 浙江余杭", description: "器身用红漆和玉粒装饰，开镶嵌漆器艺术之先河。", req_material: "M01", req_colors: ["C04", "C02"], req_pattern: "P01", technique: "彩绘 / 描漆", image: "images/artifacts/06_嵌玉漆杯/01.jpg" },
  { name: "彩绘兽面凤鸟纹螺钿漆罍", era: "夏商周", location: "社科院考古所 · 北京房山", description: "黑漆为底，螺钿镶嵌兽面与凤鸟，是世界最早的螺钿漆器之一。", req_material: "M01", req_colors: ["C01", "C02"], req_pattern: "P03", technique: "螺钿", image: "images/artifacts/11_彩绘兽面凤鸟纹螺钿漆罍/01.jpg" },
  { name: "漆木虎座鸟架鼓", era: "春秋战国", location: "湖北省博物馆 · 湖北枣阳", description: "双虎为座，双凤鸟立于虎背之上，是楚文化最具象征性的器物之一。", req_material: "M01", req_colors: ["C01", "C04", "C06", "C02"], req_pattern: "P03", technique: "彩绘 / 描漆", image: "images/artifacts/18_漆木虎座鸟架鼓/01.jpg" },
  { name: "彩绘二十八宿图漆衣箱", era: "春秋战国", location: "湖北省博物馆 · 湖北随州", description: "箱面记有二十八宿全部名称，并与北斗、四象相配，是研究先秦天文观念与漆器绘饰的重要器物。", req_material: "M01", req_colors: ["C01", "C04"], req_pattern: "P08", technique: "彩绘 / 描漆", image: "images/artifacts/17_彩绘二十八宿图漆衣箱/01.jpg" },
  { name: "云纹漆鼎", era: "汉代", location: "湖南博物院 · 湖南长沙", description: "马王堆汉墓代表，出土时鼎内尚存藕片汤，云纹与漆色共同构成汉代气象。", req_material: "M01", req_colors: ["C01", "C04"], req_pattern: "P01", technique: "彩绘 / 描漆", image: "images/artifacts/19_云纹漆鼎/01.jpg" },
  { name: "金银平脱琴", era: "唐代", location: "日本京都正仓院 · 传世品", description: "紫漆地，金银薄片镂刻人物龙凤花草，髹漆研磨齐平，尽显盛唐华彩。", req_material: "M01", req_colors: ["C09", "C06", "C02"], req_pattern: "P06", technique: "金银平脱", image: "images/artifacts/28_金银平脱琴/01.jpg" },
  { name: "南宋戗金莲瓣形朱漆奁", era: "宋代", location: "常州博物馆 · 江苏常州", description: "外髹朱漆，戗刻荷花牡丹等折枝花卉，金纹如游丝，显出宋人克制而精微的审美。", req_material: "M01", req_colors: ["C04", "C01", "C06", "C02"], req_pattern: "P06", technique: "戗金 / 填漆", image: "images/artifacts/38_南宋戗金莲瓣形朱漆奁/01.jpg" },
  { name: "剔红牡丹纹圆盘", era: "明代", location: "故宫博物院 · 北京", description: "黄漆素地上雕朱漆牡丹花纹，髹漆肥厚，弥漫着明代宫廷漆器的富贵气象。", req_material: "M01", req_colors: ["C04", "C06"], req_pattern: "P02", technique: "雕漆 / 剔红", image: "images/artifacts/52_明永乐剔红牡丹纹圆盘/01.jpg" },
  { name: "脱胎朱漆菊瓣式盖碗", era: "清代", location: "故宫博物院 · 福州", description: "壁薄如纸，通体朱漆，盖内与碗心刻乾隆御题诗填金，体现福州脱胎漆器的轻盈。", req_material: "M02", req_colors: ["C04", "C06"], req_pattern: "P02", technique: "脱胎 / 薄料", image: "images/artifacts/64_清乾隆脱胎朱漆菊瓣式盖碗/01.jpg" }
];

export const knowledge = {
  color: [
    { name: "朱（朱砂）", parent: "红色系", description: "硫化汞天然矿物，最贵重的红颜料，沉稳正红，是漆器朱髹的主色。", hex: "#b93a32" },
    { name: "石青", parent: "蓝色系", description: "蓝铜矿研磨而成，沉着的天蓝色，历久不褪。", hex: "#1e90ff" },
    { name: "藤黄", parent: "黄色系", description: "海藤树树脂，明亮柠檬黄，多用于点缀花蕊与鸟兽眼睛。", hex: "#d4af37" }
  ],
  material: [
    { name: "生漆", parent: "大漆原料", description: "从漆树割取的天然液汁，是漆器的灵魂材料。", image: "images/materials/K_MAT_QI_SHENG.png" },
    { name: "木胎", parent: "胎体材质", description: "最常见、最传统的胎体，木为骨，漆为衣。", image: "images/materials/K_MAT_MU.png" },
    { name: "脱胎 / 夹纻胎", parent: "胎体材质", description: "以麻布与漆层层裱糊，去模存壳，轻如浮云。", image: "images/materials/K_MAT_TUO.png" }
  ],
  pattern: [
    { name: "云雷纹", parent: "几何 / 气象纹", description: "以回旋线条组成的古老纹样，寄托对天地秩序的敬畏。", image: "images/patterns/knowledge/K_PAT_JH_YUNLEI.png" },
    { name: "饕餮纹", parent: "兽纹 / 神兽纹", description: "青铜礼制影响下的神兽面纹，威严而神秘。", image: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png" },
    { name: "牡丹纹", parent: "花草植物纹", description: "富贵与繁盛的象征，在雕漆中常以层叠花瓣呈现。", image: "images/patterns/knowledge/K_PAT_ZW_MUDAN.png" }
  ],
  technique: [
    { name: "螺钿", parent: "镶嵌类", description: "将贝壳薄片镶嵌于漆面，借其天然光泽成纹。", image: "images/patterns/knowledge/K_PAT_NS_FENG.png" },
    { name: "金银平脱", parent: "镶嵌类", description: "金银片与漆面齐平，研磨之后浑然一体。", image: "images/techniques/K_TEC_PINGTUO.png" },
    { name: "剔红", parent: "雕镂类", description: "在朱漆层上雕刻花纹，刀法圆润，层次丰厚。", image: "images/techniques/K_TEC_TIHONG.png" }
  ]
};
