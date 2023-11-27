import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ProfilePersonalInfo = () => {
  const personalInfoData = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john.doe@example.com' },
    { label: 'Phone', value: '(555) 123-4567' },
    { label: 'Address', value: '1234 Main St, Cityville' },
  ];

  const renderPersonalInfoItem = ({ item }) => (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={personalInfoData}
        keyExtractor={(item) => item.label}
        renderItem={renderPersonalInfoItem}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 340
  },
  infoItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1, // Use flex: 0.5 or adjust as needed
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 10,
    flex: 1, // Use flex: 0.5 or adjust as needed
    backgroundColor: 'tomato',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProfilePersonalInfo;
