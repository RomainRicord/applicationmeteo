import React, { useEffect,useState } from 'react'
import {View,Text, Image, FlatList,ImageBackground} from 'react-native'
import CityComponent from '../components/CityComponent.js'
import { Appbar,Button,Searchbar } from 'react-native-paper';
import { GetCityName, GetInfoCity, GetNearestCity} from '../helpers/api.js';

import {styles} from '../config/style.js'
import RNLocation from 'react-native-location';

import {theme} from '../config/theme.js'

import Icon from '../../assets/weatherIcon.js'

RNLocation.configure({
    distanceFilter: 1
})

const HomeScreen = ({navigation,route}) => {

    const [city,setCity] = useState('')

    const [citys,setCitys] = useState('')

    const [degree,setDegree] = useState(0)
    const [status,setStatus] = useState('')
    const [icon,setIcon] = useState('')

    const [search, setSearch] = useState('');

    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const [masterDataSource, setMasterDataSource] = useState([]);

    const searchFilterFunction = (text) => { // Thanks https://aboutreact.com/react-native-search-bar-filter-on-listview/
        // Check if searched text is not blank
        if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(
            function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
            const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }
        );
        setFilteredDataSource(newData);
        setSearch(text);
        } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);
        }
    }

    const getAllDataLocationsCity = async (citys_) => {

        console.log( 'getAllDataLocationsCity', citys_)
        let table = []

        for (let i = 0; i < citys_.length; i++) {
            const city__ = citys_[i]
            console.log("Ville : ", city__)
            const cityName = city__.name
            const cityLat = city__.lat
            const cityLon = city__.lon
            console.log("GetInfoCity",cityLat,cityLon)
            const cityInfo = await GetInfoCity( {lat:cityLat, lon:cityLon} )
            console.log("City Info of others city",cityInfo)
            const cityDegree = cityInfo.degree
            const cityStatus = cityInfo.status
            const cityIcon = cityInfo.icon
            const cityData = {name:cityName,degree:cityDegree,status:cityStatus,icon:cityIcon,lat:cityLat,lon:cityLon,windforce:cityInfo.windforce,humidity:cityInfo.humidity,feels_like:cityInfo.feels_like,UV:cityInfo.UV,minTemp:cityInfo.minTemp,maxTemp:cityInfo.maxTemp,date:cityInfo.date}
            
            table.push(cityData)
            
            console.log("getAllDataLocationsCity "+" City : "+cityName+" Degree : "+cityDegree+" Status : "+cityStatus+" Icon : "+cityIcon)
        }

        setMasterDataSource(table)
        setFilteredDataSource(table)

    }

    const GetCitySearch = async (cityName) => {

        await GetInfoCity( {byname:true,name:cityName} )
        .then( ({degree,status,icon,windforce,humidity,feels_like,UV,minTemp,maxTemp,date}) => { 
            
            let table = masterDataSource

            const cityData = {name:cityName,degree:degree,status:status,icon:icon,windforce:windforce,humidity:humidity,feels_like:feels_like,UV:UV,minTemp:minTemp,maxTemp:maxTemp,date:date}

            table.push(cityData)

            setMasterDataSource(table)

            setFilteredDataSource(table)
        })
        .catch( (error) => { console.log(error) } )
        .then(function () {
            // always executed
        });

    }

    const GetLocation = async () => {
        const location = await RNLocation.getLatestLocation({timeout: 100})
        await GetCityName( {lat:location.latitude, lon:location.longitude} )
        .then( async ({CityName,ListOtherCity}) => { 
            console.log("Ville "+city)
            setCity(CityName) 
            setCitys(ListOtherCity)
            console.log("Try to get all data locations city")

            const AllCity = await GetNearestCity(location.latitude,location.longitude)

            getAllDataLocationsCity(AllCity)
            
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
            setIcon(icon)
        })
        .catch( (error) => { console.log(error) } )
        .then(function () {
            // always executed
        });
    }

    useEffect(() => {
        setMasterDataSource([])
        setFilteredDataSource([])
        GetLocation()
        GetInfo()
        
    }, [])

    const renderItem = ({ item,index }) => {
    
        console.log("try render",item)

        return (
            <CityComponent key={index} name={item.name} degree={item.degree} date={item.date} status={item.status} icon={item.icon} windforce={item.windforce} humidity={item.humidity} feels_like={item.feels_like} UV={item.UV} minTemp={item.minTemp} maxTemp={item.maxTemp} />
        );
      };
    
    return(
        <View style={{flex:1}}>
            <ImageBackground
            // Image from https://unsplash.com/photos/EYnirI5zPT0
                source={status.includes('couvert') ? require('../../assets/img/22714288lpw-22714290-article-jpg_8500454_1250x625.jpg') : require('../../assets/img/vignette-focus.jpg')}
                style={{ width: '100%', opacity: 0.7 }} blurRadius={6}>
                <Appbar style={{backgroundColor: 'transparent',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:256}}>
                    
                    <Image source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{width:128,height:128}} />

                    <Text style={styles.textcity}>{city}</Text>
                    <Text style={styles.textcity}>{degree} ??C</Text>
                    <Text style={styles.textcity}>{status}</Text>
                
                </Appbar>
            </ImageBackground>
            <Searchbar  
                placeholder="Recherche"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                inputContainerStyle={{
                    flexDirection:'row-reverse'
                }}
            />
            <Button mode="contained" color={theme.colors.primary} buttonColor={theme.colors.primary} labelStyle={{color:'white',textAlign:'center'}} textColor="white" contentStyle={{borderRadius:20}} onPress={() => 
                {
                    GetCitySearch(search)
                }
            }>
                Rechercher
            </Button>
            
            <View style={[styles.container,{marginBottom:20}]}>
                <FlatList
                    data={filteredDataSource}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )

}

export default HomeScreen