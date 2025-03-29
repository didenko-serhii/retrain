import { getTrainLocations } from '@/lib/getTrainLocations';
import { NextResponse } from 'next/server';

export async function GET() {
  const trains = await getTrainLocations();
  return NextResponse.json(trains);
}
