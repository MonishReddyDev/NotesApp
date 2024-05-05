import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import useNoteStore from '../store/noteStore';



const NotesComponent = () => {
  const {notes, deleteNote} = useNoteStore();
  const handleDeleteNote = (index: number) => {
    deleteNote(index);
  };

  return (
    <View>
      <Text>Notes</Text>
      <FlatList
        data={notes}
        renderItem={({item, index}) => (
          <View>
            <Text>
              {item.title} - {item.notes}
            </Text>
            <Button title="Delete" onPress={() => handleDeleteNote(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotesComponent;
