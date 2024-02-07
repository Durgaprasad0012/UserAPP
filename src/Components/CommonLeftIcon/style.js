import { StyleSheet, StatusBar } from "react-native";
import { colors } from "../Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    touchView: { paddingLeft: 10},
    touchIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    menuIcon: {
        resizeMode: 'contain',
        width: isProtrait ? height * .05 : height * .06,
        height: isProtrait ? height * .05 : height * .06,
    },
})