import { NextRequest, NextResponse } from "next/server";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// GET - Fetch share count for a slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ shares: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/get/shares:${slug}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    const shares = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ shares });
  } catch {
    return NextResponse.json({ shares: 0 });
  }
}

// POST - Increment share count for a slug
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ shares: 0 });
  }

  try {
    const response = await fetch(
      `${UPSTASH_REDIS_REST_URL}/incr/shares:${slug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const shares = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ shares });
  } catch {
    return NextResponse.json({ shares: 0 });
  }
}
