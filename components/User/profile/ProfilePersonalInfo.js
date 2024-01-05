import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { useAuth } from '../../../app/authcontext'; // Import the useAuth hook
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


const ProfilePersonalInfo = () => {
  const { signOut, user } = useAuth(); // Get the signOut function and user data from the context
  const [modalVisible, setModalVisible] = useState(false);

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
      <FlatList
        data={personalInfoData}
        keyExtractor={(item) => item.label}
        renderItem={renderPersonalInfoItem}
      />
      <View style={styles.buttonContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <TouchableWithoutFeedback onPress={() => toggleModal()}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 340,
    width: '100%', // Set the width to 100%
    marginTop: 20,
  },
  infoItem: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: vw(100)
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Bold'
  },
  value: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Poppins-Regular'
  },
  button: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ProfilePersonalInfo;
