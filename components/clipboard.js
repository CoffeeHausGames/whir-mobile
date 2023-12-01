useEffect(() => {
  const fetchBusinesses = async () => {
    try {
      if (!userLocation) {
        return; // Don't fetch if user location is not available
      }

      const { latitude, longitude } = userLocation.coords;

      const response = await fetch('http://10.8.1.245:4444/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch businesses. Server response: ${response.statusText}`);
      }

      const data = await response.json();
      setBusinesses(data.data);
    } catch (error) {
      console.error('Error fetching businesses:', error.message);
    }
  };

  fetchBusinesses();
}, [userLocation]); // Run this effect whenever userLocation changes