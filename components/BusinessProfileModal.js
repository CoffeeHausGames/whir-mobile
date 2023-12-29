import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { apiRequest } from '../app/networkController';

const BusinessProfileModal = ({ businessDetails, onClose }) => {
  const [businessDeals, setBusinessDeals] = useState([]);
  const [expandedDealId, setExpandedDealId] = useState(null);
  const [favoritedDeals, setFavoritedDeals] = useState([]);

  const fetchDealsForBusiness = async (businessId) => {
    try {
      const endpoint = '/business/deals';
      const method = 'POST';
      const requestData = { businessId };
      const response = await apiRequest(endpoint, method, requestData);

      console.log('API Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to fetch deals. Server response: ${response.status}`);
      }

      setBusinessDeals(response.data); // Use response.data directly
    } catch (error) {
      console.error('Error fetching deals:', error.message);
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
      <TouchableOpacity
        onPress={() => toggleDeal(item.id)}
        style={styles.buttonContainer}
      >
        <View style={styles.dealInfoContainer}>
          <Text style={styles.dealTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

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
        keyExtractor={(item) => item.id}
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
    bottom: 0,
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
    borderRadius: 5,
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
  },
});

export default BusinessProfileModal;
