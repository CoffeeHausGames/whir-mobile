import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

const SettingsHeader = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.backView}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../../assets/images/back-mobile.png')} style={styles.backImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerView}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 1, // Add this line to make the text push to the right
    justifyContent: 'center', // Align the text to the bottom of the container
    alignItems: 'flex-end', // Align the text to the right of the container
  },
  backView: {
    flex: 1, // Add this line to make the text push to the right
    justifyContent: 'center', // Align the text to the bottom of the container
    alignItems: 'flex-start', // Align the text to the right of the container
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#FF9000',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 5,
    marginLeft: 0,
    flexDirection: 'row', // Use flexDirection: 'row' to align items horizontally
  },
  backButton: {
    position: 'absolute',
    marginBottom: 10,
    zIndex: 1, // Ensure the button is on top of other components
    left: -15
  },
  backImage: {
    width: 50,
    height: 50,
  },
});

export default SettingsHeader;
