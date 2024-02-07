import { StyleSheet, StatusBar } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        width: width,
        height: isProtrait ? height * .09 : height * .13,
        paddingHorizontal: width * .05,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuIcon: {
        resizeMode: 'contain',
        width: isProtrait ? width * .08 : height * .06,
        height: isProtrait ? width * .08 : height * .06,
    },
    logo: {
        width: isProtrait ? height * .18 : height * .25,
        height: isProtrait ? height * .1 : height * .25,
        resizeMode: 'contain',
    }
})