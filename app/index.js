// Home.js
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Map from '../components/Map';
import HomeSearch from '../components/HomeSearch';
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
      // Reset header options if the component is unmounted
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Map />
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
