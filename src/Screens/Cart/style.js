import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    main: {
        flex: 1,
        padding: 15
    },
    container: {
        backgroundColor: colors.white_level_2,
    },
    productView: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        overflow: 'hidden',
        elevation: 5,
    },
    imageView: {
        width: width * .2,
        height: width * .2,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    contentBox: {
        width: '75%',
        borderLeftWidth: 1,
        paddingHorizontal: 15,
        marginLeft: 15,
    },
    nameText: {
        fontFamily: 'Lato-Black',
        fontSize: 20,
        color: colors.black,
    },
    contentText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_2,
        textAlign: 'justify',
        paddingRight: 15,
        marginRight: 10,

    },
    priceBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    priceText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.primary_green,
        marginRight: 15
    },
    offerView: {
        backgroundColor: colors.primary_green,
        padding: 5,
        borderRadius: 20,
        marginRight: 20
    },
    offerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.white
    },
    qncView: {
        borderWidth: 1,
        borderColor: colors.primary_green,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
    },
    qncText1: {
        fontFamily: 'Lato-Black',
        fontSize: 18,
        color: colors.black_level_3,
        paddingHorizontal: 3
    },
    qncText2: {
        fontFamily: 'Lato-Black',
        fontSize: 16,
        color: colors.black_level_3,
        marginHorizontal: 10
    },
    couponView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 20
    },
    coupon: {
        width: isProtrait ? width * .95 : width * .8,
        height: isProtrait ? width * .32 : width * .2,
        resizeMode: 'cover',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    offView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    offText: {
        fontFamily: 'Lato-Bold',
        fontSize: 30,
        color: colors.black,
        paddingLeft: isProtrait ? 35 : 50
    },
    offSideText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.primary_green,
    },
    contentView: {
        width: isProtrait ? '43%' : '50%',
        borderLeftWidth: 1,
        borderLeftColor: colors.primary_green,
        paddingLeft: 10,
    },
    headText: {
        fontFamily: 'Lato-Black',
        fontSize: 18,
        color: colors.black_level_2
    },
    descText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.black_level_3
    },
    codeView: {
        paddingLeft: 15,
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    codeText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_3
    },

    touchView: {
        borderRadius: 10,
        backgroundColor: colors.primary_green,
        padding: 8
    },
    touchText: {
        fontFamily: 'Lato-Bold',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        color: colors.white
    },
    emptyCartView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 30
    },
    emptyHead: {
        fontFamily: "Lato-Italic",
        fontSize: 22,
        color:colors.black_level_3
    },
    emptyEouchText:{
        fontFamily:"Lato-Regular",
        fontWeight:'bold',
        fontSize:16,
        color:colors.primary
      }
})