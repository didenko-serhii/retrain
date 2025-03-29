'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SearchBar from './search'

const Map = dynamic(() => import('./map'), { ssr: false });

export default function MapWrapper() {
  const [trains, setTrains] = useState([])
  const [focusedTrain, setFocusedTrain] = useState(null)

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
      <div className="absolute top-4 left-4 z-[999]">
        <SearchBar onSelect={setFocusedTrain} />
      </div>
      <Map trains={trains} focusedTrain={focusedTrain} />
    </div>
  );
}
