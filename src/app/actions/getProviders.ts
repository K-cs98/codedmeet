'use server'

import { prisma } from '@/lib/prisma'
import { ProviderProps } from '@/components/directory/ProviderCard'

interface RawQueryResult {
  id: string
  name: string
  role: string
  hourlyRate: string | number
  isVerified: boolean
  isActive: boolean
  avatarUrl: string
  tags: string[]
  distanceKm: string | number
}

export async function getNearbyProviders(
  userLat: number,
  userLng: number,
  radiusInKm: number = 25
): Promise<ProviderProps[]> {
  try {
    const radiusMeters = radiusInKm * 1000

    const providers = await prisma.$queryRaw<RawQueryResult[]>`
      SELECT 
        id, 
        name, 
        role, 
        "hourlyRate", 
        "isVerified", 
        "isActive",
        "avatarUrl",
        tags,
        ROUND(
          (ST_Distance(
            location, 
            ST_SetSRID(ST_MakePoint(${userLng}, ${userLat}), 4326)::geography
          ) / 1000)::numeric, 1
        ) AS "distanceKm"
      FROM "User"
      WHERE ST_DWithin(
        location, 
        ST_SetSRID(ST_MakePoint(${userLng}, ${userLat}), 4326)::geography, 
        ${radiusMeters}
      )
      ORDER BY "distanceKm" ASC;
    `

    return providers.map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      hourlyRate: Number(p.hourlyRate),
      distanceKm: Number(p.distanceKm),
      isVerified: p.isVerified,
      isActive: p.isActive,
      avatarUrl: p.avatarUrl,
      tags: p.tags || [],
    }))
  } catch (error) {
    console.error('Failed to fetch nearby providers:', error)
    return []
  }
}