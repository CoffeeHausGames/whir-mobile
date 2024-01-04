import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const UserSecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactorAuth: false,
    fingerprintUnlock: true,
    changePasswordOnLogin: false,
  });

  const handleToggleSwitch = (setting) => {
    setSecuritySettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Two-Factor Authentication</Text>
        <Switch
          value={securitySettings.enableTwoFactorAuth}
          onValueChange={() => handleToggleSwitch('enableTwoFactorAuth')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Fingerprint Unlock</Text>
        <Switch
          value={securitySettings.fingerprintUnlock}
          onValueChange={() => handleToggleSwitch('fingerprintUnlock')}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Change Password on Login</Text>
        <Switch
          value={securitySettings.changePasswordOnLogin}
          onValueChange={() => handleToggleSwitch('changePasswordOnLogin')}
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

export default UserSecuritySettings;
