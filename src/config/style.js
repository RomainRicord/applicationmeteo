import { StyleSheet } from "react-native"
import {theme} from './theme.js'

export const styles = StyleSheet.create({

    container: {
        flex:1,
        display:'flex',
        
        marginTop:20,
        alignItems:'center'
    },
    card: {
        width:350,
        height:200,
        backgroundColor:'rgb(200,200,200)',
        borderRadius:20,
        marginTop:20
    },
    titlecard: {
        fontSize:30,
        fontWeight:'bold',
        color:theme.colors.primary
    },
    textcity:{
        fontSize:20,
        color:'white'
        
    }

})