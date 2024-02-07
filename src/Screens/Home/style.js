import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white_level_3,
    },
    footerView:{
        marginHorizontal:15,
        marginTop:10,
        padding:10,
    },
    footerText:{
        fontFamily:'Lato-Bold',
        fontSize:25,
        color:colors.black_level_3,
        textAlign:'justify'
    },
    footerBtnView:{
        padding:10,
        marginBottom:isProtrait?width*.2:height*.2,
        borderRadius:10,
        backgroundColor:colors.primary_green,
        justifyContent:'center',
        alignItems:'center',
        width:width*.5,
        marginHorizontal:20
    },
    footerBtnText:{
        fontFamily:"Lato-Bold",
        fontSize:18,
        color:colors.white_level_2
    }
})