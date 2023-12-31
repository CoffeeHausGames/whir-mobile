import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
  Modal,
  TextInput,
  Image
} from 'react-native';
import { useAuth } from '../../../app/authcontext';
import AddDealModal from './merchantAddDealModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { apiRequestWithAuthRetry } from '../../../app/networkController';

function MerchantDealBox() {
  // State variables for managing modal visibility, deals, selected deal, and expanded deal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [expandedDealId, setExpandedDealId] = useState(null);
  const authContext = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedDeal, setEditedDeal] = useState({});

  // State variables and functions for managing date and time pickers
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  // Function to show date and time pickers
  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const showStartTimePicker = () => setStartTimePickerVisible(true);
  const showEndTimePicker = () => setEndTimePickerVisible(true);

  // Functions to hide date and time pickers
  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);
  const hideStartTimePicker = () => setStartTimePickerVisible(false);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);

  // State variables and function for managing selected days of the week
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // State variable for showing/hiding delete confirmation modal
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  // Function to show delete confirmation modal
  const showDeleteConfirmation = () => {
    setIsDeleteConfirmationVisible(true);
  };

  // Function to hide delete confirmation modal
  const hideDeleteConfirmation = () => {
    setIsDeleteConfirmationVisible(false);
  };

  // Function to handle deal deletion
  const handleDelete = (deal) => {
    setSelectedDeal(deal);
    showDeleteConfirmation();
  };

  // Function to handle day selection
  const handleDayPress = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  // Functions to handle date and time picker confirmations
  const handleStartDateConfirm = (date) => {
    setEditedDeal({
      ...editedDeal,
      start_date: date,
    });
    hideStartDatePicker();
  };
  
  const handleEndDateConfirm = (date) => {
    setEditedDeal({
      ...editedDeal,
      end_date: date,
    });
    hideEndDatePicker();
  };
  
  const handleStartTimeConfirm = (date) => {
    setEditedDeal({
      ...editedDeal,
      start_time: date,
    });
    hideStartTimePicker();
  };
  
  const handleEndTimeConfirm = (date) => {
    setEditedDeal({
      ...editedDeal,
      end_time: date,
    });
    hideEndTimePicker();
  };
  
  // Function to confirm and delete a deal
    const handleConfirmDelete = async () => {
      // Obtain authentication token from the context
      const businessAuthToken = authContext.merchantUser ? authContext.merchantUser.token : null;

      if (!businessAuthToken) {
        console.error('Merchant user authentication token not found.');
        return;
      }

      const endpoint = '/business/deal';
      const method = 'DELETE';
      const data = { id: selectedDeal.id };
      const token = `${businessAuthToken}`;
      apiRequestWithAuthRetry(endpoint, method, data, undefined, token)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete deal. Server response: ${response.status}`);
          }
          // If successful, close the delete confirmation modal and refresh the deals
          setIsDeleteConfirmationVisible(false);
          fetchDeals();
        })
        .catch((error) => {
          console.error('Error deleting deal:', error.message);
        });
    };
    
    const handleCancelDelete = () => {
      // Close the delete confirmation modal
      setIsDeleteConfirmationVisible(false);
    };
    

  useEffect(() => {
    // Fetch deals when the component mounts
    fetchDeals();
  }, []);

  // Mapping of abbreviated days to full day names
  const abbreviatedToFull = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const openEditModal = (deal) => {
    setEditedDeal({ ...deals });
  
    // Set selectedDays based on the days_of_week in the deal
    const daysOfWeekInDeal = deal.day_of_week;
    setSelectedDays(Array.isArray(daysOfWeekInDeal) ? daysOfWeekInDeal : []);
  
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const fetchDeals = async () => {
    const businessAuthToken = authContext.merchantUser ? authContext.merchantUser.token : null;

    if (!businessAuthToken) {
      console.error('Merchant user authentication token not found.');
      return;
    }

    const endpoint = '/business/deal';
    const method = 'GET';
    const token = `${businessAuthToken}`;

    apiRequestWithAuthRetry(endpoint, method, undefined, undefined, token)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch deals. Server response: ${response.status}`);
        }
        setDeals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching deals:', error.message);
      });
  };

  // Function to handle deal click and toggle expand/collapse
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
      day_of_week: selectedDays.length > 0 ? selectedDays.map(day => abbreviatedToFull[day]).join(', ') : '',
      start_date: new Date(editedDeal.start_date).toISOString(),
      end_date: new Date(editedDeal.end_date).toISOString(),
      description: editedDeal.description,
    };


    console.log('Updated Deal Body:', updatedDeal);
    const endpoint = '/business/deal';
    const method = 'PUT';
    const token = `${businessAuthToken}`;
    apiRequestWithAuthRetry(endpoint, method, updatedDeal, undefined, token)
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
      <TouchableOpacity
      onPress={openModal}
      style={styles.addButton}
      >
        <View style={styles.addButtonView}>
          <Image source={require('../../../assets/images/white-plus-icon.png')} style={styles.plusIcon} />
          <Text style={styles.addButtonText}>  Add Deal/Event</Text>
        </View>
      </TouchableOpacity>
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
            {expandedDealId === item.id && (
              <View style={styles.expandedButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                  <View style={styles.editButtonRow}>
                    <Image source={require('../../../assets/images/edit-icon-orange.png')} style={styles.editIcon} />
                    <Text style={styles.editButtonText}>  Edit</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                  <View style={styles.deleteRow}>
                    <Image source={require('../../../assets/images/trash-con-white.png')} style={styles.trashIcon} />
                    <Text style={styles.deleteButtonText}>  Delete</Text>
                  </View>
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
          <Text style={styles.titleText}>Edit Deal</Text>
          <Text style={styles.descriptionText}>Deal Name:</Text>
          <TextInput
            style={styles.input}
            value={editedDeal?.name}
            onChangeText={(text) => setEditedDeal({ ...editedDeal, name: text })}
            placeholder="Deal Name"
          />
          <Text style={styles.descriptionText}>Deal Dates:</Text>
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
          <Text style={styles.descriptionText}>Deal Day of Week:</Text>
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

          <Text style={styles.descriptionText}>Deal Times:</Text>
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
          <Text style={styles.descriptionText}>Deal Description:</Text>
          <TextInput
            style={styles.descriptionInput}
            value={editedDeal?.description}
            onChangeText={(text) => setEditedDeal({ ...editedDeal, description: text })}
            placeholder="Description"
          />
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.saveEditButton} onPress={handleSaveEdit}>
              <Text style={styles.saveEditButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelEditButton} onPress={closeEditModal}>
              <Text style={styles.cancelEditButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        transparent={true}
        visible={isDeleteConfirmationVisible}
        onRequestClose={hideDeleteConfirmation}
      >
        <View style={styles.deletedModalOverlay} />
        <View style={styles.deletedModalContainer}>
          <Text style={styles.modalText}>Confirm Delete</Text>
          <Text style={styles.modalSubText}>Are you sure you want to delete this deal?</Text>
          <View style={styles.deleteButtonRow}>
            <TouchableOpacity style={styles.deleteConfirmationButton} onPress={handleConfirmDelete}>
              <Text style={styles.deleteConfirmationButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteCancelButton} onPress={handleCancelDelete}>
              <Text style={styles.deleteConfirmationButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 100
  },
  addButton: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#FF9000',
    padding: 10,
    width: 165
  },
  addButtonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    alignSelf: 'flex-end'
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
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
    borderWidth: 3,
    borderColor: '#FF9000'
  },
  editButtonText: {
    color: '#FF9000',
    fontFamily: 'Poppins-Bold',
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
    height: '80%',
  },
  titleText: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontFamily: 'Poppins-Black',
    fontSize: 30,
    color: '#FF9000'
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
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  datePickerText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  timePickerButton: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  timePickerText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  saveEditButton: {
    backgroundColor: '#FF9000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveEditButtonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white'
  },
  cancelEditButton: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: '#FF0000'
  },
  cancelEditButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#FF0000'
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
  deletedModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  deletedModalContainer: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: '60%',
    height: '20%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold'
  },
  modalSubText: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  deleteConfirmationButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    width: 100,
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 5
  },
  deleteConfirmationButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  deleteCancelButton: {
    backgroundColor: 'gray',
    padding: 15,
    width: 100,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 5
  },
  deleteButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -8
  },
  editButtons: {
    flexDirection: 'row'
  },
  descriptionInput: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
    width: 350,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular'
  },
  plusIcon: {
    width: 20,
    height: 20,
    position: 'relative'
  },
  addButtonView: {
    flexDirection: 'row'
  },
  editButtonRow: {
    flexDirection: 'row',
  },
  editIcon: {
    width: 18,
    height: 18
  },
  deleteRow: {
    flexDirection: 'row',
  },
  trashIcon: {
    width: 18,
    height: 18
  }
});

export default MerchantDealBox;
