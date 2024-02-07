import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";

export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white
    },
    appIcon:{
        width:isProtrait? width*.25:height*.1,
        height:isProtrait? width*.25:height*.1,
        resizeMode:'contain',
    }
})