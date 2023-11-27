// import React from 'react';
// import { View, StyleSheet, StatusBar, Pressable, Text } from 'react-native';
// import { useNavigation } from 'expo-router';
// import Map from '../components/Map';
// import HomeSearch from '../components/HomeSearch';
// import DealDisplay from '../components/DealDisplay';
// import MainDealDisplay from '../components/MainDealDisplay';
// import Icon from "react-native-ico-material-design";

// var iconHeight = 30;
// var iconWidth = 30;

// const MainPage = () => {
//   const navigation = useNavigation();

//   const navigateToScreen = (screen) => {
//     console.log(screen + ' has been pressed!');
//     navigation.navigate(screen);
//   };

//   return (
//     <View style={styles.container}>
//       <Map />
//       <StatusBar style="light" />
//       <View style={styles.navContainer}>
//         <View style={styles.navBar}>
//           <Pressable onPress={() => navigateToScreen('discover')} style={styles.IconBehave}
//             android_ripple={{ borderless: true, radius: 50 }}>
//             <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color='gray' />
//           </Pressable>
//           <Pressable onPress={() => navigateToScreen('main')} style={styles.IconBehave}
//             android_ripple={{ borderless: true, radius: 50 }}>
//             <Icon name="map-symbol" height={iconHeight} width={iconWidth} color='#FF9000' />
//           </Pressable>
//           <Pressable onPress={() => navigateToScreen('profile')} style={styles.IconBehave}
//             android_ripple={{ borderless: true, radius: 50 }}>
//             <Icon name="user-shape" height={iconHeight} width={iconWidth} color='gray' />
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   navContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     bottom: 40,
//   },
//   navBar: {
//     flexDirection: 'row',
//     backgroundColor: '#eee',
//     width: '90%',
//     height: 65,
//     justifyContent: 'space-evenly',
//     borderRadius: 40,
//     marginLeft: 20,
//     borderWidth: 5,
//     borderColor: '#FF9000'
//   },
//   IconBehave: {
//     padding: 14
//   }
// });

// export default MainPage;
