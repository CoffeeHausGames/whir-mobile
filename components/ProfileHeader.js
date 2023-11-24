import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const ProfileHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    // fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#FF9000',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 5,
    marginLeft: 15,
  },
});

export default ProfileHeader;
