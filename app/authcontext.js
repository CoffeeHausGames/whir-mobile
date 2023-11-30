import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from Expo
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation(); // Get navigation instance


  useEffect(() => {
    // Check if the user is already authenticated (e.g., check local storage or SecureStore)
    const checkAuthentication = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error reading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    // Store the user data securely (e.g., using SecureStore)
    SecureStore.setItemAsync('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    // Remove the stored user data
    SecureStore.deleteItemAsync('user');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
