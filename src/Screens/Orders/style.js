import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        backgroundColor: colors.white_level_1,
        padding:10
    },
    ordersView: {
        borderRadius: 15,
        padding: 10,
        margin: 10,
        backgroundColor: colors.secondary_green,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary_green,
        paddingBottom: 15,
    },
    detailsBox:{
        width:isProtrait? width*.5:width*.7,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
    },
    highLights: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.primary_green,
        fontWeight:900
    },
    addText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.black_level_2,
        paddingBottom:8
    },
    footerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
    },
    emptyBox: {
        width: '100%',
        padding: 10,
        backgroundColor: colors.warning,
        marginVertical: 10,
        borderRadius: 10
    },
    emptyText: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: colors.white
    },
})