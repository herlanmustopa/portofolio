import { NextRequest, NextResponse } from "next/server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// GET - Fetch view count for a slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ views: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/get/pageviews:${slug}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    const views = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}

// POST - Increment view count for a slug
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ views: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/incr/pageviews:${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const views = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
