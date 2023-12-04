import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
const MerchantDashboardHeader = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded){
    return null;
  }
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Dashboard</Text>
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

export default MerchantDashboardHeader;
