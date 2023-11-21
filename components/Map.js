// Map.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <View style={styles.container}>
            <MapView 
        style={styles.map}
        initiallocation={{
            latitude: -94.58107416626508,
            longitude: 39.1077698007311, 
        }}
        minZoomLevel={4}
        >
            {/* <MapView.Marker 
                coordinate={{latitude: -94.58107416626508,
                        longitude: 39.1077698007311
                    }}
                    title={"title"}
                    description={"description"}
            /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    // width: '100%',
    // height: '115%'
    position: 'absolute',
    top: -50,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default Map;
