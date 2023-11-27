// Discover.js
import { useEffect } from 'react';
import Footer from '../components/Footer';
import DealDisplay from '../components/DealDisplay';
import HorizontalButtonScroll from '../components/HorizontalButtonScroll';
import ProfileCard from '../components/ProfileCard';
import ProfileHeader from '../components/ProfileHeader';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from 'expo-router';


const Profile = () => {

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


  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileCard />
    <Footer style={styles.footer}/>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'bottom'
  }
});

export default Profile;
