import React from 'react'
import {Card,Paragraph,Title} from 'react-native-paper'
import Icon from '../../assets/weatherIcon.js'
import {styles} from '../config/style.js'
import {theme} from '../config/theme.js'
import {Image} from 'react-native'

const LeftContent = props => <Icon {...props} icon="folder" />

const CityComponent = ({name,degree,status,icon}) => {

    console.log('icon',icon)

    return (
        <Card style={styles.card} elevation={4}>
            <Card.Title titleStyle={styles.titlecard} title={name} left={(props) => <Image source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}} style={{width:60,height:60}} />} />
            <Card.Content> 
                <Title>{degree} °C</Title>
                <Paragraph>{status}</Paragraph>
            </Card.Content> 
        </Card>
    )
}

export default CityComponent