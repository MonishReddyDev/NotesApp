import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

interface Note {
  title: string;
  notes: string;
  color: string;
}

interface NotesItemProps extends Note {
  onDelete: () => void; // Callback function for handling delete action
}

const NotesItem: React.FC<NotesItemProps> = ({
  title,
  notes,
  onDelete,
  color,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={{width: '85%'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.Notes} numberOfLines={2}>
          {notes}
        </Text>
      </View>
      <View style={styles.deleteBtnContainer}>
        <Icon
          name="delete"
          size={30}
          color={'#a60d24'}
          style={{padding: 10}}
          onPress={onDelete}
        />
      </View>
    </View>
  );
};

export default NotesItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  title: {
    alignSelf: 'flex-start',
    padding: 10,
    color: '#b0d0d1',
    fontSize: 20,
    fontWeight: '800',
  },
  Notes: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginBottom: 10,
    fontWeight: '600',
  },
  deleteButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnContainer: {
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
