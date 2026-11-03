-- 账号管理：允许当前登录用户注销自己的 Supabase Auth 账号
-- 请在 Supabase SQL Editor 中执行一次。
CREATE OR REPLACE FUNCTION public.delete_current_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION '必须登录后才能注销账号';
    END IF;

    DELETE FROM auth.users
    WHERE id = auth.uid();
END;
$$;

REVOKE ALL ON FUNCTION public.delete_current_account() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_current_account() TO authenticated;
