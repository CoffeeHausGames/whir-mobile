// DealDisplay.js
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.dealDisplayContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dealDisplayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '80%',
    borderRadius: 30,
  },
  dealHeader: {
    // Add styles for the header
  },
  dealButtonDisplay: {
    // Add styles for the deal button display
  },
  dealTitle: {
    // Add styles for the deal title
  },
  dealBusinessName: {
    // Add styles for the business name
  },
  dealDescription: {
    // Add styles for the deal description
  },
  dealDistance: {
    // Add styles for the deal distance
  },
});

export default DealDisplay;
