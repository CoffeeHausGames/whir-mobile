import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Swiper from 'react-native-swiper';

const MerchantAnalytics = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.square} >
            <Text style={styles.analyticsText}>Coming Soon!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.square} >
            <Text style={styles.analyticsText}>Coming Soon!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.square} >
            <Text style={styles.analyticsText}>Coming Soon!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.square} >
            <Text style={styles.analyticsText}>Coming Soon!</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.swiperView}>
          <Swiper 
            style={styles.swiperContainer} s
            howsPagination={true} 
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.activePaginationDot}
            loop={true}
          >
            <TouchableOpacity>
              <View style={styles.swiperItem}>
                <Text style={styles.swiperText}>Gallery Item 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.swiperItem}>
                <Text style={styles.swiperText}>Gallery Item 2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.swiperItem}>
                <Text style={styles.swiperText}>Gallery Item 3</Text>
              </View>
            </TouchableOpacity>
          </Swiper>
        </View>

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
    backgroundColor: 'lightgray', // Set your desired color
    margin: 7,
    borderRadius: 10,
    borderWidth: 3,
  },
  analyticsText: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: '40%', // Adjust the margin or use paddingTop to center the text vertically
  },
  swiperText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20
  },
  swiperView: {
    marginTop: 10, // Adjust the marginTop for the desired gap
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
    marginBottom: -25
  },
  activePaginationDot: {
    backgroundColor: '#FF9000', // Change this color for the active dot
    width: 8,
    height: 8,
    borderRadius: 6,
    margin: 3,
    marginBottom: -25
  },
});


export default MerchantAnalytics;
