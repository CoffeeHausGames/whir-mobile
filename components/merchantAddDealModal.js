import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../app/authcontext';
import { apiRequestWithAuthRetry } from '../app/networkController';

const AddDealModal = ({ isOpen, onClose }) => {
  const [deal, setDeal] = useState({
    name: '',
    start_time: '',
    end_time: '',
    day_of_week: '',
    start_date: '',
    end_date: '',
    description: '',
  });
  const authContext = useAuth();

  const abbreviatedToFull = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const showEndDatePicker = () => setEndDatePickerVisible(true);

  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);

  const handleStartDateConfirm = (date) => {
    setDeal({ ...deal, start_date: date.toISOString() });
    hideStartDatePicker();
  };

  const handleEndDateConfirm = (date) => {
    setDeal({ ...deal, end_date: date.toISOString() });
    hideEndDatePicker();
  };

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const showStartTimePicker = () => setStartTimePickerVisible(true);
  const showEndTimePicker = () => setEndTimePickerVisible(true);

  const hideStartTimePicker = () => setStartTimePickerVisible(false);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);

  const handleStartTimeConfirm = (date) => {
    setDeal({ ...deal, start_time: date.toISOString() });
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (date) => {
    setDeal({ ...deal, end_time: date.toISOString() });
    hideEndTimePicker();
  };

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

  const handleChange = (name, value) => {
    setDeal({ ...deal, [name]: value });
  };

  const handleSubmit = async () => {
    // Ensure authContext and authContext.merchantUser are defined
    if (!authContext || !authContext.merchantUser) {
      console.error('Merchant user is not authenticated.');
      return;
    }

    const businessAuthToken = authContext.merchantUser.token;

    console.log('Merchant user authentication token:', businessAuthToken);

    const formattedDeal = {
      name: deal.name,
      start_time: new Date(deal.start_time).toISOString(),
      end_time: new Date(deal.end_time).toISOString(),
      day_of_week: selectedDays.length > 0 ? selectedDays.map(day => abbreviatedToFull[day]).join(', ') : '',
      start_date: new Date(deal.start_date).toISOString(),
      end_date: new Date(deal.end_date).toISOString(),
      description: deal.description,
    };

    try {
      const endpoint = '/business/deal';
      const method = 'POST';
      const token = `${businessAuthToken}`;
      const response = await apiRequestWithAuthRetry(endpoint, method, formattedDeal, undefined, token)

      if (!response.ok) {
        throw new Error(`Failed to add deal. Server response: ${response.status}`);
      }

      setDeal({
        name: '',
        start_time: '',
        end_time: '',
        day_of_week: '',
        start_date: '',
        end_date: '',
        description: '',
      });

      onClose();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleCancel = () => {
    setDeal({
      name: '',
      start_time: '',
      end_time: '',
      day_of_week: '',
      start_date: '',
      end_date: '',
      description: '',
    });
    onClose();
  };

  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.titleText}>Add Deal/Event</Text>
        <View style={styles.row}>
          <Text style={styles.descriptionText}>Deal Name</Text>
          <TextInput
            style={styles.input}
            value={deal.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder=""
            required
          />
        </View>
        <View style={styles.dateRow}>
          <View style={styles.row}>
            <Text style={styles.descriptionText}>Start Date</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={showStartDatePicker}>
              <Text style={styles.datePickerText}>
                {deal.start_date ? new Date(deal.start_date).toLocaleDateString() : 'Select Start Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
            <Text style={styles.descriptionText}>End Date</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={showEndDatePicker}>
              <Text style={styles.datePickerText}>
                {deal.end_date ? new Date(deal.end_date).toLocaleDateString() : 'Select End Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.descriptionText}>Day of Week</Text>
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
          <View style={styles.row}>
            <Text style={styles.descriptionText}>Start Time</Text>
            <TouchableOpacity style={styles.timePickerButton} onPress={showStartTimePicker}>
              <Text style={styles.timePickerText}>
                {deal.start_time ? new Date(deal.start_time).toLocaleTimeString() : 'Select Start Time'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={hideStartTimePicker}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionText}>End Time</Text>
            <TouchableOpacity style={styles.timePickerButton} onPress={showEndTimePicker}>
              <Text style={styles.timePickerText}>
                {deal.end_time ? new Date(deal.end_time).toLocaleTimeString() : 'Select End Time'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
          </View>
        <View style={styles.row}>
          <Text style={styles.descriptionText}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={deal.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder=""
            required
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Discard</Text>
          </TouchableOpacity>        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    marginBottom: 10,
  },
  titleText: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 25,
    fontFamily: 'Poppins-Black',
    fontSize: 40,
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
    width: 350
  },
  datePickerButton: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'left',
    justifyContent: 'center',
    marginBottom: 12,
    width: 350,
    right: 0
  },
  datePickerText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
  daySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'no-wrap',
    width: '90%'
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
  timeRow: {
    flexDirection: 'row',
  },
  dateRow: {
    flexDirection: 'row',
  },
  timePickerButton: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'left',
    justifyContent: 'center',
    marginBottom: 12,
    width: 350,
    right: 0
  },
  timePickerText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular'
  },
  descriptionInput: {
    height: 80, // Adjust this value to make the description input taller
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
    width: 350,
  },
  cancelButton: {
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
  saveButton: {
    backgroundColor: '#FF9000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white'
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#FF0000'
  }
});

export default AddDealModal;
