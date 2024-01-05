import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfilePersonalInfo from '../../User/profile/ProfilePersonalInfo';
import { useFonts } from 'expo-font';
import MerchantPinned from './merchantPinned';
import MerchantInfo from './merchantInfo';

const MerchantProfileCard = () => {
  const [selectedButton, setSelectedButton] = useState('favorites');

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
  });

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    // You can add additional logic here if needed when the component mounts
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/images/user.png')} // Replace with your image URL
          style={styles.profileImage}
        />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Business Example</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'pinned' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('pinned')}
          >
            <Text style={styles.buttonText}>Pinned Deals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'merchantInfo' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('merchantInfo')}
          >
            <Text style={styles.buttonText}>Business Info</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {selectedButton === 'pinned' && <MerchantPinned />}
        {selectedButton === 'merchantInfo' && <MerchantInfo />}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 10,
    width: '95%',
    // height: 150,
    marginTop: 20,
    marginBottom: 110
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 45,
    marginTop: 20,
  },
  selectedButton: {
    backgroundColor: 'lightgray', // Customize the style for the selected button
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold'
  },
});

export default MerchantProfileCard;
