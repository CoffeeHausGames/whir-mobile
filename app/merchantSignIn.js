import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './authcontext';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Animated,
    Keyboard,
    Platform
  } from 'react-native';
  import { SplashScreen } from 'expo-router';
  import { useFonts } from 'expo-font';



function MerchantSignIn() {
  const navigation = useNavigation();
  const { merchantUser, merchantSignIn } = useAuth();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const imageScale = useRef(new Animated.Value(1)).current;
  const signInContainerBottom = useRef(new Animated.Value(-200)).current;

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
  });

  const handleSubmit = async () => {
    console.log('Sending business sign-in request:', formData);

    try {
      const response = await fetch('http://10.8.1.245:4444/business/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const merchantUser = { ...responseData.data, authenticated: true };
        console.log('Business authenticated successfully');
        merchantSignIn(merchantUser);
        navigation.navigate('MerchantDashboard');
      } else {
        console.error('Business authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
   };
   

   useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(imageScale, {
            toValue: 0.5,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(signInContainerBottom, {
            toValue: 25,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.parallel([
          Animated.timing(imageScale, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(signInContainerBottom, {
            toValue: 10,
            duration: 0,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    // Use SplashScreen.preventAutoHideAsync() here
    SplashScreen.preventAutoHideAsync();

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [imageScale, signInContainerBottom, navigation]);

  // Use SplashScreen.hideAsync() here when the component unmounts
  useEffect(() => {
    return () => {
      SplashScreen.hideAsync();
    };
  }, []);

  if (!fontsLoaded) {
    return null; 
  }
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/images/back-mobile.png')} style={styles.backImage} />
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Animated.Image
          source={require('../assets/images/Whir-Logo-V2-Square-Stacked.png')}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <Animated.View
          style={[
            styles.signInContainer,
            { bottom: signInContainerBottom },
          ]}
        >
          <Text style={styles.title}>Merchant Login</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>
          <TextInput
            style={styles.customInput}
            placeholder="Email"
            placeholderTextColor={'gray'}
            value={formData.Email}
            onChangeText={(text) => setFormData({ ...formData, Email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />
          <TextInput
            style={styles.customInput}
            placeholder="Password"
            placeholderTextColor={'gray'}
            value={formData.Password}
            onChangeText={(text) => setFormData({ ...formData, Password: text })}
            secureTextEntry
            required
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.customButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    signInContainer: {
      width: '80%',
      bottom: '10%',
      alignSelf: 'center',
      ...Platform.select({
        android: {
          paddingBottom: 300, // Adjust this value based on your needs
        },
      }),
    },
      image: {
        width: 300,
        height: 300,
        top: '10%',
        alignSelf: 'center'
      },
      title: {
        fontSize: 38,
        marginBottom: 10,
        fontFamily: 'Poppins-Black',
        color: '#fca502',
        marginBottom: 1
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
      },
      customInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-SemiBold',
        
      },
      customButton: {
        backgroundColor: '#fca502', // Set your desired button color
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        width: 100,
        paddingVertical: 15,
        alignSelf: 'flex-end',
        marginTop: 5,
        
      },
      buttonText: {
        color: '#ffffff', // Set your desired text color
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold'
      },
      registerView: {
        flexDirection: 'row',
        position: 'fixed',
        bottom: '-5%'
      },
      signUpButtonText: {
        color: '#fca502',
        fontFamily: 'Poppins-Bold'
      },
      signUpNoButtonText: {
        fontFamily: 'Poppins-Regular'
      },
      merchantButtonText: {
        color: '#fca502',
        fontFamily: 'Poppins-Bold'
      },
      merchantNoButtonText: {
        fontFamily: 'Poppins-Regular'
      },
      merchantView: {
        flexDirection: 'row',
        position: 'fixed',
        bottom: '-5%',
        marginTop: 5,
      },
      backButton: {
        position: 'absolute',
        top: 50,
        zIndex: 1, // Ensure the button is on top of other components
      },
      backImage: {
        width: 60,
        height: 60,
        // Add any other styling for your image
      },
    });

export default MerchantSignIn;