-- ==========================================
-- 4. 彩蛋配方表
-- ==========================================
DROP TABLE IF EXISTS easter_eggs;
CREATE TABLE easter_eggs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    req_material TEXT REFERENCES attributes(id),
    req_colors TEXT[] NOT NULL,
    req_technique TEXT REFERENCES attributes(id),
    req_pattern TEXT REFERENCES attributes(id),
    hint_text TEXT NOT NULL,
    target_url TEXT
);

INSERT INTO easter_eggs (name, req_material, req_colors, req_technique, req_pattern, hint_text, target_url) VALUES
('雕漆隐花', 'M02', ARRAY['C09','C06','C01'], NULL, 'P02',
 '“雕漆隐花”是成都漆艺中极尽低调奢华的绝技。表面看似平滑光润的单色漆，迎着光或轻轻触摸，便能发现漆层之下隐藏的精美雕花。', 'https://www.bilibili.com/video/BV1TsmtY7Egu/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196'),
('起承转合', 'M03', ARRAY['C01'], NULL, 'P01',
 '中国非物质文化遗产基因数据库搜集、整合了中国非遗的多媒体资料，搭建知识图谱，并从工艺、色彩和纹案等维度进行拆解、再现与重组。', 'https://db.traditionowlab.cn/'),
('一生一事', 'M01', ARRAY['C11','C02'], NULL, 'P06',
 '《一生一事》演绎文物修复师择一事、终一生的极致浪漫与孤独，也让案头前无数个日日夜夜有了具体的回声。', 'https://www.bilibili.com/video/BV1TF4m1u7Zx/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196'),
('根本没有这样的漆器', 'M03', ARRAY['C09'], NULL, 'P08',
 '这是一件故意不存在于典藏档案中的组合：陶瓷胎、蓝紫色与天文星象纹。你合成的是一件只属于这个工坊的想象器物。', NULL),
('漆恋', 'M01', ARRAY['C02'], NULL, 'P02',
 '《漆恋》以漆工和漆器对话的独特视角，讲述两者之间深厚的情感联结与超越时空的精神羁绊。', 'https://www.bilibili.com/tr/video/BV1LBiTBTENx/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196'),
('当我在这里', 'M01', ARRAY['C01','C04','C06'], NULL, 'P06',
 '纪录电影《我在故宫修文物》的主题曲，在现代与古代的时空交叠中诠释文物医生择一事、终一生的工匠精神。', 'https://www.bilibili.com/video/BV1Xs411W7Zr/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196'),
('非遗之声', 'M04', ARRAY['C07','C11','C06'], NULL, 'P03',
 '中国非物质文化遗产网·中国非物质文化遗产数字博物馆，展示国家级非遗项目、代表性传承人、线上展览及影音资料。', 'https://www.ihchina.cn/'),
('lets play', 'M07', ARRAY['C09','C07'], NULL, 'P01',
 '一个很有意思的网站，带你从数字展览与互动内容中重新发现艺术。（可能需要魔法）', 'https://artsandculture.google.com/'),
('东方顶奢', 'M01', ARRAY['C01','C11'], NULL, 'P00',
 '这是关于中国传统大漆工艺的硬核科普，展现了漆器如何以时间与生命为代价成就千年不腐、温润如玉的品质。', 'https://www.bilibili.com/video/BV1gN41157W9/?share_source=copy_web&vd_source=e8fbede041c2b51fea8ff03a545bb196');