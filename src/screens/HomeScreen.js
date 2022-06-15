import React, { useEffect,useState } from 'react'
import {View,Text} from 'react-native'
import CityComponent from '../components/CityComponent.js'
import { Appbar } from 'react-native-paper';
import { GetCityName, GetInfoCity} from '../helpers/api.js';

import {styles} from '../config/style.js'
import RNLocation from 'react-native-location';

RNLocation.configure({
    distanceFilter: 1
})

const HomeScreen = ({navigation,route}) => {

    const [city,setCity] = useState('')
    const [degree,setDegree] = useState(0)
    const [status,setStatus] = useState('')

    const GetLocation = async () => {
        const location = await RNLocation.getLatestLocation({timeout: 100})
        await GetCityName( {lat:location.latitude, lon:location.longitude} )
        .then( (city) => { 
            console.log("Ville"+city)
            setCity(city) 
        })
        .catch( (error) => { console.log(error) } )
        .then(function () {
            // always executed
        });
    }

    const GetInfo = async () => {
        const location = await RNLocation.getLatestLocation({timeout: 100})
        await GetInfoCity( {lat:location.latitude, lon:location.longitude} )
        .then( ({degree,status}) => { 
            console.log("Temperature "+degree)
            setDegree(degree) 
            setStatus(status)
        })
        .catch( (error) => { console.log(error) } )
        .then(function () {
            // always executed
        });
    }

    useEffect(() => {
        GetLocation()
        GetInfo()
    }, [])
    
    return(
        <View style={{flex:1}}>
            <Appbar style={[styles.bottom,{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:20,height:100}]}>
                <Text>{city}</Text>
                <Text>{degree} °C</Text>
                <Text>{status}</Text>
            </Appbar>
            <View style={styles.container}>
                <CityComponent name="test" degree={18} status="Dégagé" />
            </View>
        </View>
    )

}

export default HomeScreen