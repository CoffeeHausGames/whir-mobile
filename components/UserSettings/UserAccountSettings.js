import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../../app/authcontext';
import { vw } from 'react-native-expo-viewport-units';
import DynamicSettingsHeader from './DynamicSettingsHeader';
import { useNavigation } from 'expo-router';

const AccountSettings = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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

  return (
    <View style={styles.container}>
      <DynamicSettingsHeader pageTitle="Account" />
      <FlatList
        data={personalInfoData}
        keyExtractor={(item) => item.label}
        renderItem={renderPersonalInfoItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    width: '100%',
    marginTop: 20,
  },
  infoItem: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: vw(100),
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  value: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
});

export default AccountSettings;
