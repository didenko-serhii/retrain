export async function getTrainLocations() {
  const url: string = process.env.NEXT_PUBLIC_URL!

  const query = `
    {
      currentlyRunningTrains(where: {operator: {shortCode: {equals: "vr"}}}) {
        trainNumber
        departureDate
        trainLocations(where: {speed: {greaterThan: 30}}, orderBy: {timestamp: DESCENDING}, take: 1) {
          speed
          timestamp
          location
        }
      }
    }
  `;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    cache: "no-store"
  });

  const { data } = await response.json();
  return data?.currentlyRunningTrains ?? [];
}
