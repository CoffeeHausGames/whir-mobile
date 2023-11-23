// Home.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import Discover from './Discover'; // Import the Discover component
import { useNavigation } from 'expo-router';
import MainPage from './main';

const Home = () => {
  const navigation = useNavigation();
  const [showDiscover, setShowDiscover] = useState(false);
  const [showMainPage, setShowMainPage] = useState(true); // Add state for MainPage

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
        <MainPage setShowMainPage={setShowMainPage}/>
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
