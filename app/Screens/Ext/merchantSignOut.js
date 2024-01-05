import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../authcontext';

const MerchantSignOutButton = () => {
  // Access the merchantSignOut function from the authentication context
  const { merchantSignOut } = useAuth();

  const handleMerchantSignOut = () => {
    // Call the merchantSignOut function to sign the merchant out
    merchantSignOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMerchantSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Merchant Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default MerchantSignOutButton;
