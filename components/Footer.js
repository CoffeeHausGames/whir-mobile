// Footer.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation, Link } from 'expo-router';

const Footer = () => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Link href="/discover" asChild>
        <Pressable>
        <Image
          source={require('../assets/images/discover.png')}
          style={styles.buttonImage}
        />        
        </Pressable>
      </Link>
      <Link href="/main" asChild>
        <Pressable>
        <Image
          source={require('../assets/images/map.png')}
          style={styles.buttonImage}
        />        
        </Pressable>
      </Link>

      <Link href="/profile" asChild>
        <Pressable>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.buttonImage}
        />        
        </Pressable>
      </Link>



      {/* <TouchableOpacity style={styles.button} onPress={() => navigateTo('Profile')}>
        <Image source={require('../assets/images/user.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 30,
    bottom: -32,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 5,
  },
  buttonImage: {
    width: 32,
    height: 32,
  },
});

export default Footer;
