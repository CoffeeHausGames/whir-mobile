import { apiRequest } from '../app/networkController';

useEffect(() => {
  const fetchBusinesses = async () => {
    try {
      if (!userLocation) {
        return; // Don't fetch if user location is not available
      }

      const { latitude, longitude } = userLocation.coords;

      const endpoint = '/business';
      const method = 'POST';
      const requestData = {
        latitude,
        longitude,
      };
      const response = await apiRequest(endpoint, method, requestData);

      if (!response.ok) {
        throw new Error(`Failed to fetch businesses. Server response: ${response.status}`);
      }

      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error.message);
    }
  };

  fetchBusinesses();
}, [userLocation]); // Run this effect whenever userLocation changes