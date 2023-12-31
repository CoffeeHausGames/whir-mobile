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
  Platform
} from 'react-native';
import { useAuth } from '../../authcontext';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import { apiRequest } from '../../networkController';

const SignIn = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const navigation = useNavigation();
  const imageScale = useRef(new Animated.Value(1)).current;
  const signInContainerBottom = useRef(new Animated.Value(-200)).current;

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf')
  });

  const handleSignUpPress = () => {
    // Navigate to the SignUp component
    navigation.navigate('SignUp');
  };

  const handleMerchantSignInPress = () => {
    // Navigate to the MerchantSignIn component
    navigation.navigate('MerchantSignIn')
  }

  useEffect(() => {
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
            toValue: 10,
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
            toValue: 10, // Adjust the value to your preference
            duration: 0,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [imageScale, signInContainerBottom]);


  const handleSubmit = async () => {
    console.log('Sending sign-in request:', formData);

    try {
      const endpoint = '/users/login';
      const method = 'POST';
      const requestData = formData;
      const response = await apiRequest(endpoint, method, requestData);

      if (response.ok) {
        // Replace the following line with the check you use to distinguish business users
        if (response.data.userType === 'business') {
          // Handle business user sign-in
          console.log('Business User Authentication Successful');
          // Business user sign-in logic
        } else {
          // Handle regular user sign-in
          console.log('User Authentication Successful');
          const user = { ...response.data, authenticated: true };
          signIn(user);

        }
      } else {
        console.error('User authentication failed');
        // You may want to show an error message to the user
        Alert.alert('Authentication Failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors, e.g., network issues
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: '#ffffff' }}
    >
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Animated.Image
          source={require('../../../assets/images/Whir-Logo-V2-Square-Stacked.png')}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <Animated.View
          style={[
            styles.signInContainer,
            { bottom: signInContainerBottom },
          ]}
        >
          <Text style={styles.title}>Login</Text>
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
          <View style={styles.registerView}>
            <Text style={styles.signUpNoButtonText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUpPress} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}> Register Here</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.merchantView}>
            <Text style={styles.merchantNoButtonText}>
              Are you a merchant?
            </Text>
            <TouchableOpacity onPress={handleMerchantSignInPress} style={styles.signUpButton}>
              <Text style={styles.merchantButtonText}> Login Here</Text>
            </TouchableOpacity>
          </View>
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
  signInContainer: {
    width: '80%',
    bottom: '10%',
    alignSelf: 'center',
    ...Platform.select({
      android: {
        paddingBottom: 300,
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
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    color: '#fca502',
    fontSize: 50,
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
  }
});

export default SignIn;
