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
import Images from '../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Homescreen = ({navigation, route}: any) => {
  const isFocused = useIsFocused();
  const {color} = route.params ?? {color: '#3B3B3B'};
  const notes = useNoteStore(state => state.notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDataAsync();
    console.log(filteredNotes);
  }, [isFocused]);

  const getDataAsync = async () => {
    try {
      const notesData = await AsyncStorage.getItem('myNotes');
      if (notesData) {
        setFilteredNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.log('getDataAsync-error-log:', error);
    }
  };

  const asyncDelete = async (index: number) => {
    try {
      const tempData = filteredNotes;
      const selectedData = tempData.filter((item: any, ind: number) => {
        return ind != index;
      });
      setFilteredNotes(selectedData);
      await AsyncStorage.setItem('myNotes', JSON.stringify(selectedData));
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
            onChangeText={text => setSearch(text)}
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
