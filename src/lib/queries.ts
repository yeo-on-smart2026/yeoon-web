import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  name: string;
  birth_date: string;
  death_date: string;
  quote: string;
  main_image: string | null;
};

export type MemorialMessage = {
  id: string;
  date: string;
  relation: string;
  title: string;
  body: string[];
  photo: string | null;
};

export type Memory = {
  date: string;
  title: string;
  desc: string[];
  src: string;
};

/** active_session.profile_id — NFC로 안착된 사용자가 없으면 null */
export async function getActiveProfileId(): Promise<string | null> {
  const { data, error } = await supabase
    .from("active_session")
    .select("profile_id")
    .eq("id", "kiosk-01")
    .single();

  if (error || !data) return null;
  return data.profile_id;
}

export async function getProfile(profileId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, birth_date, death_date, quote, main_image")
    .eq("id", profileId)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getMessages(profileId: string): Promise<MemorialMessage[]> {
  const { data, error } = await supabase
    .from("memorial_messages")
    .select("id, date, relation, title, body, photo")
    .eq("profile_id", profileId)
    .order("sort", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getMemories(profileId: string): Promise<Memory[]> {
  const { data, error } = await supabase
    .from("memories")
    .select("date, title, desc, src")
    .eq("profile_id", profileId)
    .order("sort", { ascending: true });

  if (error || !data) return [];
  return data;
}

/** 현재 안착된 사용자의 profile을 한 번에 가져옴 — 없으면 null */
export async function getActiveProfile(): Promise<Profile | null> {
  const profileId = await getActiveProfileId();
  if (!profileId) return null;
  return getProfile(profileId);
}
