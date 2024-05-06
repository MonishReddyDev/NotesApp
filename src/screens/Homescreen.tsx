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
import FloatingButton from '../components/FloatingButton';
import useNoteStore from '../store/noteStore';
import NotesItem from '../components/noteItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const Homescreen = ({navigation, route}: any) => {
  const {color} = route.params ?? {color: '#3B3B3B'};
  const notes = useNoteStore(state => state.notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [search, setSearch] = useState('');
  const {deleteNote} = useNoteStore();

  const handleDeleteNote = (index: number) => {
    deleteNote(index);
  };

  // Function to filter data based on search input
  const filterNotes = (searchText: string) => {
    const filteredData = notes.filter(note =>
      note.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredData;
  };

  // Function to handle search input change
  const handleSearchChange = (text: string) => {
    setSearch(text);
    // Update filteredNotes state with the filtered data
    setFilteredNotes(filterNotes(text));
  };

  useEffect(() => {
    // Update filteredNotes state when notes change
    setFilteredNotes(filterNotes(search));
  }, [notes, search]);

  const handleAddNote = () => {
    // Handle button press action to navigate to the AddNoteScreen
    navigation.navigate('AddNotes');
  };

  const renderEmptyNotesImage = () => {
    return (
      <View style={styles.renderItemStyle}>
        <Image
          source={
            search === '' && filteredNotes.length === 0
              ? require('../assets/rafiki.png')
              : require('../assets/cuate.png')
          }
        />
        <Text style={{color: '#fff', paddingTop: 5, fontSize: 15}}>
          {search === '' && filteredNotes.length === 0
            ? 'Create your first note!'
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
        onDelete={() => handleDeleteNote(index)}
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
        <View style={{flex: 1}}>
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
        <FloatingButton onPress={handleAddNote} title="+" />
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
