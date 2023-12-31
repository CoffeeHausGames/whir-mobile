import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import DynamicSettingsHeader from './DynamicSettingsHeader';
import { useNavigation } from 'expo-router';


const UserGeneralSettings = () => {
  const navigation = useNavigation();

  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleReceiveNotificationsToggle = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  const handleAutoUpdateToggle = () => {
    setAutoUpdate(!autoUpdate);
  };

  const handleSaveSettings = () => {
    console.log('Receive Notifications:', receiveNotifications);
    console.log('Auto Update:', autoUpdate);
  };

  return (
    <View style={styles.container}>
      <DynamicSettingsHeader pageTitle="General" />
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Receive Notifications</Text>
        <Switch value={receiveNotifications} onValueChange={handleReceiveNotificationsToggle} />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Auto Update</Text>
        <Switch value={autoUpdate} onValueChange={handleAutoUpdateToggle} />
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

export default UserGeneralSettings;
