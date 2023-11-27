import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfileFavorites from './ProfileFavorites';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const ProfileCard = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  if (!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/images/user.png')} // Replace with your image URL
          style={styles.profileImage}
        />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>John Doe</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'favorites' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('favorites')}
          >
            <Text style={styles.buttonText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'personalInfo' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('personalInfo')}
          >
            <Text style={styles.buttonText}>Personal Info</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
      {selectedButton === 'favorites' && <ProfileFavorites />}
      {selectedButton === 'personalInfo' && <ProfilePersonalInfo />}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
    marginTop: 20
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

export default ProfileCard;
