import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Pressable, Text, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import Map from '../components/Map';
import Icon from "react-native-ico-material-design";

var iconHeight = 30;
var iconWidth = 30;

const MainPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const removeHeader = () => {
      navigation.setOptions({
        headerShown: false,
      });
    };

    removeHeader();

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  const navigateToScreen = (screen) => {
    console.log(screen + ' has been pressed!');
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      {/* <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Whir-Logo-V2-Square-Stacked.png')}
          style={styles.topImage}
        />
      </View> */}
      <Map />
      <StatusBar style="light" />
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Pressable onPress={() => navigateToScreen('discover')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color='gray' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('index')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="map-symbol" height={iconHeight} width={iconWidth} color='#FF9000' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('profile')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="user-shape" height={iconHeight} width={iconWidth} color='gray' />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure that the child elements are positioned relative to this container
  },

  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject, // Take up the entire space of its container
  },

  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 40,
    zIndex: 2, // Ensure that the footer is above the map (increase the zIndex)
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
});

export default MainPage;
