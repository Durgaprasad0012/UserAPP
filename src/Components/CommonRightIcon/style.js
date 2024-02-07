import { StyleSheet, StatusBar } from "react-native";
import { colors } from "../Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    iconView:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    touchView: { paddingRight: 10 },
    touchIcon: {
        height: 25,
        width: 25,
        position:'relative'
    },
    menuIcon: {
        resizeMode: 'contain',
        width: isProtrait ? width * .05 : height * .06,
        height: isProtrait ? width * .05 : height * .06,
    },
    count:{
        fontFamily:'Lato-Regular',
        fontSize:14,
        color:colors.white,
        backgroundColor:colors.danger,
        textAlign:'center',
        borderRadius:50,
        paddingHorizontal:2,
        position:'absolute',
        left:15,
        top:-10,
        zIndex:2,
    }
})