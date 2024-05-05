import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultStyles} from '../styles/styles';
import IconComponent from '../components/IconComponent';
import useNoteStore, {Note} from '../store/noteStore';
import {Androidstyles} from './Homescreen';

const Notes = ({navigation, route}: any) => {
  // // Provide a default value for note in case it's not passed from route params
  const {edittitle, editnote, index} = route.params ?? {
    edittitle: null,
    editnote: null,
    index: null,
  };
  const [initialTitle, setInitialTitle] = useState(edittitle ?? '');
  const [initialNotes, setInitialNotes] = useState(editnote ?? '');
  const [title, setTitle] = useState(edittitle ? edittitle : '');
  const [Notes, setNotes] = useState(editnote ? editnote : '');
  const [showAlert, setshowAlert] = useState(false);
  const addNote = useNoteStore(state => state.addNote);
  const editNote = useNoteStore(state => state.editNotes);

  // Check if any changes have been made to the note
  const isNoteEdited = initialTitle !== title || initialNotes !== Notes;
  console.log('is file edited:', isNoteEdited);

  const handleModelClose = () => {
    Keyboard.dismiss();
  };

  const onChangeTextHandler = (text: string, valuefor: string) => {
    if (valuefor == 'Notes') setNotes(text);
    if (valuefor == 'title') setTitle(text);
  };

  const showAlerts = () => {
    return Alert.alert(
      'Save Changes',
      'Do you want to save the changes?',
      [
        {
          text: 'Keep Changes',
          onPress: () => navigation.navigate('Home'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const handleSave = () => {
    if (title !== '' && Notes !== '') {
      console.log('Notes saved');
      const updatedNote: Note = {title, notes: Notes};
      if (index !== null && Notes !== null && isNoteEdited) {
        editNote(index, updatedNote); // Update existing note
        showAlerts();
      } else {
        const newNote: Note = {title, notes: Notes};
        addNote(newNote); // Add new note
        navigation.navigate('Home');
      }
      setTitle('');
      setNotes('');
    } else {
      setshowAlert(true);
    }
  };

  return (
    <View style={[defaultStyles.container, Androidstyles.paddingforAndroid]}>
      <SafeAreaView style={{marginHorizontal: 10}}>
        <View style={styles.topSectionStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <IconComponent name={'chevron-left'} />
          </TouchableOpacity>
          <View style={styles.buttonsStyle}>
            <IconComponent name={'visibility'} />
            <TouchableOpacity
              onPress={() => {
                handleSave();
              }}>
              <IconComponent name={'save'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Notes Text Inputes View */}
        <View style={styles.container}>
          <TextInput
            multiline
            autoCapitalize="words"
            placeholderTextColor={'#9A9A9A'}
            placeholder="Title"
            value={title}
            style={[styles.input, styles.Title, {fontSize: 35}]}
            onChangeText={text => onChangeTextHandler(text, 'title')}
          />
          <TextInput
            multiline
            placeholderTextColor={'#9A9A9A'}
            placeholder="Type something...... "
            style={[styles.input, styles.description]}
            value={Notes}
            onChangeText={text => onChangeTextHandler(text, 'Notes')}
          />
        </View>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={handleModelClose}>
        <View style={[styles.modelBG, StyleSheet.absoluteFillObject]}></View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  topSectionStyle: {
    height: 50,
    marginLeft: 13,
    flexDirection: 'row',
  },
  buttonsStyle: {
    flexDirection: 'row',
    marginLeft: '52%',
    gap: 25,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 26,
    borderWidth: 0,
  },

  Title: {
    marginBottom: 15,
    color: '#a0c55f',
    fontWeight: '500',
  },
  description: {},
  input: {
    color: 'white',
    fontSize: 30,
    borderBlockColor: '#9A9A9A',
  },
  modelBG: {
    flex: 1,
    zIndex: -1,
  },
});
