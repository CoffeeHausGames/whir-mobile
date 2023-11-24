import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DealSearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search deals..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          source={require('../assets/images/settings.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    padding: 7,
    borderColor: '#ccc',
    borderRadius: 5
  },
  buttonImage: {
    width: 20,
    height: 20,

  },
});

export default DealSearchBar;
