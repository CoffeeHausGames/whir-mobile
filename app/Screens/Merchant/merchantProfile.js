import { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Pressable } from 'react-native';
import ProfileHeader from '../../../components/User/profile/ProfileHeader';
import { useNavigation } from 'expo-router';
import Icon from "react-native-ico-material-design";
import MerchantProfileCard from '../../../components/Merchant/merchantProfile/merchantProfileCard';

var iconHeight = 30;
var iconWidth = 30;

const MerchantProfile = () => {
  const navigation = useNavigation();

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

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ProfileHeader />
      <MerchantProfileCard />
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Pressable onPress={() => navigateToScreen('MerchantDeals')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color='gray' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('MerchantDashboard')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="map-symbol" height={iconHeight} width={iconWidth} color='gray' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('MerchantProfile')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="user-shape" height={iconHeight} width={iconWidth} color='#FF9000' />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 40,
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
    borderColor: '#FF9000'
  },
  IconBehave: {
    padding: 14
  },
});

export default MerchantProfile;
