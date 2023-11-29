import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './authcontext';
import MainPage from './mapscreen';
import Profile from './profile';
import Discover from './discover';
import SignIn from './signin';

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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
