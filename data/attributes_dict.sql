-- ==========================================
-- 1. 属性字典表 (统一管理所有代号)
-- ==========================================
DROP TABLE IF EXISTS attributes;
CREATE TABLE attributes (
    id TEXT PRIMARY KEY,            -- 代号
    category TEXT NOT NULL,         -- 分类: color, material, pattern, technique, era
    name TEXT NOT NULL,             -- 中文名称
    is_game_property BOOLEAN DEFAULT TRUE, -- 是否在左侧工具栏显示 (年代设为false)
    parent_id TEXT REFERENCES attributes(id) -- 合并后宽分类的层级关系 (细分词条指向其游戏主代码)
);

-- ==========================================
-- 游戏一级属性 颜色 7 种: 黑灰系 / 白色 / 红橙粉系 / 黄色 / 青绿系 / 蓝紫系 / 棕色
-- 原 C03 灰并入 C01；C05 橙、C12 粉并入 C04；C08 青并入 C07；C10 紫并入 C09
-- ==========================================
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('C01', 'color', '黑灰系', TRUE, NULL),
('C02', 'color', '白色', TRUE, NULL),
('C04', 'color', '红橙粉系', TRUE, NULL),
('C06', 'color', '黄色', TRUE, NULL),
('C07', 'color', '青绿系', TRUE, NULL),
('C09', 'color', '蓝紫系', TRUE, NULL),
('C11', 'color', '棕色', TRUE, NULL);

-- 保留的原始颜色细分词条 (仅用于知识图谱/档案，不进入游戏左侧工具栏)
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('C03', 'color', '灰', FALSE, 'C01'),
('C05', 'color', '橙', FALSE, 'C04'),
('C08', 'color', '青', FALSE, 'C07'),
('C10', 'color', '紫', FALSE, 'C09'),
('C12', 'color', '粉', FALSE, 'C04');

-- ==========================================
-- 游戏一级属性 材质 6 种: 木胎 / 脱胎·夹纻胎 / 陶瓷胎 / 皮·竹胎 / 金属胎 / 漆砂胎
-- 原 M06 瓷胎并入 M03；M05 竹胎并入 M04
-- ==========================================
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('M01', 'material', '木胎', TRUE, NULL),
('M02', 'material', '脱胎/夹纻胎', TRUE, NULL),
('M03', 'material', '陶瓷胎', TRUE, NULL),
('M04', 'material', '皮/竹胎', TRUE, NULL),
('M07', 'material', '金属胎', TRUE, NULL),
('M08', 'material', '漆砂胎', TRUE, NULL);

-- 保留的原始材质细分词条 (M05 竹胎 → M04；M06 瓷胎 → M03)
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('M05', 'material', '竹胎', FALSE, 'M04'),
('M06', 'material', '瓷胎', FALSE, 'M03');

-- ==========================================
-- 游戏一级属性 纹样 6 种: 无·素面 / 几何·气象纹 / 花草植物纹 / 动物题材纹 / 人物与场景纹 / 天文星象纹
-- 原 P04 鸟兽虫鱼纹并入 P03；P07 山水楼阁纹并入 P06
-- ==========================================
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('P00', 'pattern', '无/素面', TRUE, NULL),
('P01', 'pattern', '几何/气象纹', TRUE, NULL),
('P02', 'pattern', '花草植物纹', TRUE, NULL),
('P03', 'pattern', '动物题材纹', TRUE, NULL),
('P06', 'pattern', '人物与场景纹', TRUE, NULL),
('P08', 'pattern', '天文星象纹', TRUE, NULL);

-- 保留的原始纹样细分词条 (P04 鸟兽虫鱼纹 → P03；P07 山水楼阁纹 → P06)
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('P04', 'pattern', '鸟兽虫鱼纹', FALSE, 'P03'),
('P07', 'pattern', '山水楼阁纹', FALSE, 'P06');

-- 4. 技法 (T01-T12，仅作知识图谱展示，不参与左侧合成)
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('T01', 'technique', '素髹/髹涂', FALSE, NULL), ('T02', 'technique', '彩绘/描漆', FALSE, NULL),
('T03', 'technique', '雕漆/剔红等', FALSE, NULL), ('T04', 'technique', '螺钿', FALSE, NULL),
('T05', 'technique', '戗金/填漆', FALSE, NULL), ('T06', 'technique', '金银平脱', FALSE, NULL),
('T07', 'technique', '描金/识文', FALSE, NULL), ('T08', 'technique', '百宝嵌', FALSE, NULL),
('T09', 'technique', '款彩', FALSE, NULL), ('T10', 'technique', '脱胎/薄料', FALSE, NULL),
('T11', 'technique', '犀皮漆', FALSE, NULL), ('T12', 'technique', '推光漆', FALSE, NULL);

-- 5. 年代 (E01-E10，不显示在左侧，用于分类或隐藏判定)
INSERT INTO attributes (id, category, name, is_game_property, parent_id) VALUES
('E01', 'era', '新石器时代', FALSE, NULL), ('E02', 'era', '夏商周', FALSE, NULL),
('E03', 'era', '春秋战国', FALSE, NULL), ('E04', 'era', '汉代', FALSE, NULL),
('E05', 'era', '唐代', FALSE, NULL), ('E06', 'era', '宋代', FALSE, NULL),
('E07', 'era', '元代', FALSE, NULL), ('E08', 'era', '明代', FALSE, NULL),
('E09', 'era', '清代', FALSE, NULL), ('E10', 'era', '近现代', FALSE, NULL);
