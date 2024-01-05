import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import DynamicSettingsHeader from './DynamicSettingsHeader';
import { useNavigation } from 'expo-router';

const UserAccessibilitySettings = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  const handleFontSizeChange = (selectedSize) => {
    setFontSize(selectedSize);
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  const handleScreenReaderToggle = () => {
    setScreenReader(!screenReader);
  };

  const handleSaveSettings = () => {
    console.log('Font Size:', fontSize);
    console.log('High Contrast:', highContrast);
    console.log('Screen Reader:', screenReader);
  };

  return (
    <View style={styles.container}>
      <DynamicSettingsHeader pageTitle="Accessability" />
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Font Size</Text>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 'small' && styles.activeButton]}
            onPress={() => handleFontSizeChange('small')}
          >
            <Text>Small</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 'medium' && styles.activeButton]}
            onPress={() => handleFontSizeChange('medium')}
          >
            <Text>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontSizeButton, fontSize === 'large' && styles.activeButton]}
            onPress={() => handleFontSizeChange('large')}
          >
            <Text>Large</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>High Contrast</Text>
        <Switch value={highContrast} onValueChange={handleHighContrastToggle} />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Screen Reader</Text>
        <Switch value={screenReader} onValueChange={handleScreenReaderToggle} />
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
  switchContainer: {
    flexDirection: 'row',
  },
  fontSizeButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
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

export default UserAccessibilitySettings;
