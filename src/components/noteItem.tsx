import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

interface Note {
  title: string;
  notes: string;
}

interface NotesItemProps extends Note {
  onDelete: () => void; // Callback function for handling delete action
}

const NotesItem: React.FC<NotesItemProps> = ({title, notes, onDelete}) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{title}</Text>
          <View style={{height: 60, padding: 6}}>
            <Text style={[styles.text, {fontWeight: '300'}]}>{notes}</Text>
          </View>
        </View>
        <Pressable
          style={styles.deleteContainer}
          onPress={onDelete} // Call the onDelete callback when pressed
        >
          <Icon name="delete" size={28} color={'red'} />
        </Pressable>
      </View>
    </>
  );
};

export default NotesItem;

const styles = StyleSheet.create({
  container: {
    width: Platform.OS == 'android' ? 400 : 365,
    backgroundColor: '#333333',
    alignSelf: 'center',
    marginTop: 15,
    height: 110,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.3, // Shadow opacity
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowRadius: 3, // Shadow radiu
    borderRadius: 15,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 30,
    padding: 10,
    fontWeight: '600',
  },
  deleteContainer: {
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});
