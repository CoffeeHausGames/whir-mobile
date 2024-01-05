// SignOutButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../authcontext';

const SignOutButton = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    // Call the signOut function to sign the user out
    signOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign Out</Text>
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

export default SignOutButton;
