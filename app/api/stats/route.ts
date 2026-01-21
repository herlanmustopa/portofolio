import { NextRequest, NextResponse } from "next/server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// POST - Get all stats (views, likes, shares) for multiple slugs
export async function POST(request: NextRequest) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ stats: {} });
  }

  try {
    const { slugs } = await request.json();

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json({ stats: {} });
    }

    // Build keys for all stats
    const viewKeys = slugs.map((slug: string) => `pageviews:${slug}`);
    const likeKeys = slugs.map((slug: string) => `likes:${slug}`);
    const shareKeys = slugs.map((slug: string) => `shares:${slug}`);
    const allKeys = [...viewKeys, ...likeKeys, ...shareKeys];

    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/mget/${allKeys.join("/")}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    const results = data.result || [];

    // Map results back to slugs
    const stats: Record<string, { views: number; likes: number; shares: number }> = {};
    const slugCount = slugs.length;

    slugs.forEach((slug: string, index: number) => {
      stats[slug] = {
        views: results[index] ? parseInt(results[index], 10) : 0,
        likes: results[index + slugCount] ? parseInt(results[index + slugCount], 10) : 0,
        shares: results[index + slugCount * 2] ? parseInt(results[index + slugCount * 2], 10) : 0,
      };
    });

    return NextResponse.json({ stats });
  } catch {
    return NextResponse.json({ stats: {} });
  }
}
