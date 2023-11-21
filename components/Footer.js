// Footer.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Home Button with Image */}
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../assets/images/discover.png')} // Adjust the path accordingly
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>

      {/* Search Button with Image */}
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../assets/images/map.png')} // Adjust the path accordingly
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>

      {/* Profile Button with Image */}
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../assets/images/user.png')} // Adjust the path accordingly
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your desired background color
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Set your desired border color
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 5,
  },
  buttonImage: {
    width: 32, // Adjust the width and height based on your image size
    height: 32,
  },
});

export default Footer;
