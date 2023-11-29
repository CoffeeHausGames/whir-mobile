import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from './authcontext'; // Update the path
import { useNavigation } from 'expo-router';

const SignIn = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const navigation = useNavigation();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerShown: false,
      });
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = async () => {
    console.log('Sending sign-in request:', formData);

    try {
      const response = await fetch('http://10.8.1.245:4444/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Replace the following line with the check you use to distinguish business users
        if (responseData.data.userType === 'business') {
          // Handle business user sign-in
          console.log('Business User Authentication Successful');
          // Business user sign-in logic
        } else {
          // Handle regular user sign-in
          console.log('User Authentication Successful');
          const user = { ...responseData.data, authenticated: true };
          // Assuming you have a function to update the authentication status in your context
          signIn(user);

          // Perform navigation to the protected route in your app
          // For example, navigate to your home screen
          // This depends on the navigation library you're using (e.g., React Navigation)
          // navigation.navigate('Home');
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

  return (
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>
        <TextInput
          style={styles.customInput}
          placeholder="Email"
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
          value={formData.Password}
          onChangeText={(text) => setFormData({ ...formData, Password: text })}
          secureTextEntry
          required
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.customButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', // Set your desired background color
    },
    signInContainer: {
      width: '80%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
    },
    customInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    customButton: {
      backgroundColor: '#007bff', // Set your desired button color
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff', // Set your desired text color
      fontWeight: 'bold',
    },
  });

export default SignIn;
