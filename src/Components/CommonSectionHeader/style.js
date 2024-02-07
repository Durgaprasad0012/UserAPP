import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height) => StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 10, 
        padding: 10
    },
    contentView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    textHead: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.black
    },
    textContent: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black
    },


})