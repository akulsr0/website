import { useLayoutEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { isProduction } from ".";

const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_DB_URL!;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

export const supabase = createClient(dbUrl, apiKey);

export async function getPageViews(opts: any) {
  const { slug } = opts;
  const { data } = await supabase
    .from("page_views")
    .select("*")
    .eq("slug", slug);

  if (data?.length) return data[0].views;
  return 0;
}

export async function incrementPageView(opts: any) {
  const { path, type, url, category, date, slug, views } = opts;

  if (views === 0) {
    const { data } = await supabase
      .from("page_views")
      .insert({
        category,
        slug,
        path,
        url,
        date,
        views: 1,
        updated_at: new Date(),
        type,
      })
      .select();

    if (!data?.length) return null;
    return data[0];
  }

  const { data } = await supabase
    .from("page_views")
    .update({ views: views + 1, updated_at: new Date() })
    .eq("slug", slug)
    .select();

  if (!data?.length) return null;
  return data[0];
}

export function usePageViews(opts: any) {
  const { slug, category, path, url, date, type } = opts;

  const [views, setViews] = useState<number | null>(null);

  async function getSetViews() {
    const currentViews = await getPageViews({ slug });

    const data = await incrementPageView({
      views: currentViews,
      category,
      slug,
      path,
      url,
      date: new Date(date),
      type,
    });

    if (data?.views) {
      setViews(data?.views);
    }
  }

  useLayoutEffect(() => {
    const isProd = isProduction();
    if (isProd) {
      getSetViews();
    }
  }, [slug]);

  return views;
}
