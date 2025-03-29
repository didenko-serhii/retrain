// app/api/search/route.ts
import { NextResponse } from 'next/server'
import { getTrainLocations } from '@/lib/getTrainLocations'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const trains = await getTrainLocations()

  const filtered = trains.filter(
    (train: { trainNumber: number }) =>
      train.trainNumber.toString().includes(q)
  )

  return NextResponse.json(filtered.slice(0, 10))
}
