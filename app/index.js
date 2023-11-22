import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import Map from '../components/Map';
import HomeSearch from '../components/HomeSearch';
import DealDisplay from '../components/DealDisplay';
import { useNavigation } from 'expo-router';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
    paddingTop: 40,
    paddingBottom: 40 // Adjust the top padding to extend the SafeAreaView
  },
});

export default Home;
