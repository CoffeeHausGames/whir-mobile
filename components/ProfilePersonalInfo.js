import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '../app/authcontext'; // Import the useAuth hook
import SignOutButton from '../app/signout';

const ProfilePersonalInfo = () => {
  const { signOut, user } = useAuth(); // Get the signOut function and user data from the context

  const personalInfoData = [
    { label: 'Name', value: user?.name || 'John Doe' },
    { label: 'Email', value: user?.email || 'john.doe@example.com' },
    { label: 'Phone', value: user?.phone || '(555) 123-4567' },
    { label: 'Address', value: user?.address || '1234 Main St, Cityville' },
  ];

  const renderPersonalInfoItem = ({ item }) => (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const handleSignOut = () => {
    signOut();
    // Add any additional logic or navigation after signing out
  };

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
        {user && <SignOutButton onPress={handleSignOut} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 340,
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
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'tomato',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProfilePersonalInfo;
