// ============================================================
// 纹样图典数据 · 来源：《中国漆器纹样图典》（搜集整理于 2026-11）
// 大类结构参考 data/knowledge_graph.sql 的 pattern 分类：
//   无/素面 · 几何/气象 · 花草植物 · 兽纹/神兽 · 鸟兽虫鱼
//   人物叙事 · 山水楼阁 · 天文星象 · 吉祥符号文字
// 另补「髹饰肌理」一组：由工艺本身形成的纹样。
// 字段说明：
//   line     —— 黑白线稿（树状图缩略图 + 详情大图）
//   desc     —— 纹样简介
//   examples —— 关联实物展示（照片 + 器物信息）
// ============================================================

const LINE = "images/patterns/collection/line/";
const REAL = "images/patterns/collection/real/";

export const patternCollection = [
  {
    id: "K_PAT_SU",
    name: "无/素面",
    desc: "不施花纹，以造型和漆色取胜。",
    icon: "images/patterns/knowledge/K_PAT_SU.png",
    children: []
  },
  {
    id: "K_PAT_JH",
    name: "几何/气象纹",
    desc: "寓动于静、对自然的敬畏。云雷、回纹承自青铜，联珠来自西域，龟背、卍字、菱花是雕漆锦地的常用骨架，多作二方连续的边饰或四方连续的满铺底纹。",
    icon: "images/patterns/knowledge/K_PAT_JH.png",
    children: [
      {
        name: "云雷纹",
        line: LINE + "pc037.png",
        desc: "圆涡为云、方折为雷，商周青铜与战国漆器共用的最古老边饰，多作二方连续。",
        examples: []
      },
      {
        name: "回纹",
        line: LINE + "pc038.png",
        desc: "由雷纹简化而来的连续回字，端庄耐看，多作器物口沿、圈足的收边。",
        examples: []
      },
      {
        name: "联珠纹",
        line: LINE + "pc039.png",
        desc: "一串小圆珠夹于双线之间，唐代经丝路传入，常与团花、宝相花组合使用。",
        examples: []
      },
      {
        name: "龟背锦纹",
        line: LINE + "pc040.png",
        desc: "六角相错的龟背格，格内填小花或回纹，是雕漆「锦地」最典型的骨架之一。",
        examples: []
      },
      {
        name: "卍字流水锦",
        line: LINE + "pc041.png",
        desc: "卍字以斜线相连成细密底纹，取「绵延不断」之意，常作万字流水地。",
        examples: []
      },
      {
        name: "菱花锦地",
        line: LINE + "pc042.png",
        desc: "斜方格中嵌四瓣菱花，格律严整，多用于盒盖满铺或经匣装潢。",
        examples: []
      },
      {
        name: "冰裂纹",
        line: LINE + "pc006.png",
        desc: "如冰面开裂般的自然几何纹理，常作锦地，上压折枝花卉，是「锦地压花」的常见底纹。",
        examples: [
          { img: REAL + "p05_0.jpg", title: "剔红冰裂锦地花卉纹盒（局部）", meta: "清 · 剔红 / 盒局部", desc: "底纹作冰裂纹（锦地），上压折枝花与小花苞。「锦地压花」是清代雕漆最常见的层次手法。" }
        ]
      },
      {
        name: "海水江崖纹",
        line: LINE + "pc068.png",
        desc: "层叠浪涛中立一山石，取「江山永固」，多作器物下部的横向收边。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_ZW",
    name: "花草植物纹",
    desc: "寓意富贵、高洁。花卉是漆器纹样中数量最大的一支：缠枝作骨、折枝作景、团花作心，莲瓣收边、卷草填空。宋人尚写生，一枝一叶皆有姿态；明清尚格律，满花不露地。",
    icon: "images/patterns/knowledge/K_PAT_ZW.png",
    children: [
      {
        name: "缠枝莲纹",
        line: LINE + "pc053.png",
        desc: "以「S」形波状枝干串起莲花，一花一叶交替。它是漆器最常用的底纹，也是最好的边框。",
        examples: [
          { img: REAL + "p03_1.jpg", title: "花卉纹剔红圆盒", meta: "明—清 · 剔红 / 圆盒", desc: "盖与身满饰缠枝花卉，花头大小相间、叶形作卷云状，是「满花不露地」的做法。" }
        ]
      },
      {
        name: "缠枝牡丹纹",
        line: LINE + "pc054.png",
        desc: "花头硕大、层次繁复，枝蔓回旋。牡丹寓富贵，多作主纹而非底纹。",
        examples: [
          { img: REAL + "p04_0.jpg", title: "剔红堆漆花卉纹圆盒", meta: "明—清 · 剔红堆漆 / 圆盒", desc: "堆漆与剔刻并用，花头凸起近半球，花瓣层数极多，侧面可见漆层堆叠的厚度感。" },
          { img: REAL + "p24_0.jpg", title: "红褐雕漆花卉纹（局部）", meta: "清 · 雕漆 / 局部", desc: "红褐漆地上高浮雕折枝花，花瓣边缘起棱，光影落在刀口上，形成天然的灰色过渡。" },
          { img: REAL + "p22_1.jpg", title: "紫漆描金嵌玉花卉纹盒", meta: "清 · 描金嵌玉 / 盒", desc: "紫漆地上描金缠枝，花心嵌白玉。玉为花心、金为花筋，是「描金＋镶嵌」的复合工艺。" }
        ]
      },
      {
        name: "卷草·忍冬纹",
        line: LINE + "pc055.png",
        desc: "单枝连续、叶作卷云，源自南北朝忍冬纹，唐代后成为万能填空纹，什么器型都能收边。",
        examples: []
      },
      {
        name: "莲瓣纹",
        line: LINE + "pc056.png",
        desc: "仰覆莲瓣相间、瓣心各嵌一珠，多用于器座、口沿的立体式收边，是「立体边饰」的代表。",
        examples: []
      },
      {
        name: "折枝秋葵纹",
        line: LINE + "pc057.png",
        desc: "一枝独立成景，不求对称，讲究「写生」姿态。宋元剔红最见笔意的题材。",
        examples: [
          { img: REAL + "p25_0.jpg", title: "红色方形雕漆器", meta: "清 · 剔红 / 方盒", desc: "方形器身四壁开光，内雕折枝花卉，边饰回纹。方形器髹漆比方器更难均匀，故传世少于圆器。" }
        ]
      },
      {
        name: "宝相花纹",
        line: LINE + "pc058.png",
        desc: "莲、牡丹、菊揉合而成的理想花，瓣形对称、珠饰环绕，唐代装饰的集大成者。",
        examples: []
      },
      {
        name: "团花纹",
        line: LINE + "pc059.png",
        desc: "多种花卉聚成一圆，四周留白。可独用，也可四方连续作「团花锦」。",
        examples: [
          { img: REAL + "p08_0.jpg", title: "剔彩团花锦地（故宫博物院藏）", meta: "明—清 · 剔彩 / 局部", desc: "以红、绿、黄漆分层剔刻，团花居中，四周以六角锦地与回纹收边，色层断面清晰可辨。" },
          { img: REAL + "p29_11.jpg", title: "描金锦地团花纹盘", meta: "当代 · 描金 / 圆盘", desc: "盘心密布缠枝团花作锦地，盘沿以如意云开光相间，繁密而不乱，适合整体转译为平面图案。" }
        ]
      },
      {
        name: "菊花纹",
        line: LINE + "pc060.png",
        desc: "花瓣细长、层层内卷。菊傲霜而开，与梅、兰、竹并为「四君子」。",
        examples: [
          { img: REAL + "p09_0.jpg", title: "剔红花卉竹石纹局部", meta: "明—清 · 剔红 / 局部", desc: "芙蓉、竹叶、葡萄与小石并置，刀法深峻，层次靠深浅区分。" }
        ]
      },
      {
        name: "冰梅纹",
        line: LINE + "pc061.png",
        desc: "冰裂格作地、梅枝横斜其上。冰裂与梅皆为清冷高洁之象，是清康熙一朝的流行纹样。",
        examples: []
      },
      {
        name: "灵芝如意纹",
        line: LINE + "pc062.png",
        desc: "灵芝头作如意形，层层云头叠成，取「如意」之意，多作小开光或四角装饰。",
        examples: []
      },
      {
        name: "岁寒三友纹",
        line: LINE + "pc063.png",
        desc: "松、竹、梅交织于一格，象征岁寒不凋的君子之交，多见于文人用器。",
        examples: []
      },
      {
        name: "瓜瓞纹",
        line: LINE + "pc030.png",
        desc: "瓜藤绵延、硕果累累，「瓜瓞绵绵」出自《诗经》，喻子孙昌盛。",
        examples: [
          { img: REAL + "p27_1.jpg", title: "金身瓜瓞纹八角盒", meta: "清 · 金漆雕 / 八角盒", desc: "八角盒满髹金漆，雕瓜藤绵延，寓意子孙昌盛。" }
        ]
      },
      {
        name: "栀子花",
        line: "images/patterns/knowledge/K_PAT_ZW_ZHIZI.png",
        desc: "元代经典，剔红圆盒上常见的主花题材。",
        examples: []
      },
      {
        name: "梅花",
        line: null,
        desc: "以梅花入饰，象征高洁坚贞。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_SS",
    name: "兽纹/神兽纹",
    desc: "象征权威与辟邪。夔龙、蟠螭见于战国楚漆与汉器；龙纹自元明以后多作云龙、团龙，五爪为御用；鹿谐「禄」，是吉祥寓意的载体。",
    icon: "images/patterns/knowledge/K_PAT_SS.png",
    children: [
      {
        name: "龙纹",
        line: "images/patterns/knowledge/K_PAT_SS_LONG.png",
        desc: "龙身盘曲、云气回环，最见「气脉」——看一件云龙漆器，先看龙脊的起伏是否连贯。战国楚墓已有云龙，元明以后五爪为御用。",
        examples: [
          { img: REAL + "p10_0.jpg", title: "元代剔漆龙纹漆器", meta: "元 · 剔漆 / 圆盒", desc: "龙身作「S」形盘绕，鳞甲以细密刀线刻出，周饰火焰与卷云，元气充沛。" },
          { img: REAL + "p11_0.jpg", title: "红漆云龙纹漆器（光彩于文系列）", meta: "当代 · 剔红 / 圆盘", desc: "五爪龙穿行于如意云间，云头层层叠压作底纹，是「云龙」最常见的满构图。" },
          { img: REAL + "p12_0.jpg", title: "上海博物馆藏龙纹漆器", meta: "明—清 · 雕漆 / 版面", desc: "版面满雕云龙，龙首居中偏上，须发飘扬，四周云气翻卷成团，宜作大幅背景纹样。" }
        ]
      },
      {
        name: "团龙纹",
        line: LINE + "pc046.png",
        desc: "五爪龙盘成圆形，正面取势、追逐火珠，是御用漆器的核心母题。",
        examples: []
      },
      {
        name: "夔龙纹",
        line: LINE + "pc043.png",
        desc: "一足、长身、卷鼻的抽象龙形，两两相对成组，是楚漆与青铜共有的骨架纹样。",
        examples: []
      },
      {
        name: "蟠螭纹",
        line: LINE + "pc044.png",
        desc: "无角的螭龙相互蟠绕，身体化作回环的云气，多作方形开光内的满铺装饰。",
        examples: []
      },
      {
        name: "麒麟纹",
        line: "images/patterns/knowledge/K_PAT_SS_QILIN.png",
        desc: "祥瑞神兽，象征太平盛世。",
        examples: []
      },
      {
        name: "饕餮纹",
        line: "images/patterns/knowledge/K_PAT_SS_TAOTIE.png",
        desc: "商周青铜器上的经典兽面，移于漆器则带仿古趣味。",
        examples: [
          { img: REAL + "p29_01.jpg", title: "描金兽面纹盘", meta: "当代 · 描金 / 圆盘", desc: "盘心作圆角矩形牌饰，满填饕餮云纹，仿古趣味浓厚，可作小面积的点睛纹样。" }
        ]
      },
      {
        name: "鹿纹",
        line: LINE + "pc049.png",
        desc: "梅花鹿立于松石之间。鹿谐「禄」，与灵芝、松同构即「禄寿」之意。",
        examples: [
          { img: REAL + "p27_0.jpg", title: "清宫百宝嵌梅花鹿纹盒", meta: "清 · 百宝嵌 / 盒", desc: "以玉石、螺片、珊瑚拼出梅花鹿与百宝，材料的本色即是画面的颜色，边界清晰而硬朗。" }
        ]
      }
    ]
  },
  {
    id: "K_PAT_NS",
    name: "鸟兽虫鱼纹",
    desc: "自然界飞禽走兽的描绘。凤鸟是楚文化的图腾式母题；宋元以后，鹤、鱼、蝶、鸳鸯、蝙蝠转为吉祥寓意的载体。",
    icon: "images/patterns/knowledge/K_PAT_NS.png",
    children: [
      {
        name: "凤鸟纹",
        line: LINE + "pc045.png",
        desc: "高冠长尾、展翅而立。楚漆中的凤鸟常踏云而行，线条极富弹性，是「线」的教科书。",
        examples: [
          { img: REAL + "p02_0.jpg", title: "元 · 剔红绶带秋葵纹漆盘", meta: "元 · 剔红 / 圆盘", desc: "双绶带鸟栖于秋葵花枝间，盘沿饰回纹一周。花叶翻卷、鸟羽细若游丝，是元代花鸟剔红的代表构图。" },
          { img: REAL + "p03_0.jpg", title: "剔红花鸟纹雕漆局部", meta: "明—清 · 剔红 / 局部", desc: "大叶翻卷、朱瓣层叠，可看作剔红花卉的基本单元：主花居中、枝叶穿插、刀尖留地。" },
          { img: REAL + "p23_0.jpg", title: "红漆描金花卉鸟纹漆器", meta: "清—民国 · 描金 / 器皿", desc: "朱漆地上以金线勾花鸟，色相对比强烈，多见于民间婚嫁器具与妆奁。" },
          { img: REAL + "p16_0.jpg", title: "黑漆螺钿描金锦鸡花蝶图圆盒", meta: "南宋—元 · 螺钿描金 / 圆盒", desc: "锦鸡立于湖石，蝶与折枝环绕，构图疏朗。「锦鸡花蝶」是宋元漆器最雅的花鸟图式。" }
        ]
      },
      {
        name: "蝴蝶纹",
        line: LINE + "pc047.png",
        desc: "双蝶对飞、翅脉分明，常与折枝花同构，取「蝶恋花」之意，多作团光或补白。",
        examples: [
          { img: REAL + "p28_1.jpg", title: "黑漆洒金嵌螺钿蝴蝶圆盒", meta: "当代 · 洒金螺钿 / 圆盒", desc: "黑漆地上洒金屑如星，盖心嵌双蝶，洒金与螺钿相映成趣。" }
        ]
      },
      {
        name: "双鱼纹",
        line: LINE + "pc048.png",
        desc: "两鱼相向，尾鳍作卷草状，外围以联珠与回纹双圈，取「年年有余」。",
        examples: []
      },
      {
        name: "鱼藻纹",
        line: "images/patterns/knowledge/K_PAT_NS_YU.png",
        desc: "鱼游水藻之间，生动自然，寓意年年有余。",
        examples: []
      },
      {
        name: "云鹤纹",
        line: LINE + "pc050.png",
        desc: "丹顶鹤展翅穿云。鹤为「一品鸟」，云鹤组合象征高升与长寿。",
        examples: []
      },
      {
        name: "仙鹤纹",
        line: "images/patterns/knowledge/K_PAT_NS_HE.png",
        desc: "长寿高洁，常与松、云同构。",
        examples: []
      },
      {
        name: "莲池鸳鸯纹",
        line: LINE + "pc051.png",
        desc: "鸳鸯游于莲叶、莲蓬之间，取「和（荷）美」的婚姻美满之意。",
        examples: []
      },
      {
        name: "五福捧寿",
        line: LINE + "pc052.png",
        desc: "五只蝙蝠环捧团寿字。蝠谐「福」，是清代漆器最常见的吉祥圆光。",
        examples: []
      },
      {
        name: "草虫纹",
        line: "images/patterns/knowledge/K_PAT_NS_CHONG.png",
        desc: "秋蝉蝈蝈，草间小景，生趣盎然。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_RW",
    name: "人物叙事纹",
    desc: "展现宴乐、戏曲、神话。人物故事是雕漆与螺钿最能「炫技」的题材：一件盒盖往往就是一幅微缩长卷，栏杆、芭蕉、湖石都是层次的分界线。",
    icon: "images/patterns/knowledge/K_PAT_RW.png",
    children: [
      {
        name: "人物故事纹",
        line: LINE + "pc065.png",
        desc: "庭院中高士、仕女、童子成组，以栏杆、芭蕉、湖石分隔层次，多取材戏曲与文人典故。",
        examples: [
          { img: REAL + "p13_0.jpg", title: "清代黑漆嵌螺钿人物盖盒", meta: "清 · 螺钿 / 盖盒", desc: "盖面嵌庭院人物，螺片裁成衣纹与花木，黑漆地上泛出虹彩，是「薄螺钿」的典型观感。" },
          { img: REAL + "p14_0.jpg", title: "元 · 黑漆嵌螺钿人物故事盒", meta: "元 · 螺钿 / 长方盒", desc: "元代螺钿代表作：人物、栏杆、芭蕉均以薄螺片细裁，画面如白描，线条细而不断。" },
          { img: REAL + "p15_0.jpg", title: "黑漆嵌螺钿间描金职贡图长方盒", meta: "明—清 · 螺钿描金 / 长方盒", desc: "螺钿与描金并用，长卷式排布番邦贡使行列，人物数十，衣饰用金线提亮。" },
          { img: REAL + "p19_0.jpg", title: "清 · 江千里款黑漆嵌螺钿人物圆盒", meta: "清 · 螺钿 / 圆盒", desc: "江千里是明末清初螺钿名家，其作「金银闪烁、细如毫发」，此盒可见人物衣纹的极细裁切。" },
          { img: REAL + "p20_0.jpg", title: "黑漆嵌螺钿群仙宴乐图八方盖盒", meta: "清 · 螺钿 / 八方盒", desc: "八方盒面分格叙事：宴饮、奏乐、观画各据一角，是螺钿人物纹的集大成者。" },
          { img: REAL + "p26_0.jpg", title: "剔红开光人物方盘", meta: "清 · 剔红 / 方盘", desc: "方盘四边饰卷云（如意云头连缀），开光内雕罗汉与松石。" },
          { img: REAL + "p07_0.jpg", title: "乾隆时期雕漆纹饰", meta: "清乾隆 · 雕漆 / 器身", desc: "开光内雕人物庭院，开光外满铺如意云与缠枝。构图对称、层次分明，是乾隆朝「繁而不乱」的宫廷趣味。" }
        ]
      },
      {
        name: "婴戏图",
        line: LINE + "pc066.png",
        desc: "数个胖童子嬉戏于花石间，或持莲叶、或放风筝，寓意多子多福。",
        examples: [
          { img: REAL + "p18_0.jpg", title: "黑漆嵌螺钿加金片婴戏图箱", meta: "清初 · 螺钿加金片 / 箱", desc: "箱面满布童子嬉戏，金片作衣饰点缀。婴戏图在螺钿中最难：人多、动作多、层次多。" }
        ]
      },
      {
        name: "高士宴乐图",
        line: "images/patterns/knowledge/K_PAT_RW_GAOSHI.png",
        desc: "文人雅士宴饮雅集，多见于雕漆与螺钿。",
        examples: []
      },
      {
        name: "车马出行图",
        line: null,
        desc: "车马仪仗、出行仪卫，多见于战国秦汉漆器。",
        examples: []
      },
      {
        name: "戏曲故事图",
        line: null,
        desc: "以戏曲剧目情节入画，明清流行。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_SL",
    name: "山水楼阁纹",
    desc: "自然景观与建筑。远山、台榭、松石、曲桥依次排布，以「平远」法压缩进画面，宜作长条或开光。",
    icon: "images/patterns/knowledge/K_PAT_SL.png",
    children: [
      {
        name: "山水楼阁纹",
        line: LINE + "pc064.png",
        desc: "远山、台榭、松石、曲桥依次排布，以「平远」法压缩进横向画面，宜作长条或开光。",
        examples: []
      },
      {
        name: "山水图",
        line: "images/patterns/knowledge/K_PAT_SL_SHAN.png",
        desc: "观泉、秋山，文人山水小景。",
        examples: [
          { img: REAL + "p17_0.jpg", title: "黑漆螺钿描金山水人物图圆盒", meta: "南宋—元 · 螺钿描金 / 圆盒", desc: "圆盒内作山水小景，远山近水以不同色泽的螺片区分，是「以材代色」的早期范例。" },
          { img: REAL + "p21_0.jpg", title: "黑漆嵌螺钿三层提盒", meta: "清 · 螺钿 / 提盒", desc: "提盒三层带抽屉，通体嵌花鸟与山水小景，兼实用与观赏，是文房用具中的重器。" }
        ]
      },
      {
        name: "楼阁图",
        line: "images/patterns/knowledge/K_PAT_SL_LOU.png",
        desc: "亭台楼阁，以建筑为骨、人物为眼。",
        examples: [
          { img: REAL + "p01_0.jpg", title: "元 · 张敏德款剔红楼阁人物图圆盘", meta: "元 · 剔红 / 圆盘", desc: "满雕楼阁、栏杆、人物与树石，是元代雕漆「楼阁人物」的典型：漆层厚实、刀口圆润，藏锋清楚、隐起圆滑。" },
          { img: REAL + "p29_10.jpg", title: "描金楼阁海水江崖纹盘", meta: "当代 · 描金 / 圆盘", desc: "楼阁立于浪涛之上，云气缭绕，取「海屋添筹」式的长寿意象。海水纹的层叠法是关键。" }
        ]
      },
      {
        name: "庭园图",
        line: null,
        desc: "庭院景致与花木湖石。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_TW",
    name: "天文星象纹",
    desc: "古人观测天象的记录，以四神、星宿入饰。",
    icon: "images/patterns/knowledge/K_PAT_TW.png",
    children: [
      {
        name: "四神纹",
        line: "images/patterns/knowledge/K_PAT_TW_SISHEN.png",
        desc: "青龙、白虎、朱雀、玄武，分据四方。",
        examples: []
      },
      {
        name: "二十八宿",
        line: "images/patterns/knowledge/K_PAT_TW_28XIU.png",
        desc: "星象坐标，战国曾侯乙墓漆箱已有完整二十八宿图。",
        examples: []
      },
      {
        name: "北斗星象纹",
        line: null,
        desc: "以北斗七星入饰，主时序与方向。",
        examples: []
      }
    ]
  },
  {
    id: "K_PAT_JX",
    name: "吉祥符号文字纹",
    desc: "八吉祥、吉语等。明清漆器「图必有意，意必吉祥」，以谐音、象征、组合三种方式把祝福编码进纹样。",
    icon: "images/patterns/knowledge/K_PAT_JX.png",
    children: [
      {
        name: "八吉祥",
        line: LINE + "pc069.png",
        desc: "法轮、法螺、宝伞、白盖、莲花、宝瓶、金鱼、盘长，环绕中心莲花，源自藏传佛教。",
        examples: []
      },
      {
        name: "暗八仙",
        line: LINE + "pc070.png",
        desc: "以八仙所持法器代指八仙，扇、剑、葫芦、玉板等环绕飘带，含蓄而吉庆。",
        examples: []
      },
      {
        name: "如意云纹",
        line: LINE + "pc067.png",
        desc: "云头作如意形，内卷细线层层回环。它是最常用的云纹变体，也是最好用的底纹。",
        examples: []
      },
      {
        name: "龙凤呈祥纹",
        line: LINE + "pc031.png",
        desc: "一龙一凤分据左右，中夹牡丹，是婚庆漆器的标准图式。",
        examples: [
          { img: REAL + "p29_00.jpg", title: "描金龙凤呈祥纹盘", meta: "当代 · 描金 / 圆盘", desc: "金线勾描于深色漆地，龙凤相对，寓意吉祥美满。" }
        ]
      }
    ]
  },
  {
    id: "K_PAT_JL",
    name: "髹饰肌理",
    desc: "有些「纹样」并非画上去，而是工艺本身留下的痕迹：剔犀的层叠刀口、犀皮的流涡、百宝嵌的拼缝、款彩的刻线、戗金的金丝。",
    icon: null,
    children: [
      {
        name: "剔犀云纹",
        line: LINE + "pc071.png",
        desc: "红黑漆层交替髹涂后斜刀剔刻，刀口断面显出一线一线的色层，云头圆转如剑环。",
        examples: []
      },
      {
        name: "犀皮漆肌理",
        line: LINE + "pc072.png",
        desc: "打埝成凸点再髹色磨平，磨出旋涡状色晕，俗称「菠萝漆」，是唯一「无图样」的纹样。",
        examples: []
      },
      {
        name: "百宝嵌",
        line: LINE + "pc073.png",
        desc: "以玉石、珊瑚、螺钿、象牙拼嵌成花鸟，纹样的边界就是材料的边界，边界即轮廓。",
        examples: []
      },
      {
        name: "款彩",
        line: LINE + "pc074.png",
        desc: "漆面刻去图样轮廓、填以彩漆，远看如版画，多用于屏风与屏门。",
        examples: []
      },
      {
        name: "戗金",
        line: LINE + "pc075.png",
        desc: "以针刀刻出极细线条再填金，纹样细若游丝，多作锦地与花鸟，是「线」的极致。",
        examples: []
      }
    ]
  }
];
