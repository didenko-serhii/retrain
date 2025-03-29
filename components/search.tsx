'use client'
import { useEffect, useState } from 'react'

type Train = {
  trainNumber: number
  departureDate: string
}

export default function SearchBar({ onSelect }: { onSelect: (train: Train) => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Train[]>([])
  const [selected, setSelected] = useState<Train | null>(null)

  useEffect(() => {
    if (!query) return setResults([])

    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSelect = (train: Train) => {
    setSelected(train)
    setQuery(train.trainNumber.toString())
    setResults([])
    onSelect(train)
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[999] w-full max-w-md">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search train number..."
          className="w-full px-4 py-2 border rounded-lg shadow bg-white text-black"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(null)
          }}
        />
        {results.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white border rounded-lg shadow max-h-60 overflow-y-auto z-50">
            {results.map(train => (
              <li
                key={`${train.trainNumber}-${train.departureDate}`}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(train)}
              >
                Train {train.trainNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
