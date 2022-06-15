import React from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-paper'
import {theme} from '../config/theme.js'

import RNLocation from 'react-native-location';

RNLocation.configure({
    distanceFilter: 1
})

const permissionHandle = async (navigation,route) => {

    console.log('here')
 
 
    let permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })

    if (permission){
        console.log('permission granted')
        navigation.navigate('Home')
    } else {
        console.log('permission denied')
    }
 
  }

const PermissionScreen = ({navigation,route}) => {
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button mode="contained" color={theme.colors.primary} textColor={theme.colors.tertiary} onPress={() => (permissionHandle(navigation,route))}>
                Autoriser les permissions pour l'application
            </Button>
        </View>
    )
}

export default PermissionScreen