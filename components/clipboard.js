useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://10.8.1.245:4444/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: 39.1077698007311,
            longitude: -94.58107416626508,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch businesses. Server response: ${response.statusText}`);
        }

        const data = await response.json();
        setBusinesses(data.data);

        // Log the response body in the console
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
      }
    };

    fetchBusinesses();
  }, []); // Run this effect only once when the component mounts