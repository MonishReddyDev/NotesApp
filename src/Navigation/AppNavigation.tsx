import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import Notes from '../screens/Notes';
import {defaultStyles} from '../styles/styles';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
            statusBarColor: defaultStyles.container.backgroundColor,
          }}
        />
        <Stack.Screen
          name="AddNotes"
          component={Notes}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
            statusBarColor: defaultStyles.container.backgroundColor,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
