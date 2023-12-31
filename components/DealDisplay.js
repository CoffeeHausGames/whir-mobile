import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { apiRequest } from '../app/networkController';

const DealDisplay = ({ setSelectedBusinessLocation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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

          const endpoint = '/business';
          const method = 'POST';
          const response = await apiRequest(endpoint, method, formattedCoordinates);

          if (!response.ok) {
            throw new Error(`Failed to fetch businesses. Server response: ${response.status}`);
          }

          const businessesWithDistance = response.data.map((business) => ({
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

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.dealdisplay}>
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.collapseButton} onPress={toggleCollapse}>
                <Text style={styles.collapseButtonText}>{collapsed ? 'Expand' : 'Collapse'}</Text>
            </TouchableOpacity>    
        </View>
        <FlatList
            data={businesses}
            keyExtractor={(item) => item.business_name}
            renderItem={({ item }) => (
            <View style={styles.buttoncontainer}>
                {item.deals && item.deals.length > 0 ? (
                <View>
                    {item.deals.map((deal) => (
                    <TouchableOpacity
                        onPress={() => handleDealClick(item)}
                        key={deal.id}
                        style={styles.dealButtonDisplay}
                    >
                        <Text style={styles.dealTitle}>{deal.name}</Text>
                        <Text style={styles.dealBusinessName}>{item.business_name}</Text>
                        <Text style={styles.dealDescription}>{deal.description}</Text>
                        <Text style={styles.dealDistance}>{formatDistance(item.distance)}m away</Text>
                        <Text>Start Date: {deal.start_date}, End Date: {deal.end_date}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
                ) : (
                <Text>No deals available for this business</Text>
                )}
            </View>
            )}
            contentContainerStyle={collapsed ? styles.collapsedContainer : null}
        />
        </View>    
    </View>

  );
};

const styles = StyleSheet.create({
    dealdisplay: {
        height: '40%',
        // width: '98%'
    },
    container: {
    //   justifyContent: 'flex-end',
    },
    dealButtonDisplay: {
      marginBottom: 15,
      borderWidth: 0.5,
      borderRadius: 10,
      padding: 10,
      width: '100%',
    },
    buttoncontainer: {
        // width: '95%'
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
    collapseButton: {
      alignSelf: 'center',
      margin: 6,
      backgroundColor: 'lightgray',
      padding: 3,
      borderRadius: 5,
    },
    collapseButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    collapsedContainer: {
      height: '50%', // Adjust as needed for the collapsed state
    },
    header: {
        backgroundColor: 'white',
        margin: 0
    }
  });

export default DealDisplay;
