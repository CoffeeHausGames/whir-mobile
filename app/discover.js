import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Pressable } from 'react-native';
import Footer from '../components/Footer';
import DealDisplayFull from '../components/DealDisplayFull';
import DealSearchBar from '../components/DealSearchBar';
import HorizontalButtonScroll from '../components/HorizontalButtonScroll';
import DiscoverHeader from '../components/DiscoverHeader';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-ico-material-design";

const Discover = () => {
  const navigation = useNavigation();

  const [originalDeals, setOriginalDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const fetchOriginalDeals = () => {
    return [
      {
        business_name: 'Business 1',
        deal: [{ id: 1, name: 'Deal 1', description: 'Description 1' }],
      },
      {
        business_name: 'Business 2',
        deal: [{ id: 2, name: 'Deal 2', description: 'Description 2' }],
      },
    ];
  };

  const handleSearch = (searchText) => {
    const newFilteredDeals = originalDeals.filter((deal) =>
      deal.deal.some((d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        deal.business_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setFilteredDeals(newFilteredDeals);
  };

  const handleButtonPress = (buttonText) => {
    const newFilteredDeals = filterDealsByButton(originalDeals, buttonText);

    setSelectedButton(buttonText);
    setFilteredDeals(newFilteredDeals);
  };

  useEffect(() => {
    const deals = fetchOriginalDeals();
    setOriginalDeals(deals);
    setFilteredDeals(deals);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false,
      });
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToScreen = (screen) => {
    console.log(screen + ' has been pressed!');
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <DiscoverHeader />
      <DealSearchBar onSearch={handleSearch} />
      <HorizontalButtonScroll onButtonPress={handleButtonPress} />
      <DealDisplayFull deals={filteredDeals} />
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Pressable onPress={() => navigateToScreen('Discover')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="favorite-heart-button" height={30} width={30} color='#FF9000' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('Home')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="map-symbol" height={30} width={30} color='gray' />
          </Pressable>
          <Pressable onPress={() => navigateToScreen('Profile')} style={styles.IconBehave}
            android_ripple={{ borderless: true, radius: 50 }}>
            <Icon name="user-shape" height={30} width={30} color='gray' />
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
  footer: {},
});

export default Discover;
