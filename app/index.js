import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './authcontext';
import MainPage from './Screens/User/mapscreen';
import Profile from './Screens/User/profile';
import Discover from './Screens/User/discover';
import SignIn from './Screens/Ext/signin';
import SignUp from './Screens/Ext/signup';
import MerchantSignIn from './Screens/Ext/merchantSignIn';
import MerchantDashboard from './Screens/Merchant/merchantDashboard';
import MerchantProfile from './Screens/Merchant/merchantProfile';
import MerchantDeals from './Screens/Merchant/merchantDeals';
import SettingsScreen from './Screens/User/UserSettings';
import AccountSettings from '../components/User/profile/UserSettings/UserAccountSettings';
import UserNotificationSettings from '../components/User/profile/UserSettings/UserNotificationSettings';
import UserPrivacySettings from '../components/User/profile/UserSettings/UserPrivacySettings';
import UserSecuritySettings from '../components/User/profile/UserSettings/UserSecuritySettings';
import UserAppearanceSettings from '../components/User/profile/UserSettings/UserAppearanceSettings';
import UserLanguageSettings from '../components/User/profile/UserSettings/UserLanguageSettings';
import UserAccessibilitySettings from '../components/User/profile/UserSettings/UserAccessibilitySettings';
import UserGeneralSettings from '../components/User/profile/UserSettings/UserGeneralSettings';

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
          <Stack.Screen name="UserSettings" component={SettingsScreen} />
          <Stack.Screen name="UserAccountSettings" component={AccountSettings} />
          <Stack.Screen name="UserNotificationSettings" component={UserNotificationSettings} />
          <Stack.Screen name="UserPrivacySettings" component={UserPrivacySettings} />
          <Stack.Screen name="UserSecuritySettings" component={UserSecuritySettings} />
          <Stack.Screen name="UserAppearanceSettings" component={UserAppearanceSettings} />
          <Stack.Screen name="UserLanguageSettings" component={UserLanguageSettings} />
          <Stack.Screen name="UserAccessabilitySettings" component={UserAccessibilitySettings} />
          <Stack.Screen name="UserGeneralSettings" component={UserGeneralSettings} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
