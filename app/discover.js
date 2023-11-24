import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DealDisplayFull from '../components/DealDisplayFull';
import DealSearchBar from '../components/DealSearchBar';
import HorizontalButtonScroll from '../components/HorizontalButtonScroll';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Discover = () => {
  const [originalDeals, setOriginalDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);

  const fetchOriginalDeals = () => {
    // Implement your logic to fetch the initial set of deals
    // For example, you can return a placeholder array for now
    return [
      // Placeholder deals
      {
        business_name: 'Business 1',
        deal: [{ id: 1, name: 'Deal 1', description: 'Description 1' }],
      },
      {
        business_name: 'Business 2',
        deal: [{ id: 2, name: 'Deal 2', description: 'Description 2' }],
      },
      // Add more deals as needed
    ];
  };

  const handleSearch = (searchText) => {
    // Implement your search logic here
    // For example, filter deals based on deal title and business name
    const newFilteredDeals = originalDeals.filter((deal) =>
      deal.deal.some((d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        deal.business_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setFilteredDeals(newFilteredDeals);
  };

  useEffect(() => {
    // Fetch and set original deals when the component mounts
    // Call your fetchOriginalDeals function here
    const deals = fetchOriginalDeals();
    setOriginalDeals(deals);
    setFilteredDeals(deals);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DealSearchBar onSearch={handleSearch} />
      <HorizontalButtonScroll />
      <DealDisplayFull deals={filteredDeals} />
      <Footer style={styles.footer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    // Add any styles for the footer if needed
  },
});

export default Discover;
