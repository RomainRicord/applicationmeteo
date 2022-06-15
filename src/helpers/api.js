const API_KEY = require('../config/api.js').API_KEY;
const API_RAPID_KEY = require('../config/api.js').API_RAPID_KEY;
import axios from 'axios'


export const GetNearestCity = async (lat,lon) => {

    let ListOtherCity = []

    console.log("GetNearestCity", lat, lon)

    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}+${lon}/nearbyCities`,
        params: {radius: '100'},
        headers: {
          'X-RapidAPI-Key': API_RAPID_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };

    await axios.request(options).then(function (response) {
        console.log(response.data.data);
        for(let i = 1; i < response.data.data.length; i++) {
            ListOtherCity.push({name:response.data.data[i].name,lat: response.data.data[i].latitude,lon: response.data.data[i].longitude})
        }
    }).catch(function (error) {
        console.error("Error GetNearestCity",error);
    });

    return ListOtherCity

}

export const GetInfoCity = async ({lat,lon}) => {

    let Degree = 0
    let Status = ""
    let Icon = ""
    let WindForce = 0
    let Humidity = 0
    let feels_like = 0
    let UV = 0
    let minTemp = 0
    let maxTemp = 0

    console.log("GetInfoCity Internet",lat,lon)

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&appid=${API_KEY}`)
    
    .then(data => {

        console.log(data.data)

        Degree = Math.ceil(data.data.main.temp - 273.15)
        Status = data.data.weather[0].description
        Icon = data.data.weather[0].icon
        WindForce = data.data.wind.speed
        Humidity = data.data.main.humidity
        feels_like = data.data.main.feels_like
        UV = data.data.uvi
        minTemp = Math.ceil(data.data.main.temp_min - 273.15)
        maxTemp = Math.ceil(data.data.main.temp_max - 273.15)

        //console.log(data.data[0].local_names.fr)
    })
    .catch(function (error) {
        // handle error
        console.log("GetInfoCity",error)
    })
    .then(function () {
        // always executed
    });

    //console.log("Return Degree : "+Degree)

    return {degree:Degree,status:Status,icon:Icon,windforce:WindForce,humidity:Humidity,feels_like:feels_like,UV:UV,minTemp:minTemp,maxTemp:maxTemp}

}

export const GetCityName = async ({lat,lon}) => {
    /*
    return new Promise((resolve,reject) => {
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            resolve(data.name)
        }
    )})
    */

    let CityName = ""

    await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
    
    .then(data => {

        console.log(data.data)

        if(data.data.total == 0) {
            CityName = "Aucune ville trouvée"
        }else {
            CityName = data.data[0].local_names.fr
        }

        //console.log(data.data[0].local_names.fr)
    })
    .catch(function (error) {
        // handle error
        console.log("GetCityName",error)
    })
    .then(function () {
        // always executed
    });

    console.log("Return CityName : "+CityName)

    return {CityName : CityName}

}