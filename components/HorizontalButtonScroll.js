import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const HorizontalButtonScroll = () => {
  return (
    <View style={styles.horizontalButtonContainer}>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        >
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 6</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row', // Align buttons horizontally
    paddingHorizontal: 10,
    height: 25, // Set the height of the buttons
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingHorizontal: 10, // Adjust padding for a smaller button
    marginRight: 10,
    justifyContent: 'center'

  },
  buttonText: {
    color: '#fff',
    fontSize: 10, // Set a smaller font size
    fontWeight: 'bold',
  },
  horizontalButtonContainer: {
    marginBottom: 5
  }
});

export default HorizontalButtonScroll;
