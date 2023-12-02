import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, TouchableOpacity, Share } from 'react-native';
import { useAuth } from '../app/authcontext';

function MerchantDealBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const authContext = useAuth();

  useEffect(() => {
    // Fetch deals when the component mounts
    fetchDeals();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const fetchDeals = () => {
    const businessAuthToken = authContext.merchantUser ? authContext.merchantUser.token : null;

    if (!businessAuthToken) {
      console.error('Merchant user authentication token not found.');
      return;
    }

    fetch('http://10.8.1.245:4444/business/deal', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch deals. Server response: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setDeals(data.data); // Set deals directly from response.data.data
      })
      .catch((error) => {
        console.error('Error fetching deals:', error.message);
      });
  };

  const handleDealClick = (deal) => {
    console.log('Deal clicked:', deal);
    setSelectedDeal(deal); // Update the selected deal
  };

  const handleShare = async (text) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Deal/Event" onPress={openModal} />
      {isModalOpen && <CustomRepeatModal isOpen={isModalOpen} onClose={closeModal} />}

      <FlatList
        data={deals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDealClick(item)} style={styles.dealItem}>
            <Text style={styles.dealTitle}>{item.name}</Text>
            <Text style={styles.dealDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(`Deal: ${item.name}, Description: ${item.description}`)}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dealItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  dealDescription: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: '#FF9000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});

export default MerchantDealBox;
