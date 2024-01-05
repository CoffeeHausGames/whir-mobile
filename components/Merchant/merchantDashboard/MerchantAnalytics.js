import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import Swiper from 'react-native-swiper';


const MerchantAnalytics = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity key={item} onPress={() => openModal(`Analytics Modal ${item}`)}>
            <View style={styles.square}>
              <Text style={styles.analyticsText}>Coming Soon! {item} </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.swiperView}>
          <Swiper
            style={styles.swiperContainer}
            showsPagination={true}
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.activePaginationDot}
            loop={true}
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} onPress={() => openModal(`Gallery Item ${item}`)}>
                <View style={styles.swiperItem}>
                  <Text style={styles.swiperText}>Gallery Item {item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{selectedItem}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  square: {
    width: vw(45),
    height: vh(20),
    backgroundColor: 'lightgray',
    margin: 7,
    borderRadius: 10,
    borderWidth: 3,
  },
  analyticsText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: '40%',
  },
  swiperText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  swiperView: {
    marginTop: 10,
  },
  swiperContainer: {
    height: vh(20),
  },
  swiperItem: {
    width: vw(95),
    height: vh(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderRadius: 10,
    marginLeft: 10,
  },
  paginationDot: {
    backgroundColor: 'gray',
    width: 5,
    height: 5,
    borderRadius: 4,
    margin: 3,
    marginBottom: -25,
  },
  activePaginationDot: {
    backgroundColor: '#FF9000',
    width: 8,
    height: 8,
    borderRadius: 6,
    margin: 3,
    marginBottom: -25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: vw(80),
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});

export default MerchantAnalytics;
