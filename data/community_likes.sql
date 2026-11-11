
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'community_post_likes'
          AND policyname = '用户查询自己的点赞'
    ) THEN
        CREATE POLICY "用户查询自己的点赞"
            ON public.community_post_likes
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'community_post_likes'
          AND policyname = '用户为自己点赞'
    ) THEN
        CREATE POLICY "用户为自己点赞"
            ON public.community_post_likes
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'community_post_likes'
          AND policyname = '用户取消自己的点赞'
    ) THEN
        CREATE POLICY "用户取消自己的点赞"
            ON public.community_post_likes
            FOR DELETE
            TO authenticated
            USING (auth.uid() = user_id);
    END IF;
END
$$;

-- 4. 触发器函数：自动维护 community_posts.likes_count
-- SECURITY DEFINER 允许函数以其所有者权限更新动态表。
-- 固定空 search_path，并对目标表使用完整 schema 名称，避免对象解析被劫持。
CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_posts
        SET likes_count = likes_count + 1
        WHERE id = NEW.post_id;

        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_posts
        SET likes_count = GREATEST(likes_count - 1, 0)
        WHERE id = OLD.post_id;

        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$;

-- 5. 创建触发器（已存在时保留，不先 DROP）
-- CREATE OR REPLACE FUNCTION 已更新同签名函数的定义；既有触发器会继续引用该函数。
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_trigger AS t
        WHERE t.tgname = 'trg_community_post_likes_count'
          AND t.tgrelid = 'public.community_post_likes'::regclass
          AND NOT t.tgisinternal
    ) THEN
        CREATE TRIGGER trg_community_post_likes_count
            AFTER INSERT OR DELETE ON public.community_post_likes
            FOR EACH ROW
            EXECUTE FUNCTION public.update_post_likes_count();
    END IF;
END
$$;

-- 6. 首次/重复迁移时校正计数
-- 锁定顺序与点赞写入路径一致：先点赞表，再动态表。
-- 这样校正期间不会有并发点赞插入/删除导致计数与记录短暂错位。
LOCK TABLE public.community_post_likes IN SHARE ROW EXCLUSIVE MODE;
LOCK TABLE public.community_posts IN SHARE ROW EXCLUSIVE MODE;

UPDATE public.community_posts AS p
SET likes_count = (
    SELECT COUNT(*)::INTEGER
    FROM public.community_post_likes AS l
    WHERE l.post_id = p.id
)
WHERE p.likes_count IS DISTINCT FROM (
    SELECT COUNT(*)::INTEGER
    FROM public.community_post_likes AS l
    WHERE l.post_id = p.id
);

COMMIT;

-- 说明：旧版前端模拟出来、从未写入点赞记录表的点赞数字无法还原。
-- 迁移后 likes_count 以 community_post_likes 中的真实记录为准。