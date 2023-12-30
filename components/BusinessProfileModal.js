import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { apiRequest } from '../app/networkController';

const BusinessProfileModal = ({ businessDetails, onClose }) => {
  const [businessDeals, setBusinessDeals] = useState([]);
  const [expandedDealId, setExpandedDealId] = useState(null);
  const [favoritedDeals, setFavoritedDeals] = useState([]);

  const fetchDealsForBusiness = async (businessId) => {
    try {
      const endpoint = `/business/profile/${businessId}`; // Use the businessId in the URL
      const method = 'GET';
      const response = await apiRequest(endpoint, method);

      if (!response.ok) {
        throw new Error(`Failed to fetch business info. Server response: ${response.status}`);
      }
      setBusinessDeals(response.data.deal);
    } catch (error) {
      console.error('Error fetching business info:', error.message);
    }
  };

  useEffect(() => {
    if (businessDetails && businessDetails._id) {
      fetchDealsForBusiness(businessDetails._id);
    }
  }, [businessDetails]);

  const toggleDeal = (dealId) => {
    setExpandedDealId((prevDealId) => (prevDealId === dealId ? null : dealId));
  };

  const toggleHeart = (dealId) => {
    setFavoritedDeals((prevFavoritedDeals) => {
      if (prevFavoritedDeals.includes(dealId)) {
        return prevFavoritedDeals.filter((id) => id !== dealId);
      } else {
        return [...prevFavoritedDeals, dealId];
      }
    });
  };

  const renderDeal = ({ item }) => (
    <View style={styles.newDealContainer}>
      <TouchableOpacity onPress={() => toggleDeal(item.id)} style={styles.buttonContainer}>
        <View style={styles.dealInfoContainer}>
          <Text style={styles.dealTitle}>{item.name}</Text>
          <Text style={styles.dealDescription}>{item.description}</Text>
          <Text style={styles.dealDOW}>{item.day_of_week}</Text>
          <Text style={styles.dealTime}>
          {formatTime(item.start_time)} - {formatTime(item.end_time)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleHeart(item.id)}>
          <Image
            source={
              favoritedDeals.includes(item.id)
                ? require('../assets/images/heart-fill.png')
                : require('../assets/images/heart-nofill.png')
            }
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {/* Expanded Content */}
      {expandedDealId === item.id && (
        <View style={styles.expandedContent}>
          <View style={styles.expandedDescription}>
            <Text style={styles.dealDescription}>{item.description}</Text>
          </View>
          <View style={styles.expandedButtons}>
            <TouchableOpacity
              style={styles.sampleButton}
              onPress={() => handleShare(`Deal: ${item.name}`)}
            >
              <Text style={styles.expandedButton}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
  
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(time).toLocaleString('en-US', options);
    return formattedTime;
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
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {businessDetails ? businessDetails.business_name : 'Business Profile'}
      </Text>
      <Text style={styles.modalText}>
        <Text style={styles.modalLabel}>Address:</Text>{' '}
        {businessDetails.address && (
          <>
            <Text>{businessDetails.address.street},</Text>
            <Text>{businessDetails.address.city},</Text>
            <Text>{businessDetails.address.state},</Text>
            <Text>{businessDetails.address.postalCode}</Text>
          </>
        )}
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={businessDeals}
        keyExtractor={(item) => item._id} // Change key extractor to item._id
        renderItem={renderDeal}
      />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  modalLabel: {
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    position: 'absolute',
    marginTop: 10,
    paddingRight: 15,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#2D2D2D',
  },
  newDealContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  dealInfoContainer: {},
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  dealDescription: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  dealTime: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
  favoriteIcon: {
    width: 25,
    height: 25,
    // Add other styles as needed
  },
});


export default BusinessProfileModal;
