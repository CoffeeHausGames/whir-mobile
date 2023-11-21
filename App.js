import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import UserSettings from './components/UserSettings';
import UserProfile from './components/UserProfile';
import BusinessSignIn from './components/BusinessSignIn';
import SearchScreen from './components/SearchScreen';
import Footer from './components/Footer';
import BusinessSignUp from './components/BusinessSignUp';
import SuccessScreen from './components/SuccessScreen';
import BusinessDealManager from './components/BusinessDealManager';
import BusinessDashboard from './components/BusinessDashboard';
import HomeAbout from './components/HomeAbout';
import HomeLocations from './components/HomeLocations';
import HomeSpotlight from './components/HomeSpotlight';
import LandingPage from './components/LandingPage';
import Search from './components/Search';
import MapComponent from './components/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="BusinessSignIn" component={BusinessSignIn} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="UserSettings" component={UserSettings} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="BusinessDealManager" component={BusinessDealManager} />
          <Stack.Screen name="BusinessDashboard" component={BusinessDashboard} />
          <Stack.Screen name="HomeSpotlight" component={HomeSpotlight} />
          <Stack.Screen name="HomeLocations" component={HomeLocations} />
          <Stack.Screen name="HomeAbout" component={HomeAbout} />
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="MapComponent" component={MapComponent} />
          {/* Add more screens as needed */}

          {/* Default fallback screen */}
          <Stack.Screen name="Default" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

