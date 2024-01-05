import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfileFavorites from './ProfileFavorites';
import ProfilePersonalInfo from './ProfilePersonalInfo';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';

const ProfileCard = () => {
  const [selectedButton, setSelectedButton] = useState('favorites');
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const navigation = useNavigation(); // Get the navigation object

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
  });

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleUserSettingsPress = () => {
    navigation.navigate('UserSettings');
  };

  useEffect(() => {
    // Add additional logic here if needed for when the component mounts
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/images/user.png')}
          style={styles.profileImage}
        />
      </View>
      <TouchableOpacity onPress={handleUserSettingsPress} style={styles.modalButton}>
        <Image
          source={require('../../../assets/images/settings-mobile.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
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
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold'
  },
  modalButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
    padding: 2
  },
  buttonImage: {
    width: 35,
    height: 35,
  },
});

export default ProfileCard;
