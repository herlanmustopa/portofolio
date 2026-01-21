import { NextRequest, NextResponse } from "next/server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// POST - Get multiple view counts at once
export async function POST(request: NextRequest) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ views: {} });
  }

  try {
    const { slugs } = await request.json();

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json({ views: {} });
    }

    // Build MGET command for all slugs
    const keys = slugs.map((slug: string) => `pageviews:${slug}`);
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/mget/${keys.join("/")}`,
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
    const views: Record<string, number> = {};
    slugs.forEach((slug: string, index: number) => {
      views[slug] = results[index] ? parseInt(results[index], 10) : 0;
    });

    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: {} });
  }
}
