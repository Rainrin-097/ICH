-- ==========================================
-- 5. 用户存档表
-- ==========================================

-- 用户解锁的常规漆器
CREATE TABLE user_unlocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, artifact_id)
);

-- 用户解锁的彩蛋
CREATE TABLE user_eggs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    egg_id UUID REFERENCES easter_eggs(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, egg_id)
);