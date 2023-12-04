import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../app/authcontext';

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
      day_of_week: deal.day_of_week,
      start_date: new Date(deal.start_date).toISOString(),
      end_date: new Date(deal.end_date).toISOString(),
      description: deal.description,
    };

    try {
      const response = await fetch('http://10.8.1.245:4444/business/deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${businessAuthToken}`,
        },
        body: JSON.stringify(formattedDeal),
      });

      if (!response.ok) {
        throw new Error(`Failed to add deal. Server response: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

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
        <View style={styles.row}>
          <Text>Deal Name</Text>
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
            <Text>Start Date</Text>
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
            <Text>End Date</Text>
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
          <Text>Day of Week</Text>
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
        <View style={styles.timeRow}>
          <View style={styles.row}>
            <Text>Start Time</Text>
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
            <Text>End Time</Text>
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
        </View>
        <View style={styles.row}>
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            value={deal.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder=""
            required
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSubmit} />
          <Button title="Discard" onPress={handleCancel} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: 300,
  },
  datePickerButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
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
  timeRow: {
    flexDirection: 'row',
  },
  dateRow: {
    flexDirection: 'row',
  },
  timePickerButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  timePickerText: {
    color: '#333',
  },
});

export default AddDealModal;
