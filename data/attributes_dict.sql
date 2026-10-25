-- ==========================================
-- 1. 属性字典表 (统一管理所有代号)
-- ==========================================
DROP TABLE IF EXISTS attributes;
CREATE TABLE attributes (
    id TEXT PRIMARY KEY,            -- 代号
    category TEXT NOT NULL,         -- 分类: color, material, pattern, technique, era
    name TEXT NOT NULL,             -- 中文名称
    is_game_property BOOLEAN DEFAULT TRUE -- 是否在左侧工具栏显示 (年代设为false)
);

-- 1. 颜色 (C01-C12)
INSERT INTO attributes (id, category, name, is_game_property) VALUES
('C01', 'color', '黑', TRUE), ('C02', 'color', '白', TRUE),
('C03', 'color', '灰', TRUE), ('C04', 'color', '红', TRUE),
('C05', 'color', '橙', TRUE), ('C06', 'color', '黄', TRUE),
('C07', 'color', '绿', TRUE), ('C08', 'color', '青', TRUE),
('C09', 'color', '蓝', TRUE), ('C10', 'color', '紫', TRUE),
('C11', 'color', '棕', TRUE), ('C12', 'color', '粉', TRUE);

-- 2. 材质 (M01-M08)
INSERT INTO attributes (id, category, name, is_game_property) VALUES
('M01', 'material', '木胎', TRUE), ('M02', 'material', '脱胎/夹纻胎', TRUE),
('M03', 'material', '陶胎', TRUE), ('M04', 'material', '皮胎', TRUE),
('M05', 'material', '竹胎', TRUE), ('M06', 'material', '瓷胎', TRUE),
('M07', 'material', '金属胎', TRUE), ('M08', 'material', '漆砂胎', TRUE);

-- 3. 纹样 (P00-P07, 合并了P04和P05)
INSERT INTO attributes (id, category, name, is_game_property) VALUES
('P00', 'pattern', '无/素面', TRUE), ('P01', 'pattern', '几何/气象纹', TRUE),
('P02', 'pattern', '花草植物纹', TRUE), ('P03', 'pattern', '兽纹/神兽纹', TRUE),
('P04', 'pattern', '鸟兽虫鱼纹', TRUE), ('P06', 'pattern', '人物叙事纹', TRUE),
('P07', 'pattern', '山水楼阁纹', TRUE), ('P08', 'pattern', '天文星象纹', TRUE);

-- 4. 技法 (T01-T12，仅作知识图谱展示，不参与左侧合成)
INSERT INTO attributes (id, category, name, is_game_property) VALUES
('T01', 'technique', '素髹/髹涂', FALSE), ('T02', 'technique', '彩绘/描漆', FALSE),
('T03', 'technique', '雕漆/剔红等', FALSE), ('T04', 'technique', '螺钿', FALSE),
('T05', 'technique', '戗金/填漆', FALSE), ('T06', 'technique', '金银平脱', FALSE),
('T07', 'technique', '描金/识文', FALSE), ('T08', 'technique', '百宝嵌', FALSE),
('T09', 'technique', '款彩', FALSE), ('T10', 'technique', '脱胎/薄料', FALSE),
('T11', 'technique', '犀皮漆', FALSE), ('T12', 'technique', '推光漆', FALSE);

-- 5. 年代 (E01-E10，不显示在左侧，用于分类或隐藏判定)
INSERT INTO attributes (id, category, name, is_game_property) VALUES
('E01', 'era', '新石器时代', FALSE), ('E02', 'era', '夏商周', FALSE),
('E03', 'era', '春秋战国', FALSE), ('E04', 'era', '汉代', FALSE),
('E05', 'era', '唐代', FALSE), ('E06', 'era', '宋代', FALSE),
('E07', 'era', '元代', FALSE), ('E08', 'era', '明代', FALSE),
('E09', 'era', '清代', FALSE), ('E10', 'era', '近现代', FALSE);