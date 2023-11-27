import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import Footer from '../components/Footer';
import Map from '../components/Map';
import HomeSearch from '../components/HomeSearch';
import DealDisplay from '../components/DealDisplay';
import { useNavigation } from 'expo-router';
import MainDealDisplay from '../components/MainDealDisplay';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


const MainPage = () => {
  const navigation = useNavigation();
  const [isLightBackground, setIsLightBackground] = useState(true);

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    // Example: Change background color dynamically
    const backgroundColor = isLightBackground ? '#FFFFFF' : '#000000';

    // Check the background color and set the status bar text color accordingly
    const isLight = isLightBackground ? true : false;

    // Set the status bar style based on the background color
    StatusBar.setBarStyle(isLight ? 'dark-content' : 'light-content');

    // You may also set the background color dynamically
    StatusBar.setBackgroundColor(backgroundColor);
  }, [isLightBackground]);

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

  if (!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightBackground ? '#FFFFFF' : '#000000' }]}>
      <Map />
      {/* <DealDisplay setSelectedBusinessLocation={() => {}} /> */}
      {/* <MainDealDisplay /> */}
      <HomeSearch />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Adjust the top padding to extend the SafeAreaView
  },
});

export default MainPage;
