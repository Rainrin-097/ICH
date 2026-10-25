-- ==========================================
-- 4. 彩蛋配方表
-- ==========================================
CREATE TABLE easter_eggs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    req_material TEXT REFERENCES attributes(id),
    req_colors TEXT[] NOT NULL,
    req_technique TEXT REFERENCES attributes(id),
    req_pattern TEXT REFERENCES attributes(id),
    hint_text TEXT NOT NULL,
    target_url TEXT NOT NULL
);

-- 插入测试彩蛋
INSERT INTO easter_eggs (name, req_material, req_colors, req_technique, req_pattern, hint_text, target_url) VALUES (
    '远海的回音', 'M02', ARRAY['C04', 'C02'], 'T02', 'P03',
    '你似乎听到了远古海洋的潮汐声...', 'https://www.bilibili.com/'
);