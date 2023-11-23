// Discover.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Discover = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Discover Page</Text>
      {/* Add your Discover page content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Discover;
