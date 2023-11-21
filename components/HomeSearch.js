// FloatingSearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HomeSearch = () => {
  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/images/search.png')} // Adjust the path accordingly
          style={styles.buttonImage}
        />      
        <TextInput
        placeholder="Search..."
        style={styles.input}
        // Add any additional TextInput props or event handlers as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '10%',
    left: '8%',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    zIndex: 2, // Ensure the search bar is above other components
    borderRadius: 30
  },
  buttonImage: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
});

export default HomeSearch;
