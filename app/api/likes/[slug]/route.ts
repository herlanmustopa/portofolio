import { NextRequest, NextResponse } from "next/server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// GET - Fetch like count for a slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ likes: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/get/likes:${slug}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    const likes = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ likes });
  } catch {
    return NextResponse.json({ likes: 0 });
  }
}

// POST - Increment like count for a slug
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ likes: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/incr/likes:${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const likes = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ likes });
  } catch {
    return NextResponse.json({ likes: 0 });
  }
}
