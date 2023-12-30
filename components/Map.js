import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { apiRequest } from '../app/networkController';
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';  // Import Animatable

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
        const endpoint = '/business';
        const method = 'POST';

        const requestData = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };

        const response = await apiRequest(endpoint, method, requestData);

        if (!response.ok) {
          throw new Error(`Failed to fetch businesses. Server response: ${response.st}`);
        }

        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error.message);
      }
    };

    if (userLocation) {
      fetchBusinesses();
    }
  }, [userLocation]);

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

  // Updated loading container with animation
  if (!userLocation) {
    return (
      <Animatable.View
        animation="rubberBand"
        duration={2500}
        style={styles.loadingContainer}
        iterationCount="infinite"
      >
        <Image style={styles.image} source={require('../assets/images/Whir-Logo-V2-Square-Stacked.png')} />
      </Animatable.View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
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

      {isModalVisible && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.modalContainer}>
            <ImageBackground
              source={require('../assets/images/map-tile-background.png')}
              style={styles.backgroundImage}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTextTitle}>{selectedBusiness?.business_name}</Text>
                <Text style={styles.modalTextContent}>Pinned deal of the day</Text>
              </View>
            </ImageBackground>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '90%',
    height: 160,
    marginBottom: 20,
  },
  modalTextTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  modalTextContent: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  backgroundImage: {
    alignItems: 'center',
    width: 340,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180
  }
});

export default Map;
