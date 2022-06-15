import React, { useEffect,useState } from 'react'
import {View,Text} from 'react-native'
import CityComponent from '../components/CityComponent.js'
import { Appbar } from 'react-native-paper';
import { GetCityName, GetInfoCity} from '../helpers/api.js';
import { iconWeather } from '../helpers/iconWeather.js';

import {styles} from '../config/style.js'
import RNLocation from 'react-native-location';

import Icon from '../../assets/weatherIcon.js'

RNLocation.configure({
    distanceFilter: 1
})

const HomeScreen = ({navigation,route}) => {

    const [city,setCity] = useState('')
    const [degree,setDegree] = useState(0)
    const [status,setStatus] = useState('')
    const [icon,setIcon] = useState('')

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
        .then( ({degree,status,icon}) => { 
            console.log("Temperature "+degree)
            setDegree(degree) 
            setStatus(status)
            setIcon(iconWeather(icon))
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
            <Appbar style={[styles.bottom,{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',padding:20,height:100}]}>
                
                <Icon name={icon} size={60} color="white" />
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Text>{city}</Text>
                <Text>{degree} °C</Text>
                <Text>{status}</Text>
                <Text>{icon}</Text>
                </View>
            </Appbar>
            <View style={styles.container}>
                <CityComponent name="test" degree={18} status="Dégagé" />
            </View>
        </View>
    )

}

export default HomeScreen