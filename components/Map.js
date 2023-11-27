import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const [businesses, setBusinesses] = useState([]);

  // Function to get the location of a business
  const getBusinessLocation = (business) => {
    if (business && business.location && business.location.coordinates) {
      const [longitude, latitude] = business.location.coordinates;
      return { latitude, longitude };
    }
    return null;
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://10.8.1.245:4444/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // You may need to pass any required parameters for your backend here
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
        console.log('Response Body:', data);
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
      }
    };

    fetchBusinesses();
  }, []); // Run this effect only once when the component mounts

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.1077698007311,
          longitude: -94.58107416626508,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={4}
      >
        {/* Map through the businesses array and create markers */}
        {businesses.map((business) => {
          const location = getBusinessLocation(business);
          if (location) {
            return (
              <Marker
                key={business.id} // Make sure to use a unique key for each marker
                coordinate={location}
                title={business.name} // You can use any property of the business object here
                description={business.description}
              />
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: -50,
    right: 0,
    left: 0,
    bottom: -35,
  },
});

export default Map;
