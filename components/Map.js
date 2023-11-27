import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const Map = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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

  const handleMarkerPress = (business) => {
    // Set the selected business when a marker is pressed
    setSelectedBusiness(business);
    console.log('Selected Business:', business);
  };
  

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
                key={business.id}
                coordinate={location}
                title={business.name}
                description={business.description}
                onPress={() => handleMarkerPress(business)}
              >
                {/* Use Image component for custom marker */}
                <Image
                  source={require('../assets/images/whir_map_poi.png')}
                  style={{ width: 21, height: 30 }}
                />
                {/* Callout component for popup */}
                <Callout style={styles.callout}>
                  <View>
                    <Text style={styles.calloutText}>{business.name}</Text>
                    <Text style={styles.calloutText}>{business.description}</Text>
                  </View>
                </Callout>
              </Marker>
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
  calloutText: {
    color: 'black'
  }
});

export default Map;
