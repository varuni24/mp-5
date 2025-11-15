import { NextResponse } from 'next/server';
import { getCollection, URLS_COLLECTION } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { url, alias } = body;

  try {
      new URL(url);
  } catch (error) {
      return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
      );
  }

  const collection = await getCollection(URLS_COLLECTION);
  const existing = await collection.findOne({ alias });
  if (existing) {
    return NextResponse.json({ error: 'Alias already taken!' }, { status: 400 });
  }

  const result = await collection.insertOne({ url: url, alias });
  if (!result.acknowledged) {
    return NextResponse.json({ error: 'Database insertion failed!' }, { status: 500 });
  }

  return NextResponse.json({success: true, alias, shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}`});
}
