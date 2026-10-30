import { supabase } from "./supabaseClient.js";

export async function saveUnlock(artifactId) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    window.showToast?.("无法获取登录状态，请稍后重试。", "error");
    return false;
  }
  if (!user) {
    window.showToast?.("请先登录。", "warning");
    return false;
  }

  const { error } = await supabase
    .from("user_unlocks")
    .insert({ user_id: user.id, artifact_id: artifactId });

  if (error) {
    if (error.code === "23505") return true;
    window.showToast?.(`保存解锁记录失败：${error.message}`, "error");
    return false;
  }
  return true;
}
