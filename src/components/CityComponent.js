import React from 'react'
import {Card,Paragraph,Title} from 'react-native-paper'
import Icon from '../../assets/weatherIcon.js'
import {styles} from '../config/style.js'
import {theme} from '../config/theme.js'

const LeftContent = props => <Icon {...props} icon="folder" />

const CityComponent = ({name,degree,status}) => {
    return (
        <Card style={styles.card} elevation={4}>
            <Card.Title titleStyle={styles.titlecard} title={name} left={(props) => <Icon name="wi-day-sunny" size={60} color="red" />} />
            <Card.Content> 
                <Title>{degree} °C</Title>
                <Paragraph>{status}</Paragraph>
            </Card.Content> 
        </Card>
    )
}

export default CityComponent