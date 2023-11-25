import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ProfilePersonalInfo = () => {
  const personalInfoData = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john.doe@example.com' },
    { label: 'Phone', value: '(555) 123-4567' },
    { label: 'Address', value: '123 Main St, Cityville' },
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
    flex: 1,
    padding: 20,
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
    marginTop: 5, // Pushes the buttons to the bottom
  },
  button: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 10,
    backgroundColor: 'tomato',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProfilePersonalInfo;
