import { StyleSheet } from "react-native";
import { colors } from "../../../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        backgroundColor:colors.secondary_green,
        marginVertical:15,
        padding:5,
        borderRadius:10,
    },
    head:{
        fontFamily:'Lato-Black',
        fontSize:18,
        marginVertical:10,
        color:colors.primary_green
    },
    itemView:{
        width:isProtrait?width*.18:height*.18,
        height:isProtrait?width*.18:height*.18,
        elevation:5,
        marginHorizontal:10,
        borderRadius:20,
        padding:10,
        backgroundColor:colors.white_level_2,
        marginVertical:10
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    }

})