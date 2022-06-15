const API_KEY = require('../config/api.js').API_KEY;
import axios from 'axios'

export const GetInfoCity = async ({lat,lon}) => {

    let Degree = 0
    let Status = ""

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&appid=${API_KEY}`)
    
    .then(data => {

        console.log(data.data)

        Degree = Math.ceil(data.data.main.temp - 273.15)
        Status = data.data.weather[0].description

        //console.log(data.data[0].local_names.fr)
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
    .then(function () {
        // always executed
    });

    console.log("Return Degree : "+Degree)

    return {degree:Degree,status:Status}

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
        console.log(error)
    })
    .then(function () {
        // always executed
    });

    console.log("Return CityName : "+CityName)

    return CityName

}