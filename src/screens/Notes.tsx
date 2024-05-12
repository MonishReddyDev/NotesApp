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
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultStyles} from '../styles/styles';
import IconComponent from '../components/IconComponent';
import useNoteStore, {Note} from '../store/noteStore';
import {Androidstyles} from './Homescreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Colors = ['#10A881', '#8B78E6', '#1287A5', '#EA7773', '#333945', '#3498DB'];

const Notes = ({navigation, route}: any) => {
  // // Provide a default value for note in case it's not passed from route params
  const {edittitle, editnote, index} = route.params ?? {
    edittitle: null,
    editnote: null,
    index: null,
  };

  // const exist = index !== null;

  const [initialTitle, setInitialTitle] = useState(edittitle ?? '');
  const [initialNotes, setInitialNotes] = useState(editnote ?? '');
  const [title, setTitle] = useState(edittitle ? edittitle : '');
  const [Notes, setNotes] = useState(editnote ? editnote : '');
  const addNote = useNoteStore(state => state.addNote);
  const editNote = useNoteStore(state => state.editNotes);

  // Check if any changes have been made to the note
  const isNoteEdited =
    initialTitle !== title || (initialNotes !== Notes && index !== null);
  useEffect(() => {
    console.log('Is file edited:', isNoteEdited);
  }, [isNoteEdited]);

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
          onPress: () => {
            const randomIndex = Math.floor(Math.random() * Colors.length);
            const randomColor = Colors[randomIndex];

            // Pass the random color when navigating to the Home screen
            navigation.navigate('Home', {color: randomColor});
          },
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

  const SaveNotesAsync = async () => {
    try {
      if (title !== '' && Notes !== '') {
        const existingDataString = await AsyncStorage.getItem('myNotes');
        const existindData: Note[] = existingDataString
          ? JSON.parse(existingDataString)
          : [];
        const updatedData = [...existindData, {title: title, notes: Notes}];
        // Save updated data back to AsyncStorage
        await AsyncStorage.setItem('myNotes', JSON.stringify(updatedData));
        setTitle('');
        setNotes('');
        // Navigate back
        navigation.goBack();
      } else {
        Alert.alert('Notes is Empty please Add some Notes');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const saveEditNotes = async () => {
    try {
      //Get the existing Notes
      const existingDataString = await AsyncStorage.getItem('myNotes');
      if (existingDataString != null) {
        //convert the notes into JSON
        const existingData = JSON.parse(existingDataString);
        //UPDATE the notes withe title and Notes
        existingData[index] = {title: title, notes: Notes};
        //SetItem => setNotes to reflext the changes
        await AsyncStorage.setItem('myNotes', JSON.stringify(existingData));
        if (isNoteEdited) {
          console.log('Going to home Some Chages Made!');
          showAlerts();
        } else {
          console.log('Going to home No Chages Made!');

          navigation.goBack();
        }
      }
    } catch (error) {
      console.log('error while editing Notes:', error);
    }
  };

  // const SaveNotes = () => {
  //   if (title !== '' && Notes !== '') {
  //     console.log('Notes saved');
  //     const updatedNote: Note = {title, notes: Notes};
  //     if (index !== null && isNoteEdited) {
  //       editNote(index, updatedNote); // Update existing note
  //       showAlerts();
  //     } else {
  //       if (!exist) {
  //         console.log('Notes nots Created');
  //         const newNote: Note = {title, notes: Notes};
  //         addNote(newNote); // Add new note
  //       }
  //     }
  //     setTitle('');
  //     setNotes('');
  //   } else {
  //     Alert.alert('Notes is Empty please Add some Notes');
  //   }
  // };

  return (
    <View style={[defaultStyles.container, Androidstyles.paddingforAndroid]}>
      <SafeAreaView style={{marginHorizontal: 10}}>
        <View style={styles.topSectionStyle}>
          <TouchableOpacity
            onPress={() => {
              try {
                navigation.goBack();
              } catch (error) {
                console.log(error);
              }
            }}>
            <IconComponent name={'chevron-down'} />
          </TouchableOpacity>
          <View style={styles.buttonsStyle}>
            <IconComponent name={Platform.OS == 'ios' ? 'apple' : 'android'} />
            <TouchableOpacity
              onPress={() => {
                if (index != null || index != undefined) {
                  saveEditNotes();
                } else {
                  SaveNotesAsync();
                }
              }}>
              <IconComponent name={'save'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Notes Text Inputes View */}
        <View style={styles.container}>
          <TextInput
            multiline
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
