-- ==========================================
-- 2. 传承人表
-- ==========================================
CREATE TABLE inheritors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT
);

-- 插入测试数据
INSERT INTO inheritors (name, bio) VALUES
('张成', '元代雕漆名家，以剔红著称。'),
('杨茂', '元代雕漆名家，与张成齐名。');