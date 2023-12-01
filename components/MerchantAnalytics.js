import React from 'react';
import { View, StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const MerchantAnalytics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.square} />
      <View style={styles.square} />
      <View style={styles.square} />
      <View style={styles.square} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  },
  square: {
    width: vw(45),
    height: vh(20),
    backgroundColor: 'gray', // Set your desired color
    margin: 7,
    borderRadius: 10,
  },
});

export default MerchantAnalytics;
