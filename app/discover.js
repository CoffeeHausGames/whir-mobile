// Discover.js
import { useEffect } from 'react';
import Footer from '../components/Footer';
import DealDisplayFull from '../components/DealDisplayFull';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Discover = () => {
  return (
    <SafeAreaView style={styles.container}>
    <DealDisplayFull />
    <Footer style={styles.footer}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Discover;
