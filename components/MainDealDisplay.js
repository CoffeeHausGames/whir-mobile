import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, useWindowDimensions } from 'react-native';

const MainDealDisplay = () => {
  const { height: windowHeight } = useWindowDimensions();
  const snapTop = windowHeight - 0.85 * windowHeight;
  const snapBottom = windowHeight - 0.15 * windowHeight;

  const panY = useRef(new Animated.Value(snapBottom)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dy }) => {
        panY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy > 0) {
          // Dragging down
          Animated.spring(panY, {
            toValue: dy > 100 ? snapBottom : 0,
            useNativeDriver: false,
          }).start();
        } else {
          // Dragging up
          Animated.spring(panY, {
            toValue: dy < -100 ? snapTop : 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const translateY = panY.interpolate({
    inputRange: [snapTop, snapBottom],
    outputRange: [snapTop, snapBottom],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
        {
          transform: [{ translateY }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handle} />
      <Text>Bottom Sheet Content</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderColor: 'red',
    borderWidth: 2,
  },
  handle: {
    height: 6,
    width: 40,
    backgroundColor: 'gray',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default MainDealDisplay;
