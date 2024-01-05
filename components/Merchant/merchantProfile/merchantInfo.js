import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '../../../app/authcontext';

const MerchantInfo = () => {
  const { merchantSignOut, user } = useAuth(); // Get the signOut function and user data from the context

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

  const handleMerchantSignOut = () => {
    merchantSignOut();
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
        <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleMerchantSignOut}
        >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
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
    width: 300
  },
  button: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 130
  },
  buttonText: {
    fontFamily: 'Poppins-Regular'
  },
  signOutButton: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  signOutButtonText: {
    fontFamily: 'Poppins-Regular'
  }
});

export default MerchantInfo;
