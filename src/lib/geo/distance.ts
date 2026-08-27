interface RadiusQueryParams {
  lng: number;
  lat: number;
  radiusInMeters: number;
  locationColumn?: string;
}

/**
 * Calculates the Haversine distance between two sets of coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Helper for PostGIS raw queries (compatible with Prisma $queryRaw).
 * Returns parameterized SQL text template and ordered argument array.
 */
export function getParameterizedRadiusQuery(
  lng: number,
  lat: number,
  radiusInMeters: number,
  startParamIndex: number = 1,
  locationColumn: string = 'location'
) {
  const p1 = `$${startParamIndex}`;
  const p2 = `$${startParamIndex + 1}`;
  const p3 = `$${startParamIndex + 2}`;

  return {
    sql: `ST_DWithin(${locationColumn}, ST_SetSRID(ST_MakePoint(${p1}, ${p2}), 4326)::geography, ${p3})`,
    values: [lng, lat, radiusInMeters]
  };
}