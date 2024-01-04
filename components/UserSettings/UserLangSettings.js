import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DynamicSettingsHeader from './DynamicSettingsHeader';
import { useNavigation } from 'expo-router';

const UserLanguageSettings = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [language, setLanguage] = useState('en'); // Default language: English
  const [region, setRegion] = useState('us'); // Default region: United States

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
  };

  const handleSaveSettings = () => {
    console.log('Language:', language);
    console.log('Region:', region);
    // Add logic to save language and region settings
  };

  return (
    <View style={styles.container}>
      <DynamicSettingsHeader pageTitle="Language & Region" />
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          {/* Add more language options as needed */}
        </Picker>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Region</Text>
        <Picker
          selectedValue={region}
          style={styles.picker}
          onValueChange={(itemValue) => handleRegionChange(itemValue)}
        >
          <Picker.Item label="United States" value="us" />
          <Picker.Item label="Canada" value="ca" />
          {/* Add more region options as needed */}
        </Picker>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserLanguageSettings;
