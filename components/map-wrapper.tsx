'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SearchBar from './search';

const Map = dynamic(() => import('./map'), { ssr: false });

type Train = {
  trainNumber: number
  departureDate: string
  trainLocations?: {
    location: [number, number]
    speed: number
    timestamp: string
  }[]
}

export default function MapWrapper() {
  const [trains, setTrains] = useState<Train[]>([])
  const [focusedTrain, setFocusedTrain] = useState<Train | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/trains');
      const data = await res.json();
      setTrains(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      <SearchBar onSelect={setFocusedTrain} />
      <Map trains={trains} focusedTrain={focusedTrain} />
    </div>
  );
}
