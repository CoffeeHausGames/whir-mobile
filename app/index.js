import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './authcontext';
import MainPage from './mapscreen';
import Profile from './profile';
import Discover from './discover';
import SignIn from './signin';
import SignUp from './signup';
import MerchantSignIn from './merchantSignIn';
import MerchantDashboard from './merchantDashboard';
import MerchantProfile from './merchantProfile';
import MerchantDeals from './merchantDeals';

const Stack = createNativeStackNavigator();

const App = () => {
  const navigation = useNavigation();


  useEffect(() => {
    const removeHeader = () => {
      navigation.setOptions({
        headerShown: false,
      });
    };

    removeHeader();

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MerchantSignIn" component={MerchantSignIn} />
          <Stack.Screen name="MerchantDashboard" component={MerchantDashboard} />
          <Stack.Screen name="MerchantProfile" component={MerchantProfile} />
          <Stack.Screen name="MerchantDeals" component={MerchantDeals} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
