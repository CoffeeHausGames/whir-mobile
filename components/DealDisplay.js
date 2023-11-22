import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const DealDisplay = ({ setSelectedBusinessLocation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const userLocation = await getUserLocation();

        if (userLocation && userLocation.latitude !== 0 && userLocation.longitude !== 0) {
          const formattedCoordinates = {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            radius: 1000,
          };

          const response = await fetch('http://192.168.1.29:4444/business', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedCoordinates),
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch businesses. Server response: ${response.statusText}`);
          }

          const data = await response.json();

          const businessesWithDistance = data.data.map((business) => ({
            ...business,
            distance: calculateDistance(userLocation, business.location.coordinates),
          }));

          const sortedBusinesses = businessesWithDistance.sort((a, b) => a.distance - b.distance);

          setBusinesses(sortedBusinesses);
        } else {
          console.log('Please share your location in order to view businesses near you');
        }
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
      }
    };

    fetchBusinesses();
  }, []);

  const getUserLocation = async () => {
    // Implement logic to get the user's location in a React Native app
    // You may use a library like expo-location or navigator.geolocation
    // For simplicity, I'm returning a hardcoded location for now
    return { latitude: 39.1077698007311, longitude: -94.58107416626508 };
  };

  const calculateDistance = (userLocation, businessLocation) => {
    // Implement the distance calculation logic for React Native
    // You may use libraries like geolib or implement the Haversine formula
    // For simplicity, I'm returning 0 for now
    return 0;
  };

  const handleDealClick = (business) => {
    const businessLocation = getBusinessLocation(business);
    if (businessLocation) {
      setSelectedBusinessLocation(businessLocation);
      setSelectedBusiness(business);
    } else {
      console.error(`Invalid location data for business: ${business.id}`);
    }
  };

  const getBusinessLocation = (business) => {
    if (business && business.location && business.location.coordinates) {
      const [longitude, latitude] = business.location.coordinates;
      return { latitude, longitude };
    }
    return null;
  };

  const formatDistance = (distance) => {
    if (distance >= 10) {
      return distance.toFixed(0);
    } else if (distance >= 0.1) {
      return distance.toFixed(1);
    } else {
      return distance.toFixed(2);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.dealDisplayContainer}>
        <Text style={styles.dealHeader}>Deals Near You</Text>
        {businesses.map((business) => (
          <View key={business.business_name}>
            {business.deal && business.deal.length > 0 ? (
              <View>
                {business.deal.map((deal) => (
                  <TouchableOpacity
                    onPress={() => handleDealClick(business)}
                    key={deal.id}
                    style={styles.dealButtonDisplay}
                  >
                    <Text style={styles.dealTitle}>{deal.name}</Text>
                    <Text style={styles.dealBusinessName}>{business.business_name}</Text>
                    <Text style={styles.dealDescription}>{deal.description}</Text>
                    <Text style={styles.dealDistance}>{formatDistance(business.distance)}m away</Text>
                    <Text>Start Date: {deal.start_date}, End Date: {deal.end_date}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text>No deals available for this business</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Takes the full screen space
    bottom: 0,
    justifyContent: 'flex-end', // Align content at the bottom
  },
  dealDisplayContainer: {
    width: '95%', // Take up 100% of the screen width
    backgroundColor: 'white', // Set background color
    borderTopLeftRadius: 20, // Add rounded corners to the top-left and top-right
    borderTopRightRadius: 20,
    padding: 20, // Add padding to the content
    height: '50%',
    top: '50%',
    left: '2.5%'
  },
  dealHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dealButtonDisplay: {
    marginBottom: 15,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dealBusinessName: {
    color: 'gray',
    marginBottom: 5,
  },
  dealDescription: {
    marginBottom: 10,
  },
  dealDistance: {
    color: 'blue',
    fontStyle: 'italic',
  },
});

export default DealDisplay;
