import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const DiscoverHeader = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return null instead of <SplashScreen />
  }

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Discovery</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#FF9000',
  },
  headerContainer: {
    marginTop: 100,
    marginBottom: 5,
    marginLeft: 15,
  },
});

export default DiscoverHeader;
