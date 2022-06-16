import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import {theme} from '../config/theme.js'

import RNLocation from 'react-native-location';

RNLocation.configure({
    distanceFilter: 200
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
            <Text style={styles.textpermission}>L'application a besoin de votre localisation pour fonctionner</Text>
            <Button mode="contained" color={theme.colors.primary} buttonColor={theme.colors.primary} labelStyle={{color:'white',textAlign:'center'}} style={{borderRadius:20,marginTop:20}} textColor="white" contentStyle={{borderRadius:20}} onPress={() => (permissionHandle(navigation,route))}>
                Autoriser
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
  textpermission:{
    color:'black',
    fontSize:30,
    textAlign:'center'
  }
})

export default PermissionScreen