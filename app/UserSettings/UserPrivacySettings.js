import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const UserPrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showProfilePicture: true,
    allowTagging: true,
  });

  const handleToggleSwitch = (setting) => {
    setPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Show Online Status</Text>
        <Switch
          value={privacySettings.showOnlineStatus}
          onValueChange={() => handleToggleSwitch('showOnlineStatus')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Show Profile Picture</Text>
        <Switch
          value={privacySettings.showProfilePicture}
          onValueChange={() => handleToggleSwitch('showProfilePicture')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Allow Tagging</Text>
        <Switch
          value={privacySettings.allowTagging}
          onValueChange={() => handleToggleSwitch('allowTagging')}
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

export default UserPrivacySettings;
