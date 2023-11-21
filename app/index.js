// Home.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Map from '../components/Map';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Map />
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
