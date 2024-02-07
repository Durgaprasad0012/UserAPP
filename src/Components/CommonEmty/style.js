import { StyleSheet } from "react-native";
import { colors } from "../Common/Colors";
export const style = (width, height, isProtrait) => StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        margin:15,
        padding:10,
        borderRadius:8,
        backgroundColor:colors.dangerTrans
    },
    title:{
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:colors.danger,
        elevation:50,
    }
})
