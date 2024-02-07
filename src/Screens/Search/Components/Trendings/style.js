import { StyleSheet } from "react-native";
import { colors } from "../../../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    main:{
        paddingHorizontal:10,
        marginVertical:15,
    },
    title:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        paddingBottom:10,
        color:colors.black
    },
    TrendStyle:{
        paddingHorizontal:10,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
    },
    touch:{
        padding:10,
        borderRadius:10,
        marginRight:15,
    },
    image:{
        width:width*.23,
        height:width*.2,
        resizeMode:"contain",
    }
})