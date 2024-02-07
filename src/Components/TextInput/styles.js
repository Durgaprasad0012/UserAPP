import { StyleSheet } from "react-native";
import { colors } from "../Common/Colors";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.light_green,
        borderRadius:8,
        padding:width*.004,
        marginVertical:width*.025,
        borderWidth:1,
        borderColor:colors.gray,
        overflow:'hidden'
    },
    TextInput:{
        width:"80%",
        fontFamily:'Poppins-Regular',
        color:colors.primary_green,
        fontSize:16,
    },
    icon:{
        width:width*.05,
        height:width*.05,
    },
    check:{
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:colors.primary,
    }
})