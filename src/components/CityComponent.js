import React from 'react'
import {Text,View} from 'react-native'
import {Card,Paragraph,Title} from 'react-native-paper'
import Icon from '../../assets/weatherIcon.js'
import {styles} from '../config/style.js'
import {theme} from '../config/theme.js'
import {Image} from 'react-native'

const LeftContent = props => <Icon {...props} icon="folder" />

const CityComponent = ({name,degree,status,icon, windforce, feels_like,humidity, UV, minTemp, maxTemp, date}) => {

    console.log('icon',icon)

    return (
        <Card style={styles.card} elevation={4}>
            <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{width:60,height:60}} />
                <Card.Title titleStyle={styles.titlecard} title={name} />
            </View>
            <Card.Content style={{display:'flex',alignItems:'center',justifyContent:'center'}}> 
                <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}}>
                    <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'row'}}>
                        <View style={styles.info}>
                            <Icon name="wi-thermometer" size={30} color="black" />
                            <Title> {degree} °C</Title>
                        </View>
                        <View style={styles.info}>
                            <Icon name="wi-thermometer" size={30} color="black" />
                            <Title> {feels_like} °C ressentie</Title>
                        </View>
                    </View>
                    <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'row'}}>
                        <View style={styles.info}>
                            <Icon name="wi-direction-up" size={30} color="black" />
                            <Title> {maxTemp} °C max</Title>
                        </View>

                        <View style={styles.info}>
                            <Icon name="wi-direction-down" size={30} color="black" />
                            <Title> {minTemp} °C min</Title>
                        </View>
                    </View>
                </View>

                <View style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'row'}}>
                <View style={styles.info}>
                    <Icon name="wi-strong-wind" size={30} color="black" />
                    <Title> {windforce} km/h</Title>
                </View>
                <View style={styles.info}>
                    <Icon name="wi-humidity" size={30} color="black" />
                    <Title> {humidity} %</Title>
                </View>
                </View>
                
                <Paragraph>{status}</Paragraph>
                <Paragraph>Date du relevé: {date}</Paragraph>
            </Card.Content> 
        </Card>
    )
}

export default CityComponent