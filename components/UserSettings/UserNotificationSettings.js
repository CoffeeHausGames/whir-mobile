import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import DynamicSettingsHeader from './DynamicSettingsHeader';
import { useNavigation } from 'expo-router';

const UserNotificationSettings = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    inAppNotifications: true,
  });

  const handleToggleSwitch = (setting) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <View style={styles.container}>
      <DynamicSettingsHeader pageTitle="Notifications" />
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Push Notifications</Text>
        <Switch
          value={notificationSettings.pushNotifications}
          onValueChange={() => handleToggleSwitch('pushNotifications')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Email Notifications</Text>
        <Switch
          value={notificationSettings.emailNotifications}
          onValueChange={() => handleToggleSwitch('emailNotifications')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>In-App Notifications</Text>
        <Switch
          value={notificationSettings.inAppNotifications}
          onValueChange={() => handleToggleSwitch('inAppNotifications')}
        />
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

export default UserNotificationSettings;
