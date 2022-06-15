import React from 'react'
import {View,Text} from 'react-native'
import CityComponent from '../components/CityComponent.js'
import { Appbar } from 'react-native-paper';

import {styles} from '../config/style.js'

const HomeScreen = () => {
    
    return(
        <View style={{flex:1}}>
            <Appbar style={[styles.bottom,{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:20,height:100}]}>
                <Text>Nom de la ville</Text>
                <Text>00 °C</Text>
                <Text>Status de la météo</Text>
            </Appbar>
            <View style={styles.container}>
                <CityComponent name="test" degree={18} status="Dégagé" />
            </View>
        </View>
    )

}

export default HomeScreen