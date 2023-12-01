import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Pressable, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-ico-material-design';
import { useAuth } from './authcontext';
import MerchantDashboardHeader from '../components/MerchantDealBoxHeader';

var iconHeight = 30;
var iconWidth = 30;

const MerchantDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useAuth();
  const navigation = useNavigation();

  const navigateToScreen = (screen) => {
    console.log(screen + ' has been pressed!');
    navigation.navigate(screen);
  };

  useEffect(() => {
    const removeHeader = () => {
      navigation.setOptions({
        headerShown: false,
      });
    };

    removeHeader();

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MerchantDashboardHeader />
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Pressable
            onPress={() => navigateToScreen('MerchantDeals')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color="gray" />
          </Pressable>
          <Pressable
            onPress={() => navigateToScreen('MerchantDashboard')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="map-symbol" height={iconHeight} width={iconWidth} color="#FF9000" />
          </Pressable>
          <Pressable
            onPress={() => navigateToScreen('MerchantProfile')}
            style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}
          >
            <Icon name="user-shape" height={iconHeight} width={iconWidth} color="gray" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 40,
    zIndex: 2,
  },

  navBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    width: '90%',
    height: 65,
    justifyContent: 'space-evenly',
    borderRadius: 40,
    marginLeft: 20,
    borderWidth: 5,
    borderColor: '#FF9000',
  },

  IconBehave: {
    padding: 14,
  },
});

export default MerchantDashboard;
