import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DealDisplayFull from '../components/DealDisplayFull';
import DealSearchBar from '../components/DealSearchBar';
import HorizontalButtonScroll from '../components/HorizontalButtonScroll';
import DiscoverHeader from '../components/DiscoverHeader';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary hook

const Discover = () => {
  const navigation = useNavigation(); // Use the navigation hook

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

  // Set the header to be hidden
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false,
      });
    });

    // Clean up the subscription
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <DiscoverHeader /> 
      <DealSearchBar onSearch={handleSearch} />
      <HorizontalButtonScroll onButtonPress={handleButtonPress} />
      <DealDisplayFull deals={filteredDeals} />
      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {},
});

export default Discover;
