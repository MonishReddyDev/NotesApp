import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  name: string;
};

const IconComponent = ({name}: IconProps) => {
  return (
    <View style={styles.container}>
      {name == 'visibility' ? (
        <MaterialIcon name={name} color={'white'} size={19} />
      ) : (
        <Icon name={name} color={'white'} size={19} />
      )}
    </View>
  );
};

export default IconComponent;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 48,
    backgroundColor: '#3B3B3B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
