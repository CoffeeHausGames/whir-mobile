import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

const DynamicSettingsHeader = ({pageTitle}) => {
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
        <Text numberOfLines={2} style={styles.headerText}>{pageTitle}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#FF9000',
    textAlign: 'right'
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 5,
    marginLeft: 0,
    flexDirection: 'row',
    marginBottom: 40
  },
  backButton: {
    position: 'absolute',
    marginBottom: 10,
    zIndex: 1,
    left: -15
  },
  backImage: {
    width: 50,
    height: 50,
  },
});

export default DynamicSettingsHeader;
