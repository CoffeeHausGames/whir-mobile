// Home.js
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import Map from '../components/Map';
import HomeSearch from '../components/HomeSearch';
import DealDisplay from '../components/DealDisplay';
import { useNavigation } from 'expo-router';

const Home = () => {
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

  const navigateToDiscover = () => {
    navigation.navigate('Discover'); // Navigate to the 'Discover' screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <DealDisplay setSelectedBusinessLocation={() => {}} />
      <HomeSearch />
      <Footer navigateToDiscover={navigateToDiscover} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40, // Adjust the top padding to extend the SafeAreaView
  },
});

export default Home;
