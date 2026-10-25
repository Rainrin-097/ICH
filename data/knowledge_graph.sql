-- ==========================================
-- knowledge_graph.sql
-- 专用于右侧“知识图谱”展示与左侧游戏基础映射
-- ==========================================

DROP TABLE IF EXISTS knowledge_nodes;

CREATE TABLE knowledge_nodes (
    id TEXT PRIMARY KEY,            -- 唯一标识符 (如 K_COL_RED_ZHUSHA)
    category TEXT NOT NULL,         -- 分类 (color: 颜色, material: 材质, technique: 技艺, pattern: 纹样)
    name TEXT NOT NULL,             -- 名称 (如 "朱砂"、"木胎")
    parent_id TEXT,                 -- 父级ID (用来构建树状结构，顶级为 NULL)
    game_color TEXT,                -- 【游戏核心】映射到11种基础判定色 (黑白灰红橙黄绿青蓝紫棕粉)
    hex_code TEXT,                  -- 十六进制色值 (专为颜色准备，前端用来渲染色块)
    description TEXT                -- 详细科普介绍 (悬浮或点击时展示)
);

-- ==========================================
-- 1. 颜色知识图谱 (The Colors)
-- ==========================================
-- 1.1 基础判定色 (父节点，游戏底层逻辑用)
INSERT INTO knowledge_nodes (id, category, name, parent_id, game_color, hex_code, description) VALUES
('K_COL_BLACK', 'color', '黑', NULL, '黑', '#1A1A1A', '五正色之一，北方之色。大漆原本呈半透明褐色，精制后变黑。'),
('K_COL_WHITE', 'color', '白', NULL, '白', '#F5F5F5', '五正色之一，西方之色。大漆无法直接调出纯白，古人多用蛤粉入漆。'),
('K_COL_RED',   'color', '红', NULL, '红', '#C0392B', '五正色之一（赤），南方之色。漆器中最尊贵、最耀眼的色系。'),
('K_COL_YELLOW','color', '黄', NULL, '黄', '#D4AF37', '五正色之一，中央之色。明快的黄色，常用于点缀花蕊或过渡。'),
('K_COL_GREEN', 'color', '绿', NULL, '绿', '#4A7C59', '间色。如青绿山水般古朴的色系，多见于石绿、铜绿。'),
('K_COL_BLUE',  'color', '蓝', NULL, '蓝', '#2E4E7E', '间色。深沉的矿物蓝，多见于彩绘与螺钿底纹。'),
('K_COL_PURPLE','color', '紫', NULL, '紫', '#5B3A4A', '间色。「恶紫之夺朱也」，多指青紫、红紫，高贵且罕见。'),
('K_COL_BROWN', 'color', '棕', NULL, '棕', '#955539', '平民与流年之色。来自赤铁矿的赭石色，极其稳定的大地色系。'),
('K_COL_GRAY',  'color', '灰', NULL, '灰', '#808080', '水墨交融之色，多用于素髹与淡雅器型。'),
('K_COL_ORANGE','color', '橙', NULL, '橙', '#D35400', '间色，如银朱般偏橙亮朱红。'),
('K_COL_PINK',  'color', '粉', NULL, '粉', '#FFC0CB', '间色，如胭脂、藕荷般柔和之色。');

-- 1.2 中国传统色 (子节点，挂载在基础色下)
-- (注：game_color 字段用于将此古代色精准映射回上面的11种基础色，供玩家选择)
INSERT INTO knowledge_nodes (id, category, name, parent_id, game_color, hex_code, description) VALUES
-- 红色系细分
('K_COL_RED_ZHUSHA', 'color', '朱（朱砂）', 'K_COL_RED', '红', '#B93A32', '硫化汞天然矿物，最贵重的红颜料，沉稳正红，覆盖力强，历久不褪。漆器朱髹主色。'),
('K_COL_RED_YINZHU','color', '银朱', 'K_COL_RED', '红', '#E74C3C', '水银与硫黄人工升炼成的硫化汞，色偏橙亮朱红。'),
('K_COL_RED_DAN',    'color', '丹', 'K_COL_RED', '红', '#C0392B', '即朱砂。「丹漆」即朱漆，见《髹饰录》。'),
('K_COL_RED_ZHE',    'color', '赭石', 'K_COL_BROWN', '棕', '#955539', '赤铁矿粉，土红、暗砖红，极稳定的大地色系。'),
('K_COL_RED_YANZHI', 'color', '胭脂', 'K_COL_RED', '粉', '#9D2933', '红蓝花汁制，桃红至浓红，常用于漆器彩绘人物衣饰。'),
('K_COL_RED_QIAN',   'color', '茜（绛）', 'K_COL_RED', '红', '#800000', '茜草根染丝帛，暗红、绛红。'),
-- 黄色系细分
('K_COL_YEL_TENG',   'color', '藤黄', 'K_COL_YELLOW', '黄', '#D4AF37', '海藤树树脂，明亮柠檬黄，多用于点缀花蕊、鸟兽眼睛。'),
('K_COL_YEL_ZHI',    'color', '栀黄', 'K_COL_YELLOW', '黄', '#E6A23C', '栀子果染，暖黄，宫廷织物与食品着色。'),
('K_COL_YEL_QIU',    'color', '秋香色', 'K_COL_YELLOW', '黄', '#C9A861', '黄掺绿褐，清代流行间色，柔和温润。'),
('K_COL_YEL_MING',   'color', '明黄', 'K_COL_YELLOW', '黄', '#FFD700', '正黄提纯，清代帝后专用色。'),
-- 青色与绿色系细分
('K_COL_GRN_SHILV',  'color', '石绿', 'K_COL_GREEN', '绿', '#4A7C59', '孔雀石研磨，沉稳的青绿，青绿山水设色主角。'),
('K_COL_GRN_TONGLV', 'color', '铜绿', 'K_COL_GREEN', '绿', '#2E8B57', '铜器锈层，深绿带蓝。'),
('K_COL_GRN_CONG',   'color', '葱倩', 'K_COL_GREEN', '绿', '#228B22', '葱心之绿，鲜嫩深绿。'),
('K_COL_BLU_QING',   'color', '青', 'K_COL_BLUE', '青', '#2E4E7E', '五正色之首。蓝绿之间的东方色。'),
('K_COL_BLU_SHIQING','color', '石青', 'K_COL_BLUE', '蓝', '#1E90FF', '蓝铜矿研磨，沉着的天蓝，不褪色。'),
('K_COL_BLU_QUNQING','color', '群青', 'K_COL_BLUE', '蓝', '#0000CD', '青金石研磨，极贵，明艳宝蓝，敦煌壁画主色。'),
('K_COL_BLU_TIANQING','color','天青', 'K_COL_BLUE', '青', '#D3E0E7', '雨后天空之色，极淡的蓝灰绿。'),
('K_COL_BLU_YUEBAI','color', '月白', 'K_COL_BLUE', '白', '#E8F0F2', '月光之色，极淡的蓝，近白。'),
-- 紫色系细分
('K_COL_PUR_ZI',     'color', '紫', 'K_COL_PURPLE', '紫', '#5B3A4A', '紫草根染，染料难得故价贵，青紫至红紫。'),
('K_COL_PUR_QINGLIAN','color','青莲', 'K_COL_PURPLE', '紫', '#8A2BE2', '蓝紫，佛画莲花色。'),
('K_COL_PUR_OUHE',   'color', '藕荷', 'K_COL_PURPLE', '粉', '#D8BFD8', '紫加粉，浅紫，清代织物流行色。'),
-- 黑色系细分
('K_COL_BLK_XUAN',   'color', '玄', 'K_COL_BLACK', '黑', '#1A1A1A', '黑中带赤，天之色。'),
('K_COL_BLK_ZAO',    'color', '皂', 'K_COL_BLACK', '黑', '#2B2B2B', '橡实染黑，乌黑。'),
('K_COL_BLK_DAI',    'color', '黛', 'K_COL_BLACK', '黑', '#333333', '石黛画眉，青黑。'),
('K_COL_BLK_MO',     'color', '墨色', 'K_COL_BLACK', '黑', '#101010', '松烟、油烟墨，墨分五色。'),
-- 白色系细分
('K_COL_WHT_HAFEN',  'color', '蛤粉', 'K_COL_WHITE', '白', '#F5F5DC', '贝壳煅烧研粉，温润珠光白，工笔画提白。'),
('K_COL_WHT_QIANFEN','color', '铅粉', 'K_COL_WHITE', '白', '#FFFFFF', '铅经醋熏制成，粉白，易氧化返铅变黑。'),
-- 金属色 (特殊映射)
('K_COL_MET_MIJIN',  'color', '泥金', 'K_COL_YELLOW', '黄', '#DAA520', '金箔研粉调入胶漆，亚光金。'),
('K_COL_MET_KUJIN',  'color', '库金', 'K_COL_YELLOW', '黄', '#FFD700', '含金约98%的金箔，正金红黄，沉稳辉煌。'),
('K_COL_MET_YIN',    'color', '银', 'K_COL_WHITE', '白', '#C0C0C0', '银箔、银粉，冷光银白。');


-- ==========================================
-- 2. 材质知识图谱 (The Materials)
-- ==========================================
-- 顶层分类
INSERT INTO knowledge_nodes (id, category, name, description) VALUES
('K_MAT_QI', 'material', '大漆原料', '漆器的灵魂材料。'),
('K_MAT_TAI', 'material', '胎体材质', '漆器的骨架。胎为骨，漆为衣。');

-- 原料与胎体大类 (包含属性字典的名字)
INSERT INTO knowledge_nodes (id, category, name, parent_id, description) VALUES
('K_MAT_QI_SHENG', 'material', '生漆', 'K_MAT_QI', '从漆树割取的天然液汁。'),
('K_MAT_QI_SE',    'material', '色漆', 'K_MAT_QI', '调入颜料制成。'),
('K_MAT_MU',       'material', '木胎', 'K_MAT_TAI', '最常见最传统。'),
('K_MAT_TUO',      'material', '脱胎/夹纻胎', 'K_MAT_TAI', '去模存壳，轻如浮云。'),
('K_MAT_ZHU',      'material', '竹胎', 'K_MAT_TAI', '南方地域漆器常用。'),
('K_MAT_PI',       'material', '皮胎', 'K_MAT_TAI', '柔韧耐形变。'),
('K_MAT_TAO',      'material', '陶胎', 'K_MAT_TAI', '陶器外壁髹漆。'),
('K_MAT_CI',       'material', '瓷胎', 'K_MAT_TAI', '瓷器外壁髹漆。'),
('K_MAT_JIN',      'material', '金属胎', 'K_MAT_TAI', '铜胎、金银胎。'),
('K_MAT_SHA',      'material', '漆砂胎', 'K_MAT_TAI', '大漆混合细砂、瓦灰。');

-- 细分材质
INSERT INTO knowledge_nodes (id, category, name, parent_id, description) VALUES
('K_MAT_MU_ZHUO', 'material', '斫木胎', 'K_MAT_MU', '整木雕斫。'),
('K_MAT_MU_JUAN', 'material', '圈叠胎', 'K_MAT_MU', '木片/竹片圈叠成型。'),
('K_MAT_ZHU_JI',  'material', '积竹胎', 'K_MAT_ZHU', '细竹篾捆扎胶合。'),
('K_MAT_ZHI',     'material', '纸胎', 'K_MAT_TAI', '多层厚纸裱合，极轻。'),
('K_MAT_GU',      'material', '骨角胎', 'K_MAT_TAI', '牛角、兽骨为胎，体量小。');


-- ==========================================
-- 3. 纹样知识图谱 (The Patterns)
-- ==========================================
-- 大类 (包含属性字典的名字)
INSERT INTO knowledge_nodes (id, category, name, description) VALUES
('K_PAT_SU',     'pattern', '无/素面', '不施花纹，以造型和漆色取胜。'),
('K_PAT_JH',     'pattern', '几何/气象纹', '体现古人对自然的敬畏。'),
('K_PAT_ZW',     'pattern', '花草植物纹', '寓意富贵、高洁。'),
('K_PAT_SS',     'pattern', '兽纹/神兽纹', '象征权威与辟邪。'),
('K_PAT_NS',     'pattern', '鸟兽虫鱼纹', '自然界飞禽走兽的描绘。'),
('K_PAT_RW',     'pattern', '人物叙事纹', '展现宴乐、戏曲、神话。'),
('K_PAT_SL',     'pattern', '山水楼阁纹', '自然景观与建筑。'),
('K_PAT_TW',     'pattern', '天文星象纹', '古人观测天象的记录。'),
('K_PAT_JX',     'pattern', '吉祥符号文字纹', '八吉祥、吉语等。');

-- 细分子类
INSERT INTO knowledge_nodes (id, category, name, parent_id, description) VALUES
('K_PAT_JH_YUNLEI', 'pattern', '云雷纹', 'K_PAT_JH', '连续回旋线条。'),
('K_PAT_JH_HUI',    'pattern', '回纹', 'K_PAT_JH', '横竖短线折绕。'),
('K_PAT_JH_JIANG',  'pattern', '海水江崖', 'K_PAT_JH', '波涛与山崖。'),
('K_PAT_ZW_LIAN',   'pattern', '莲瓣纹', 'K_PAT_ZW', '莲花花瓣。'),
('K_PAT_ZW_MUDAN',  'pattern', '牡丹纹', 'K_PAT_ZW', '富贵之花。'),
('K_PAT_ZW_ZHIZI',  'pattern', '栀子花', 'K_PAT_ZW', '元代经典。'),
('K_PAT_SS_LONG',   'pattern', '龙纹', 'K_PAT_SS', '云龙、双龙戏珠。'),
('K_PAT_SS_QILIN',  'pattern', '麒麟纹', 'K_PAT_SS', '祥瑞神兽。'),
('K_PAT_SS_TAOTIE', 'pattern', '饕餮纹', 'K_PAT_SS', '商周经典。'),
('K_PAT_NS_FENG',   'pattern', '凤鸟纹', 'K_PAT_NS', '吉祥瑞鸟。'),
('K_PAT_NS_HE',     'pattern', '仙鹤纹', 'K_PAT_NS', '长寿高洁。'),
('K_PAT_NS_YU',     'pattern', '鱼藻纹', 'K_PAT_NS', '年年有余。'),
('K_PAT_NS_CHONG',  'pattern', '草虫纹', 'K_PAT_NS', '秋蝉蝈蝈。'),
('K_PAT_RW_YINGXI', 'pattern', '婴戏图', 'K_PAT_RW', '儿童嬉戏。'),
('K_PAT_RW_GAOSHI', 'pattern', '高士图', 'K_PAT_RW', '文人雅士。'),
('K_PAT_SL_SHAN',   'pattern', '山水图', 'K_PAT_SL', '观瀑、秋山。'),
('K_PAT_SL_LOU',    'pattern', '楼阁图', 'K_PAT_SL', '亭台楼阁。'),
('K_PAT_TW_SISHEN', 'pattern', '四神纹', 'K_PAT_TW', '青龙白虎朱雀玄武。'),
('K_PAT_TW_28XIU',  'pattern', '二十八宿', 'K_PAT_TW', '星象坐标。'),
('K_PAT_JX_BABAO',  'pattern', '八吉祥', 'K_PAT_JX', '佛教法器。');


-- ==========================================
-- 4. 技艺知识图谱 (The Techniques)
-- ==========================================
-- 大类 (包含属性字典的名字)
INSERT INTO knowledge_nodes (id, category, name, description) VALUES
('K_TEC_DANSE', 'technique', '基础单色类', '素髹/髹涂（T01）即属此类。'),
('K_TEC_MIAOHUI','technique', '描绘类', '用笔或刀勾勒。'),
('K_TEC_DIAOLOU','technique', '雕镂类', '在漆层上雕刻。'),
('K_TEC_XIANGQIAN','technique', '镶嵌类', '嵌贝壳、金银等。'),
('K_TEC_BANWEN','technique', '斑纹肌理类', '自然起皱纹理。'),
('K_TEC_DIFANG','technique', '地方特色类', '特定地域工艺。');

-- 细分子类
INSERT INTO knowledge_nodes (id, category, name, parent_id, description) VALUES
('K_TEC_SUXIU',   'technique', '素髹', 'K_TEC_DANSE', '单色成器。'),
('K_TEC_CAIHUI',  'technique', '彩绘/描漆', 'K_TEC_MIAOHUI', '彩漆直接画。'),
('K_TEC_MIAOJIN', 'technique', '描金/识文', 'K_TEC_MIAOHUI', '金粉描绘或漆灰堆起。'),
('K_TEC_QJ',      'technique', '戗金/填漆', 'K_TEC_MIAOHUI', '刻划填金或填彩。'),
('K_TEC_DIAOQI',  'technique', '雕漆/剔红等', 'K_TEC_DIAOLOU', '厚漆层雕刻。'),
('K_TEC_KUANCAI', 'technique', '款彩', 'K_TEC_DIAOLOU', '刻去漆地填彩油。'),
('K_TEC_LUODIAN','technique', '螺钿', 'K_TEC_XIANGQIAN', '贝壳镶嵌。'),
('K_TEC_PINGTUO','technique', '金银平脱', 'K_TEC_XIANGQIAN', '金银片与漆面齐平。'),
('K_TEC_BAOBAO',  'technique', '百宝嵌', 'K_TEC_XIANGQIAN', '多种珍宝镶嵌。'),
('K_TEC_XIPI',    'technique', '犀皮漆', 'K_TEC_BANWEN', '色漆起皱磨平。'),
('K_TEC_TUOTAI',  'technique', '脱胎/薄料', 'K_TEC_DIFANG', '福州脱胎特色。'),
('K_TEC_TUIGUANG','technique', '推光漆', 'K_TEC_DIFANG', '手掌推擦光泽。');

-- 技艺进一步细分 (孙节点)
INSERT INTO knowledge_nodes (id, category, name, parent_id, description) VALUES
('K_TEC_TIHONG', 'technique', '剔红', 'K_TEC_DIAOQI', '纯红漆雕刻。'),
('K_TEC_TIHEI',  'technique', '剔黑', 'K_TEC_DIAOQI', '纯黑漆雕刻。'),
('K_TEC_TIXI',   'technique', '剔犀', 'K_TEC_DIAOQI', '红黑相间雕刻。'),
('K_TEC_TICAI',  'technique', '剔彩', 'K_TEC_DIAOQI', '多色漆分层雕刻。'),
('K_TEC_BOLUO',  'technique', '薄螺钿', 'K_TEC_LUODIAN', '极薄贝壳镶嵌。');


-- ==========================================
-- 5. 年代知识图谱 (The Eras)
-- ==========================================
-- 直接作为平铺节点展示
INSERT INTO knowledge_nodes (id, category, name, description) VALUES
('K_ERA_E01', 'era', '新石器时代', '跨湖桥漆弓与河姆渡朱漆碗，以红黑二色为主。'),
('K_ERA_E02', 'era', '夏商周', '深受青铜礼制影响，镶嵌工艺萌芽。'),
('K_ERA_E03', 'era', '春秋战国', '楚风浪漫，夹纻胎与透雕出现。'),
('K_ERA_E04', 'era', '汉代', '黄金时代，夹纻胎普及。'),
('K_ERA_E05', 'era', '唐代', '金银平脱鼎盛，胎体越界。'),
('K_ERA_E06', 'era', '宋代', '极简美学，素髹与戗金并存。'),
('K_ERA_E07', 'era', '元代', '雕漆巅峰，张成杨茂名家辈出。'),
('K_ERA_E08', 'era', '明代', '官民并峙，《髹饰录》诞生。'),
('K_ERA_E09', 'era', '清代', '宫廷集锦，繁缛精工。'),
('K_ERA_E10', 'era', '近现代', '非遗传承时代，流派复兴。');