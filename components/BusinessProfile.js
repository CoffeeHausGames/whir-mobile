// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// const BusinessProfile = ({ businessInfo }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true); // Set loading to true when businessInfo changes
//     // You may add additional logic here if needed
//     setLoading(false);
//   }, [businessInfo]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF9000" />
//       </View>
//     );
//   }

//   if (!businessInfo) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Failed to fetch business profile information.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{businessInfo.business_name}</Text>
//       {/* <Text style={styles.info}>Address: {getFormattedAddress(businessInfo.address)}</Text> */}

//       {/* Render deals information */}
//       <Text style={styles.subtitle}>Deals:</Text>
//       {/* {businessInfo.deal.map((deal) => (
//         <View key={deal.id}>
//           <Text style={styles.dealTitle}>{deal.name}</Text>
//           <Text style={styles.dealTime}>
//             {formatTime(deal.start_time)} - {formatTime(deal.end_time)}
//           </Text>
//           <Text style={styles.dealDOW}>{deal.day_of_week}</Text>
//           <Text style={styles.dealDescription}>{deal.description}</Text>
//         </View>
//       ))} */}
//     </View>
//   );
// };

// // const getFormattedAddress = (address) => {
// //   const { street, city, state, postalCode, country } = address;
// //   return `${street}, ${city}, ${state} ${postalCode}, ${country}`;
// // };

// const formatTime = (time) => {
//   const options = { hour: 'numeric', minute: 'numeric', hour12: true };
//   const formattedTime = new Date(time).toLocaleString('en-US', options);
//   return formattedTime;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   dealTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   dealTime: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   dealDOW: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   dealDescription: {
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default BusinessProfile;
