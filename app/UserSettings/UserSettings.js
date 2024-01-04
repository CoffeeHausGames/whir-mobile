// Import necessary modules
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from 'expo-router';

// Sample data for settings categories
const settingsCategories = [
  'General',
  'Account',
  'Appearance and Theme',
  'Notifications',
  'Privacy Settings',
  'Security Settings',
  'Language and Region',
  'Accessibility',

];

// Settings component
const Settings = () => {
  const navigation = useNavigation();


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSettingsPress(navigation, item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsCategories}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  );
};

// Handle press for each setting category
const handleSettingsPress = (navigation, settingCategory) => {
  switch (settingCategory) {
    case 'Account':
      navigation.navigate('UserAccountSettings');
      break;
    case 'Notifications':
      navigation.navigate('UserNotificationSettings');
      break;
    case 'Privacy Settings':
      navigation.navigate('UserPrivacySettings');
      break;
    case 'Security Settings':
      navigation.navigate('UserSecuritySettings');
      break;
    case 'Appearance and Theme':
      navigation.navigate('UserAppearanceSettings');
      break;
    case 'Language and Region':
      navigation.navigate('UserLanguageSettings');
      break;
    case 'Accessibility':
      navigation.navigate('UserAccessabilitySettings');
      break;
    case 'General':
      navigation.navigate('UserGeneralSettings');
      break;
    default:
      break;
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Settings;
