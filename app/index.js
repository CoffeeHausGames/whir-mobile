import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Map from '../components/Map';

const Home = () => {
  const router = useRouter();

  const navigateToDetail = () => {
    // You can navigate to another screen if needed
    router.push('Detail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
