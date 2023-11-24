import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const HorizontalButtonScroll = ({ onButtonPress }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonText) => {
    setSelectedButton(buttonText);
    // onButtonPress(buttonText);
    console.log(buttonText);
  };

  return (
    <View style={styles.horizontalButtonContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          style={[styles.button, selectedButton === 'All' && styles.selectedButton]}
          onPress={() => handleButtonPress('All')}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'Happy Hour' && styles.selectedButton]}
          onPress={() => handleButtonPress('Happy Hour')}
        >
          <Text style={styles.buttonText}>Happy Hour</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, selectedButton === 'Food' && styles.selectedButton]}  
            onPress={() => handleButtonPress('Food')}
        >
            <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, selectedButton === 'Alcohol' && styles.selectedButton]}  
            onPress={() => handleButtonPress('Alcohol')}
        >            
        <Text style={styles.buttonText}>Alcohol</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, selectedButton === 'Cannabis' && styles.selectedButton]}  
            onPress={() => handleButtonPress('Cannabis')}
        >            
        <Text style={styles.buttonText}>Cannabis</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, selectedButton === 'Retail' && styles.selectedButton]}  
            onPress={() => handleButtonPress('Retail')}
        >            
        <Text style={styles.buttonText}>Retail</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, selectedButton === 'Food Trucks' && styles.selectedButton]}  
            onPress={() => handleButtonPress('Food Trucks')}
        >            
        <Text style={styles.buttonText}>Food Trucks</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 28,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#FF9000',
    borderColor: '#FF9000',
  },
  horizontalButtonContainer: {
    marginBottom: 8,
    marginTop: 3
  },
});

export default HorizontalButtonScroll;
