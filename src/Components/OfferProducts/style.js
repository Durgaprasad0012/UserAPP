import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: colors.white_level_4,
        borderRadius: 10,
        padding: 10,
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
    productView: {
        width: '100%',
        borderRadius: 15,
        padding: 15,
        marginRight: 10,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        overflow: 'hidden',
        elevation: 5,
    },
    productImage: {
        width: isProtrait ? width * .2 : height * .2,
        height: isProtrait ? width * .2 : height * .2,
        resizeMode: 'contain',
    },
    contentView: {
        width: '80%',
        borderLeftWidth: 1,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    nameText: {
        fontFamily: 'Lato-Black',
        fontSize: isProtrait ? 20 : 18,
        color: colors.black,
    },
    contentText: {
        fontFamily: 'Lato-Regular',
        fontSize: isProtrait ? 16 : 15,
        color: colors.black_level_2,
        textAlign: 'justify',
        paddingRight: 15,
        marginRight: 10,

    },
    footerBox: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    priceText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.primary_green
    },
    offView: {
        backgroundColor: colors.primary_green,
        padding: 5,
        borderRadius: 20,
    },
    offText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.white
    },
    qncView: {
        borderWidth: 1,
        borderColor: colors.primary_green,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
    },
    qncText1: {
        fontFamily: 'Lato-Black',
        fontSize: 16,
        color: colors.black_level_3
    },
    qncText2: {
        fontFamily: 'Lato-Black',
        fontSize: 18,
        color: colors.black_level_3,
        marginHorizontal: 10
    },


})