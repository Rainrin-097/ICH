-- 广场动态与评论
CREATE TABLE community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    author_name TEXT NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 40),
    type TEXT NOT NULL CHECK (type IN ('discussion', 'recipe', 'egg')),
    content TEXT CHECK (content IS NULL OR char_length(content) <= 500),
    recipe TEXT CHECK (recipe IS NULL OR char_length(recipe) <= 120),
    artifact TEXT CHECK (artifact IS NULL OR char_length(artifact) <= 40),
    explanation TEXT CHECK (explanation IS NULL OR char_length(explanation) <= 300),
    status TEXT CHECK (status IS NULL OR status IN ('pending', 'verified')),
    likes_count INTEGER DEFAULT 0 NOT NULL CHECK (likes_count >= 0),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE community_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    author_name TEXT NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 40),
    content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 200),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公开读取广场动态" ON community_posts
    FOR SELECT USING (true);
CREATE POLICY "登录用户发布动态" ON community_posts
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "作者删除自己的动态" ON community_posts
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "公开读取广场评论" ON community_comments
    FOR SELECT USING (true);
CREATE POLICY "登录用户发表评论" ON community_comments
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "作者删除自己的评论" ON community_comments
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

CREATE INDEX idx_community_posts_created_at
    ON community_posts(created_at DESC);
CREATE INDEX idx_community_comments_post_id
    ON community_comments(post_id, created_at);
