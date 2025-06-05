"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    console.log(error);
    throw new Error(error?.message || "Failed to create companion");
  }

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select("*", { count: "exact" });

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to fetch companions");
  }

  return data;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error: err } = await supabase
    .from("companions")
    .select()
    .eq("id", id);
  if (err) return null;
  return data[0];
};

export const addToSessionHistory = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .insert({ companion_id: id, user_id: userId })
    .select();

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to add to session history");
  }

  return data[0];
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to fetch recent sessions");
  }

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq(`user_id`, userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to fetch user's sessions");
  }

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq(`author`, userId);

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to fetch user companions");
  }

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_active_companions" })) {
    limit = 3;
  } else if (has({ feature: "10_active_companions" })) {
    limit = 10;
  }
  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to fetch user's companions");
  }

  const companionCount = data?.length || 0;

  return companionCount < limit;
};
