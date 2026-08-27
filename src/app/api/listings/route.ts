import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        organizer: true,
        tags: true,
      },
    });

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}