import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
  Modal,
  TextInput,
} from 'react-native';
import { useAuth } from '../app/authcontext';
import AddDealModal from './merchantAddDealModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function MerchantDealBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [expandedDealId, setExpandedDealId] = useState(null);
  const authContext = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedDeal, setEditedDeal] = useState({});

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const showStartTimePicker = () => setStartTimePickerVisible(true);
  const showEndTimePicker = () => setEndTimePickerVisible(true);

  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);
  const hideStartTimePicker = () => setStartTimePickerVisible(false);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayPress = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
    const handleStartDateConfirm = (date) => {
      // Handle the selected start date
      hideStartDatePicker();
    };
  
    const handleEndDateConfirm = (date) => {
      // Handle the selected end date
      hideEndDatePicker();
    };
  
    const handleStartTimeConfirm = (date) => {
      // Handle the selected start time
      hideStartTimePicker();
    };
  
    const handleEndTimeConfirm = (date) => {
      // Handle the selected end time
      hideEndTimePicker();
    };

  useEffect(() => {
    // Fetch deals when the component mounts
    fetchDeals();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const openEditModal = (deal) => {
    setEditedDeal({ ...deal });
  
    // Set selectedDays based on the days_of_week in the deal
    const daysOfWeekInDeal = deal.day_of_week.split(',');
    setSelectedDays(daysOfWeekInDeal);
  
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const fetchDeals = () => {
    const businessAuthToken = authContext.merchantUser ? authContext.merchantUser.token : null;

    if (!businessAuthToken) {
      console.error('Merchant user authentication token not found.');
      return;
    }

    fetch('http://10.8.1.245:4444/business/deal', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch deals. Server response: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setDeals(data.data); // Set deals directly from response.data.data
      })
      .catch((error) => {
        console.error('Error fetching deals:', error.message);
      });
  };

  const handleDealClick = (dealId) => {
    console.log('Deal clicked:', dealId);
    // Toggle expand/collapse for the selected deal
    setExpandedDealId((prevDealId) => (prevDealId === dealId ? null : dealId));
  };

  const handleShare = async (text) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    openEditModal(deal);
  };

  const handleSaveEdit = () => {
    // Ensure authContext and authContext.merchantUser are defined
    if (!authContext || !authContext.merchantUser) {
      console.error('Merchant user is not authenticated.');
      return;
    }

    const businessAuthToken = authContext.merchantUser.token;

    console.log('Merchant user authentication token:', businessAuthToken);

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
        // If successful, toggle back to view mode and update the selected deal
        setEditModalVisible(false);
        setSelectedDeal(null); // Reset selected deal
        fetchDeals(); // Refresh deals
      })
      .catch((error) => {
        console.error('Error updating deal:', error.message);
      });
  };

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(time).toLocaleString('en-US', options);
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      <Button title="Add Deal/Event" onPress={openModal} />
      {isModalOpen && <AddDealModal isOpen={isModalOpen} onClose={closeModal} />}

      <FlatList
        data={deals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDealClick(item.id)} style={styles.dealItem}>
            <Text style={styles.dealTitle}>{item.name}</Text>
            <Text style={styles.dealDescription}>{item.description}</Text>
            <Text style={styles.dealDescription}>{item.day_of_week}</Text>
            <Text style={styles.dealDescription}>
              {formatTime(item.start_time)} - {formatTime(item.end_time)}
            </Text>
            {/* <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(`Deal: ${item.name}, Description: ${item.description}`)}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity> */}

            {/* Add "Edit" and "Delete" buttons with conditional rendering based on expansion */}
            {expandedDealId === item.id && (
              <View style={styles.expandedButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          closeEditModal();
        }}
      >
        <View style={styles.modalOverlay} />
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Edit Deal</Text>
          <Text>Deal Name:</Text>
          <TextInput
            style={styles.input}
            value={editedDeal?.name}
            onChangeText={(text) => setEditedDeal({ ...editedDeal, name: text })}
            placeholder="Deal Name"
          />
          <Text>Deal Description:</Text>
          <TextInput
            style={styles.input}
            value={editedDeal?.description}
            onChangeText={(text) => setEditedDeal({ ...editedDeal, description: text })}
            placeholder="Description"
          />
          <Text>Deal Day of Week:</Text>
          <View style={styles.row}>
          <View style={styles.daySelectorContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.daySelectorButton,
                  selectedDays.includes(day) && styles.selectedDay,
                ]}
                onPress={() => handleDayPress(day)}
              >
                <Text>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
          <Text>Deal Dates:</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showStartDatePicker}>
            <Text style={styles.datePickerText}>
              {editedDeal.start_date ? new Date(editedDeal.start_date).toLocaleDateString() : 'Select Start Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />

          <TouchableOpacity style={styles.datePickerButton} onPress={showEndDatePicker}>
            <Text style={styles.datePickerText}>
              {editedDeal.end_date ? new Date(editedDeal.end_date).toLocaleDateString() : 'Select End Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
          <Text>Deal Times:</Text>
          <TouchableOpacity style={styles.timePickerButton} onPress={showStartTimePicker}>
            <Text style={styles.timePickerText}>
              {editedDeal.start_time ? new Date(editedDeal.start_time).toLocaleTimeString() : 'Select Start Time'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleStartTimeConfirm}
            onCancel={hideStartTimePicker}
          />

          <TouchableOpacity style={styles.timePickerButton} onPress={showEndTimePicker}>
            <Text style={styles.timePickerText}>
              {editedDeal.end_time ? new Date(editedDeal.end_time).toLocaleTimeString() : 'Select End Time'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndTimeConfirm}
            onCancel={hideEndTimePicker}
          />

          <TouchableOpacity style={styles.saveEditButton} onPress={handleSaveEdit}>
            <Text style={styles.saveEditButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelEditButton} onPress={closeEditModal}>
            <Text style={styles.cancelEditButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dealItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  dealDescription: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: '#FF9000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  timeRow: {
    flexDirection: 'row'
  },
  expandedButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%', // Set height to 80% of the screen
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  datePickerButton: {
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  datePickerText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  timePickerButton: {
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  timePickerText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  saveEditButton: {
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  saveEditButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  cancelEditButton: {
    height: 40,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelEditButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  daySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'no-wrap',
  },
  daySelectorButton: {
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  selectedDay: {
    backgroundColor: '#FF9000',
  },
});

export default MerchantDealBox;
