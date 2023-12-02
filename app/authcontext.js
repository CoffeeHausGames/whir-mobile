// authcontext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [merchantUser, setMerchantUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const storedMerchantUser = await SecureStore.getItemAsync('merchantUser');
        if (storedMerchantUser) {
          setMerchantUser(JSON.parse(storedMerchantUser));
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
    SecureStore.setItemAsync('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    SecureStore.deleteItemAsync('user');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const merchantSignIn = (merchantUserData) => {
    setMerchantUser(merchantUserData);
    SecureStore.setItemAsync('merchantUser', JSON.stringify(merchantUserData));
  };

  const merchantSignOut = () => {
    setMerchantUser(null);
    SecureStore.deleteItemAsync('merchantUser');
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  useEffect(() => {
    if (merchantUser) {
      navigation.navigate('MerchantDashboard');
    }
  }, [merchantUser, navigation]);

  return (
    <AuthContext.Provider value={{ user, merchantUser, isLoading, signIn, signOut, merchantSignIn, merchantSignOut }}>
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
