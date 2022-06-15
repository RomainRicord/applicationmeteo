import React from 'react'
import {View,Text} from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from './assets/weatherIcon.js'
import HomeScreen from './src/screens/HomeScreen.js';

import {theme} from './src/config/theme.js'

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PermissionScreen from './src/screens/PermissionScreen.js';


const Stack = createNativeStackNavigator();

const App = () => {

  /*

      <Text style={{ color: theme.colors.primary , fontSize:20}}>Hello world</Text>
      <Icon name="wi-day-sunny" size={60}/>

  */

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName='Permission' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Permission" component={PermissionScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App