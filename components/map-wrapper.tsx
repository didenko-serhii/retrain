'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('./map'), { ssr: false });

export default function MapWrapper() {
  const [trains, setTrains] = useState([]);

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

  return <Map trains={trains} />;
}
