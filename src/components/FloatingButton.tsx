// FloatingButton.js

import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';

const FloatingButton = ({onPress}: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={require('../assets/Vector.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#2b2b2b',

    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.3, // Shadow opacity
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowRadius: 3, // Shadow radiu
  },
  image: {
    width: 30,
    height: 30,
    tintColor: 'white', // You can customize the color of the image
  },
});

export default FloatingButton;
