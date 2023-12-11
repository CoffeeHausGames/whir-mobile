import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ userLocation }) => {
  const mapViewRef = useRef(null);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
      }
    };

    fetchBusinesses();
  }, []);

  const handleMarkerPress = (business) => {
    setSelectedBusiness(business);
    setIsModalVisible(true);

    const location = getBusinessLocation(business);

    if (location) {
      mapViewRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBackdropPress = () => {
    if (isModalVisible) {
      handleCloseModal();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }
            : {
                latitude: 39.1077698007311,
                longitude: -94.58107416626508,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }
        }
        minZoomLevel={4}
        showsUserLocation={true}
      >
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
                <Image
                  source={require('../assets/images/whir_map_poi.png')}
                  style={{ width: 21, height: 30 }}
                />
              </Marker>
            );
          }
          return null;
        })}
      </MapView>

      {/* Backdrop TouchableOpacity */}
      {isModalVisible && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
      )}

      {/* Custom Modal for Business Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTextTitle}>{selectedBusiness?.business_name}</Text>
              <Text style={styles.modalTextContent}>Pinned deal of the day</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal at the bottom
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 120
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '85%', // Set the width to 90%
    height: 160
  },
  modalTextTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold'
  },
  modalTextContent: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  businessProfileButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'gray',
    marginTop: 10,
  },
});

export default Map;