-- ==========================================
-- 6. 安全策略 (RLS) 与 索引优化
-- ==========================================

-- 开启 RLS
ALTER TABLE attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inheritors ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifact_inheritors ENABLE ROW LEVEL SECURITY;
ALTER TABLE easter_eggs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_eggs ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取静态字典和配方表
CREATE POLICY "公开读取 attributes" ON attributes FOR SELECT USING (true);
CREATE POLICY "公开读取 inheritors" ON inheritors FOR SELECT USING (true);
CREATE POLICY "公开读取 artifacts" ON artifacts FOR SELECT USING (true);
CREATE POLICY "公开读取 artifact_inheritors" ON artifact_inheritors FOR SELECT USING (true);
CREATE POLICY "公开读取 easter_eggs" ON easter_eggs FOR SELECT USING (true);

-- 限制用户只能查看/插入自己的记录
CREATE POLICY "用户读 own unlocks" ON user_unlocks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户插 own unlocks" ON user_unlocks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户读 own eggs" ON user_eggs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户插 own eggs" ON user_eggs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 建立外键索引，提高查询速度
CREATE INDEX idx_user_unlocks_user ON user_unlocks(user_id);
CREATE INDEX idx_user_eggs_user ON user_eggs(user_id);