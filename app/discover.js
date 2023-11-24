import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DealDisplayFull from '../components/DealDisplayFull';
import DealSearchBar from '../components/DealSearchBar';
import HorizontalButtonScroll from '../components/HorizontalButtonScroll';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Discover = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <DealSearchBar onSearch={handleSearch} />
      <HorizontalButtonScroll onButtonPress={handleButtonPress} />
      <DealDisplayFull deals={filteredDeals} />
      <Footer style={styles.footer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {},
});

export default Discover;
