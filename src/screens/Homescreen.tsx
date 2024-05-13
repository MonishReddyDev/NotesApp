import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultStyles} from '../styles/styles';
import filter from 'lodash.filter';
import FloatingButton from '../components/FloatingButton';
import {Note} from '../store/noteStore';
import NotesItem from '../components/noteItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Homescreen = ({navigation, route}: any) => {
  const isFocused = useIsFocused();
  const {color} = route.params ?? {color: '#3B3B3B'};

  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getDataAsync();
  }, [isFocused]);

  const getDataAsync = async () => {
    try {
      const notesData = await AsyncStorage.getItem('myNotes');
      if (notesData) {
        const parsedNotes: Note[] = JSON.parse(notesData);
        setNotes(parsedNotes);

        // Filter data based on search query
        setFilteredNotes(filterNotes(search, parsedNotes));
      }
    } catch (error) {
      console.log('getDataAsync-error-log:', error);
    }
  };

  // Function to filter notes based on search query
  const filterNotes = (searchText: string, data: Note[]) => {
    return filter(data, (note: Note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  // Handle search input change
  const handleSearchChange = (text: string) => {
    setSearch(text);
    // Update filteredNotes state with the filtered data
    setFilteredNotes(filterNotes(text, notes));
  };

  const asyncDelete = async (index: number) => {
    try {
      const tempData = [...filteredNotes]; // Create a copy of the original array
      tempData.splice(index, 1); // Remove one element at the specified index

      setFilteredNotes(tempData); // Update state with the modified array

      await AsyncStorage.setItem('myNotes', JSON.stringify(tempData)); // Save modified array to AsyncStorage
    } catch (error) {
      console.log('AsynDelete-Log', error);
    }
  };

  const GoToScreen = () => {
    // Handle button press action to navigate to the AddNoteScreen
    navigation.navigate('AddNotes', {filteredNotes: filteredNotes});
  };

  const renderEmptyNotesImage = () => {
    return (
      <View style={styles.renderItemStyle}>
        <Image
          source={
            search === '' && filteredNotes.length === 0
              ? Images.NewNotesImage
              : Images.NoNotesImage
          }
        />
        <Text style={{color: '#fff', paddingTop: 5, fontSize: 15}}>
          {search === '' && filteredNotes.length === 0
            ? 'Create your first Note!'
            : 'File not found. Try searching again.'}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}: any) => (
    <Pressable
      onPress={() => {
        console.log('RenderItem: Pressed to Edit the notes');
        navigation.navigate('AddNotes', {
          edittitle: item.title,
          editnote: item.notes,
          index,
        });
      }}>
      <NotesItem
        color={color}
        title={item.title}
        notes={item.notes}
        onDelete={() => asyncDelete(index)}
      />
    </Pressable>
  );

  return (
    <View style={[defaultStyles.container, Androidstyles.paddingforAndroid]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[defaultStyles.container, {marginHorizontal: 10}]}>
        {/* Search Section*/}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.Icon} />
          <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search By the Keyword..."
            clearButtonMode="always"
            placeholderTextColor={'lightgray'}
            autoCapitalize="none"
            keyboardAppearance="dark"
            autoCorrect={false}
            style={styles.searchInput}
          />
        </View>
        {/* FlatList component */}
        <View style={{flex: 1, marginTop: 10}}>
          {filteredNotes.length === 0 ? (
            <>{renderEmptyNotesImage()}</>
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                initialNumToRender={3}
                data={filteredNotes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                style={{paddingBottom: 5}}
                contentContainerStyle={{flexGrow: 1}}
              />
              <View style={{height: 20}} />
            </>
          )}
        </View>
        {/* FloatingButton */}
        <FloatingButton onPress={GoToScreen} title="+" />
      </SafeAreaView>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  NoteslistContainer: {
    flex: 1,
  },
  renderItemStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  searchContainer: {
    height: Platform.OS == 'ios' ? 40 : 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#3B3B3B',
    borderRadius: 20,
  },
  Icon: {
    marginRight: 10,
  },
});

export const Androidstyles = StyleSheet.create({
  paddingforAndroid: {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
});
function setNotes(parsedNotes: any) {
  throw new Error('Function not implemented.');
}
