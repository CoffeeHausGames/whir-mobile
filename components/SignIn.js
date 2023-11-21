import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const SignIn = () => {
  const navigation = useNavigation();
  const { user, signIn } = useAuth();
  const [showComponent, setShowComponent] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const handleSubmit = async () => {
    console.log('Sending sign-in request:', formData);

    if (user && user.authenticated) {
      console.error('A user is already authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:4444/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.data.userType === 'business') {
          console.log('Business User Authentication Successful');
          // Business user sign-in logic
        } else {
          console.log('User Authentication Successful');
          const user = { ...responseData.data, authenticated: true };
          // Assuming you're using AsyncStorage for storing user data in React Native
          // Replace this with the appropriate storage mechanism for your use case
          // AsyncStorage.setItem('user', JSON.stringify(user));
          signIn();
          navigation.navigate('Home'); // Navigate to the protected route
        }
      } else {
        console.error('User authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setShowComponent(true);

    const transitionDelay = setTimeout(() => {
      setShowComponent(false);
    }, 100);

    return () => clearTimeout(transitionDelay);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.Email}
          onChangeText={(text) => setFormData({ ...formData, Email: text })}
          autoCapitalize="none"
          keyboardType="email-address"
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.Password}
          onChangeText={(text) => setFormData({ ...formData, Password: text })}
          secureTextEntry
          required
        />
        <TouchableOpacity
          style={styles.altLogin}
          onPress={() => {
            // Handle business sign-in or navigation here
            navigation.navigate('BusinessSignIn');
          }}>
          <Text style={styles.altLoginText}>Are you a merchant? Sign in here</Text>
        </TouchableOpacity>
        <Button title="Sign In" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  altLogin: {
    marginBottom: 10,
  },
  altLoginText: {
    color: 'blue',
  },
});

export default SignIn;
