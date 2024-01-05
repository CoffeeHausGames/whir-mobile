import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Share, ActivityIndicator, Modal, TouchableWithoutFeedback, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { apiRequest} from '../../../app/networkController';
import BusinessProfileModal from './BusinessProfileModal';


const DealDisplayFull = ({ setSelectedBusinessLocation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [expandedDealId, setExpandedDealId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBusinessInfo, setSelectedBusinessInfo] = useState(null);
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState({});
  const [favoritedDeals, setFavoritedDeals] = useState([]);
  const [selectedDealId, setSelectedDealId] = useState(null);
  const bounceValue = new Animated.Value(0);

  const startBounceAnimation = () => {
    bounceValue.setValue(1.5);
  
    Animated.timing(bounceValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Function to toggle favorited deals
  const toggleHeart = (dealId) => {
    setFavoritedDeals((prevFavoritedDeals) => {
      if (prevFavoritedDeals.includes(dealId)) {
        return prevFavoritedDeals.filter((id) => id !== dealId);
      } else {
        return [...prevFavoritedDeals, dealId];
      }
    });
  };

  // Function to check if a deal is favorited
  const isDealFavorited = (dealId) => {
    return favoritedDeals.includes(dealId);
  };

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf')
  });

  const handleShare = async (businessId, dealName, businessName, distance) => {
    try {
      const deepLink = `http://localhost:4444/v1/business/profile/${businessId}`;
      const message = `Deal: ${dealName}, Business: ${businessName}, Distance: ${distance}m away\n${deepLink}`;
  
      await Share.share({
        message: message,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };  
  
  // Function to toggle the modal displaying business information
  const toggleModal = async (businessInfo) => {
    setModalVisible(!modalVisible);
    setSelectedBusinessInfo(businessInfo);
  
    if (businessInfo) {
      const deals = await fetchDealsForBusiness(businessInfo.id);
      console.log('Deals for the selected business:', deals);
  
      // Fetch additional business details based on business ID
      const businessDetails = await fetchBusinessDetails(businessInfo.id);
      console.log('Business details:', businessDetails);
    }
  };
  
  
// Add a new function to fetch business details
const fetchBusinessDetails = async (businessId) => {
  try {
    const endpoint = `/business/profile/${businessId}`;
    console.log('Fetching business details. Endpoint:', endpoint);
    const method = 'GET';
    const response = await apiRequest(endpoint, method);

    if (!response.ok) {
      throw new Error(`Failed to fetch business details. Server response: ${response.status}`);
    }

    const businessDetails = response.data;
    setSelectedBusinessDetails(businessDetails); // Update state with business details
    return businessDetails;
  } catch (error) {
    console.error('Error fetching business details:', error.message);
    return null;
  }
};

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };

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
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchBusinesses();
  }, []);

  const fetchDealsForBusiness = async (businessId) => {
    try {
      const endpoint = '/business/deals';
      const method = 'POST';
      const requestData = { businessId };
      const response = await apiRequest(endpoint, method, requestData);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch deals. Server response: ${response.status}`);
      }
  
      return response.data;
    } catch (error) {
      console.error('Error fetching deals:', error.message);
      return [];
    }
  };

  // Function to calculate distance between two locations
  const calculateDistance = (userLocation, businessLocation) => {
    const radlat1 = (Math.PI * userLocation.latitude) / 180;
    const radlat2 = (Math.PI * businessLocation[1]) / 180;
    const theta = userLocation.longitude - businessLocation[0];
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // miles
    return dist;
  };

  // Function to toggle expanded deal view
  const toggleDeal = (dealId) => {
    setExpandedDealId((prevDealId) => (prevDealId === dealId ? null : dealId));
  };

  // Function to render a single deal
  const renderDeal = ({ item }) => (
    <View style={styles.dealContainer}>
      {item.deals && item.deals.length > 0 && (
        item.deals.map((deal) => (
          <TouchableOpacity
            key={deal.id}
            onPress={() => toggleDeal(deal.id)}
            style={styles.dealButtonDisplay}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.dealInfoContainer}>
                <Text style={styles.dealTitle}>{deal.name}</Text>
                <Text style={styles.dealBusinessName}>{item.business_name}</Text>
                <Text style={styles.dealDistance}>{formatDistance(item.distance)}m away</Text>
                <Text style={styles.dealDOW}>{deal.day_of_week}</Text>
                <Text style={styles.dealTime}>
                  {formatTime(deal.start_time)} - {formatTime(deal.end_time)}
                </Text>
                {expandedDealId === deal.id && (
                  <View style={styles.expandedContent}>
                    <View style={styles.expandedDescription}>
                      <Text style={styles.dealDescription}>{deal.description}</Text>
                    </View>
                    <View style={styles.expandedButtons}>
                    <TouchableOpacity
                      style={styles.sampleButton}
                      onPress={() =>
                        handleShare(item.id, deal.name, item.business_name, item.distance)
                      }
                    >
                        <Text style={styles.expandedButton}>Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.sampleButton}
                        onPress={() => toggleModal({ id: item.id })}
                      >
                        <Text style={styles.expandedButton}>Business Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  toggleHeart(deal.id);
                  startBounceAnimation();
                }}
                style={styles.heartContainer}
              >
                <Image
                  source={
                    isDealFavorited(deal.id)
                      ? require('../../../assets/images/heart-fill.png')
                      : require('../../../assets/images/heart-nofill.png')
                  }
                  style={styles.dealImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  // Function to format time
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(time).toLocaleString('en-US', options);
    return formattedTime;
  };

  // Function to format distance
  const formatDistance = (distance) => {
    if (distance >= 10) {
      return distance.toFixed(0);
    } else if (distance >= 0.1) {
      return distance.toFixed(1);
    } else {
      return distance.toFixed(2);
    }
  };

  // If fonts are not loaded or still loading, show loading indicator
  if (!fontsLoaded || loading){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9000" />
      </View>
    );
  }
  return (
    <View style={styles.dealdisplay}>
      <View style={styles.container}>
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.business_name}
          renderItem={renderDeal}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <BusinessProfileModal
          businessDetails={selectedBusinessDetails}
          onClose={() => toggleModal()}
          renderDeal={renderDeal} // Pass renderDeal as a prop
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dealdisplay: {
    flex: 1,
    marginBottom: 100,
  },
  container: {},
  dealButtonDisplay: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    width: '92%',
    marginLeft: 15,
    backgroundColor: '#f0f0f0'
  },
  buttoncontainer: {},
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold'
  },
  dealBusinessName: {
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular'
  },
  dealDistance: {
    color: '#FF9000',
    fontStyle: 'italic',
    fontFamily: 'Poppins-Medium'
  },
  dealTime: {
    fontFamily: 'Poppins-Regular'
  },
  dealDOW: {
    fontFamily: 'Poppins-SemiBold'
  },
  expandedContent: {
    marginTop: 10,
    marginLeft: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
    width: '90%'
  },
  dealDescription: {
    fontFamily: 'Poppins-Regular'
  },
  expandedDescription: {
    marginBottom: 10,
  },
  expandedButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sampleButton: {
    padding: 12,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FF9000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  expandedButton: {
    fontFamily: 'Poppins-Regular'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent', // Lower opacity
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%', // Take up 80% of the screen
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 25,
    textAlign: 'flex-start',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    marginTop: 10
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    bottom: 0,
  },
  modalLabel: {
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    position: 'absolute',
    marginTop: 10,
    paddingRight: 15,
    alignSelf: 'flex-end'
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2D2D2D'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative', // Add relative positioning
  },
  heartContainer: {
    position: 'absolute',
    right: 10, // Adjust the right value as needed
    top: 5, // Adjust the top value as needed
    zIndex: 1, // Ensure the heart is rendered above other elements
  },
  dealImage: {
    width: 25,
    height: 25,
  },
});

export default DealDisplayFull;
