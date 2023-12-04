import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';

const SignUp = () => {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
    Email: '',
    Password: '',
  });
  const navigation = useNavigation();
  const signUpContainerBottom = useRef(new Animated.Value(0)).current;

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(signUpContainerBottom, {
            toValue: 130,
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
          Animated.timing(signUpContainerBottom, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [signUpContainerBottom]);

  const handleSignUp = async () => {
    console.log('Sending sign-up request:', formData);

    try {
      const response = await fetch('http://10.8.1.245:4444/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        Alert.alert('Registration Successful', 'You can now sign in with your credentials.');
        navigation.goBack();
      } else {
        console.error('User registration failed');
        Alert.alert('Registration Failed', 'Invalid registration data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  if (!fontsLoaded) {
    return null; // Return null instead of <SplashScreen />
  }

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Animated.View
          style={[
            styles.signUpContainer,
            { bottom: signUpContainerBottom },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/images/back-mobile.png')} style={styles.backImage} />
          </TouchableOpacity>
          <Text style={styles.title}>Welcome!</Text>
          <TextInput
            style={styles.customInput}
            placeholder="First Name"
            placeholderTextColor={'gray'}
            value={formData.First_name}
            onChangeText={(text) => setFormData({ ...formData, First_name: text })}
            keyboardType="default"
            autoCorrect={false}
            required
          />
          <TextInput
            style={styles.customInput}
            placeholder="Last Name"
            placeholderTextColor={'gray'}
            value={formData.Last_name}
            onChangeText={(text) => setFormData({ ...formData, Last_name: text })}
            keyboardType="default"
            autoCorrect={false}
            required
          />
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
          <TouchableOpacity onPress={handleSignUp} style={styles.customButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  signUpContainer: {
    width: '80%',
    marginTop: '60%',
    alignSelf: 'center',
    ...Platform.select({
      android: {
        paddingBottom: 100, // Adjust this value based on your needs
      },
    }),
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    color: '#fca502',
    fontSize: 50,
    marginBottom: 1,
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
    backgroundColor: '#fca502',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: 100,
    paddingVertical: 15,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  backButton: {
    position: 'absolute',
    top: -170,
    left: -40,
    zIndex: 1, // Ensure the button is on top of other components
  },
  backImage: {
    width: 60,
    height: 60,
    // Add any other styling for your image
  },
});

export default SignUp;
