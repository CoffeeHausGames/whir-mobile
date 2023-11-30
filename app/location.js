// import { PermissionsAndroid, Platform } from 'react-native';
// import * as Permissions from 'expo-permissions';

// const checkAndRequestLocationPermission = async () => {
//   try {
//     // Check if the app already has location permission
//     const hasPermission = await checkLocationPermission();

//     if (hasPermission) {
//       // Location permission is already granted
//       console.log('Location permission is already granted');
//     } else {
//       // Location permission is not granted, request it
//       const permissionStatus = await requestLocationPermission();
      
//       if (permissionStatus === 'granted') {
//         // Location permission granted
//         console.log('Location permission granted');
//       } else {
//         // Location permission denied
//         console.log('Location permission denied');
//         // You may want to handle this case by showing a message to the user
//       }
//     }
//   } catch (error) {
//     console.error('Error checking and requesting location permission:', error);
//   }
// };

// const checkLocationPermission = async () => {
//   try {
//     // Use expo-permissions for both iOS and Android
//     const { status } = await Permissions.getAsync(Permissions.LOCATION);
//     return status === 'granted';
//   } catch (error) {
//     console.error('Error checking location permission:', error);
//     return false;
//   }
// };

// const requestLocationPermission = async () => {
//   try {
//     // Use expo-permissions for both iOS and Android
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     return status;
//   } catch (error) {
//     console.error('Error requesting location permission:', error);
//     return 'denied';
//   }
// };

// export default checkAndRequestLocationPermission;
