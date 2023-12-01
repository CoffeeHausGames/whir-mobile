import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { useAuth } from '../app/authcontext';

const DealBox = ({ deals, onDealClick, selectedDeal }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDeal, setEditedDeal] = useState({ ...selectedDeal });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const authContext = useAuth();

  const handleDealClick = (deal) => {
    onDealClick(deal);
    setIsEditMode(false);
    setEditedDeal({ ...deal });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setEditedDeal({ ...selectedDeal });
  };

  const handleSaveClick = () => {
    const businessAuthToken = authContext.businessUser
      ? authContext.businessUser.token
      : null;

    if (!businessAuthToken) {
      console.error('Business user authentication token not found.');
      return;
    }

    const updatedDeal = {
      id: editedDeal.id,
      name: editedDeal.name,
      start_time: new Date(editedDeal.start_time).toISOString(),
      end_time: new Date(editedDeal.end_time).toISOString(),
      day_of_week: editedDeal.day_of_week,
      start_date: new Date(editedDeal.start_date).toISOString(),
      end_date: new Date(editedDeal.end_date).toISOString(),
      description: editedDeal.description,
    };

    console.log('Updated Deal Body:', updatedDeal);

    fetch(`http://10.8.1.245:4444/business/deal`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
      body: JSON.stringify(updatedDeal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update deal. Server response: ${response.statusText}`);
        }
        setIsEditMode(false);
        onDealClick(editedDeal);
      })
      .catch((error) => {
        console.error('Error updating deal:', error.message);
      });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    const businessAuthToken = authContext.businessUser
      ? authContext.businessUser.token
      : null;

    if (!businessAuthToken) {
      console.error('Business user authentication token not found.');
      return;
    }

    fetch(`http://10.8.1.245:4444/business/deal`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
      body: JSON.stringify({ id: selectedDeal.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete deal. Server response: ${response.statusText}`);
        }
        setShowDeleteConfirmation(false);
        onDealClick(null);
      })
      .catch((error) => {
        console.error('Error deleting deal:', error.message);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  const renderDealItem = ({ item }) => (
    <Button title={item.name} onPress={() => handleDealClick(item)} />
  );

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={deals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDealItem}
          ListEmptyComponent={<Text>No deals</Text>}
        />
      </View>
      <View style={{ flex: 2, padding: 10 }}>
        {selectedDeal && (
          <>
            {!isEditMode ? (
              <>
                <Text>{selectedDeal.name}</Text>
                <Text>{selectedDeal.day_of_week}</Text>
                <Text>{selectedDeal.description}</Text>
                <Text>Start date: {formatDate(selectedDeal.start_date)}</Text>
                <Text>End date: {formatDate(selectedDeal.end_date)}</Text>
                <Text>Start time: {formatTime(selectedDeal.start_time)}</Text>
                <Text>End time: {formatTime(selectedDeal.end_time)}</Text>
                <Button title="Edit Deal" onPress={handleEditClick} />
                <Button title="Delete Deal" onPress={handleDeleteClick} />
              </>
            ) : (
              <>
                <Text>Deal Name</Text>
                <TextInput
                  value={editedDeal.name}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, name: text })}
                />
                <Text>Day of the Week</Text>
                <TextInput
                  value={editedDeal.day_of_week}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, day_of_week: text })}
                />
                <Text>Description</Text>
                <TextInput
                  value={editedDeal.description}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, description: text })}
                />
                <Text>Start Date/End Date</Text>
                <TextInput
                  value={editedDeal.start_date}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, start_date: text })}
                />
                <TextInput
                  value={editedDeal.end_date}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, end_date: text })}
                />
                <Text>Start Time/End Time</Text>
                <TextInput
                  value={editedDeal.start_time}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, start_time: text })}
                />
                <TextInput
                  value={editedDeal.end_time}
                  onChangeText={(text) => setEditedDeal({ ...editedDeal, end_time: text })}
                />
                <Button title="Save" onPress={handleSaveClick} />
                <Button title="Cancel" onPress={handleCancelClick} />
              </>
            )}
          </>
        )}
      </View>
      {showDeleteConfirmation && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 50 }}>
            <Text>Are you sure you want to delete this deal?</Text>
            <Button title="Yes" onPress={handleConfirmDelete} />
            <Button title="No" onPress={handleCancelDelete} />
          </View>
        </View>
      )}
    </View>
  );
};

export default DealBox;
