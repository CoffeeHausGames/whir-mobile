import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>Are you sure you want to delete this deal?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Yes" onPress={onConfirm} />
          <Button title="No" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default DeleteConfirmationModal;
