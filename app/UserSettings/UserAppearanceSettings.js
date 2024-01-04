import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UserAppearanceSettings = () => {
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    themeColor: 'blue', // You can customize the available theme colors
  });

  const handleToggleSwitch = (setting) => {
    setAppearanceSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const handleThemeChange = (theme) => {
    setAppearanceSettings((prevSettings) => ({
      ...prevSettings,
      themeColor: theme,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appearance Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={appearanceSettings.darkMode}
          onValueChange={() => handleToggleSwitch('darkMode')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Theme Color</Text>
        <Picker
          selectedValue={appearanceSettings.themeColor}
          style={styles.picker}
          onValueChange={(itemValue) => handleThemeChange(itemValue)}
        >
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Red" value="red" />
          {/* Add more theme color options as needed */}
        </Picker>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save Settings')}>
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

export default UserAppearanceSettings;
