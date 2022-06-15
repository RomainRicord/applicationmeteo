import React from 'react'
import {View,Text} from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from './assets/weatherIcon.js'
import HomeScreen from './src/screens/HomeScreen.js';

import {theme} from './src/config/theme.js'

const App = () => {

  /*

      <Text style={{ color: theme.colors.primary , fontSize:20}}>Hello world</Text>
      <Icon name="wi-day-sunny" size={60}/>

  */

  return (
    <PaperProvider theme={theme}>
      <HomeScreen/>
    </PaperProvider>
  )
}

export default App