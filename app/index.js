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

  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <DealDisplay setSelectedBusinessLocation={() => {}} />
      <HomeSearch />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
