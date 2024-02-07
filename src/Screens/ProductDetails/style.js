import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";
export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
        position: 'relative',
    },
    heart: {
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 5
    },
    imageView: {
        width: width,
        height: isProtrait ? width * .5 : height * .5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    detailsView: {
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 100
    },
    title: {
        fontFamily: 'Lato-Black',
        fontSize: 30,
        color: colors.primary_green,
        marginVertical: 15,
    },
    price: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.primary_green,
        marginVertical: 10
    },
    productDetailsView: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        paddingBottom: 10
    },
    productDetails: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.black_level_1,
        marginVertical: 10
    },
    desc: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black_level_1,
        marginVertical: 10
    },
    bottomView: {
        position: 'absolute',
        left:10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 20,
        overflow: 'hidden',
        zIndex: 5,
        width: '95%',
        backgroundColor: colors.primary_green,
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        margin:'auto'
    },
    qntView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    qntCount: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.primary_green,
        marginHorizontal: 20,
    },
    addtoCart: {
        fontFamily: 'Lato-Black',
        fontSize: 18,
        color: colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 5,
    }
})