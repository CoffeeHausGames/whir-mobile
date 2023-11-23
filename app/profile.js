// Discover.js
import { useEffect } from 'react';
import Footer from '../components/Footer';
import DealDisplay from '../components/DealDisplay';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
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

export default Profile;
