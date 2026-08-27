import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateHaversineDistance } from '@/lib/geo/distance';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const radiusParam = searchParams.get('radius') || '10'; // default 10km

    if (!latParam || !lngParam) {
      return NextResponse.json(
        { error: 'Latitude (lat) and Longitude (lng) are required' },
        { status: 400 }
      );
    }

    const userLat = parseFloat(latParam);
    const userLng = parseFloat(lngParam);
    const maxRadius = parseFloat(radiusParam);

    const listings = await prisma.listing.findMany({
      include: {
        organizer: true,
        tags: true,
      },
    });

    const nearbyListings = listings
      .map((listing) => {
        const distance = calculateHaversineDistance(
          userLat,
          userLng,
          listing.latitude,
          listing.longitude
        );
        return { ...listing, distance };
      })
      .filter((listing) => listing.distance <= maxRadius);

    return NextResponse.json(nearbyListings, { status: 200 });
  } catch (error) {
    console.error('Error fetching nearby listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nearby listings' },
      { status: 500 }
    );
  }
}