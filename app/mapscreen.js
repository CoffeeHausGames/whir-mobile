import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Pressable, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import Map from '../components/Map';
import Icon from 'react-native-ico-material-design';
import { useAuth } from './authcontext';
import SignIn from './signin';
import * as Location from 'expo-location';


var iconHeight = 30;
var iconWidth = 30;

const MainPage = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const removeHeader = () => {
      navigation.setOptions({
        headerShown: false,
      });
    };

    // Move getPermissions inside the conditional block
    if (user) {
      const getPermissions = async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
            console.log('Location permission denied');
            Alert.alert(
              'Location Permission Required',
              'Please grant location permission to use this app.',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
              ]
            );
            return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          console.log('Location:', currentLocation);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      };

      getPermissions();
    }

    removeHeader();

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation, user]);

  const navigateToScreen = (screen) => {
    console.log(screen + ' has been pressed!');
    navigation.navigate(screen);
  };

  if (!user) {
    // If the user is not authenticated, render the SignInScreen
    return <SignIn />;
  }

  // Render the main content if the user is authenticated
  return (
    <View style={styles.container}>
      <Map userLocation={location} /> 
      <StatusBar style="light" />
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Pressable
            onPress={() => navigateToScreen('Discover')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color="gray" />
          </Pressable>
          <Pressable
            onPress={() => navigateToScreen('Home')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="map-symbol" height={iconHeight} width={iconWidth} color="#FF9000" />
          </Pressable>
          <Pressable
            onPress={() => navigateToScreen('Profile')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="user-shape" height={iconHeight} width={iconWidth} color="gray" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 40,
    zIndex: 2,
  },

  navBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: '90%',
    height: 65,
    justifyContent: 'space-evenly',
    borderRadius: 40,
    marginLeft: 20,
    borderWidth: 5,
    borderColor: '#FF9000',
  },

  IconBehave: {
    padding: 14,
  },
  panic: {
    top: -200
  }
});

export default MainPage;
