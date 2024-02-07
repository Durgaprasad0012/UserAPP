import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        backgroundColor: colors.white_level_2,
        padding:10,
        flex:1
    },
    notify: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 1,
        position: 'absolute',
        right: 5,
        top: -10,
        borderRadius: 10,
        backgroundColor: colors.danger,
        zIndex: 9,
    },
    notifyText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.white
    },
    rightIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginRight: 10,
    },
    contentContainer: {
        width: width * .9,
        flexDirection: 'row',
        alignSelf: 'center',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.white,
        marginTop:20
    },
    contentImage: {
        width: isProtrait ? width * .25 : height * .2,
        height: isProtrait ? width * .25 : height * .2,
        resizeMode: 'cover',
    },
    innerContent: {
        borderLeftColor: colors.primary_green,
        borderLeftWidth: 1,
        marginLeft: 10,
        paddingLeft: 10,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: isProtrait ? width * .6 : width * .7,
        overflow: 'hidden'
    },
    head: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.primary_green,
    },
    desc: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_1,
    },
    subView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItem: 'center',
        width: isProtrait ? width * .55 : width * .65,
    },
    price: {
        fontFamily: 'Lato-Bold',
        fontSize: 15,
        color: colors.black_level_1,
    },
    addCart: {
        fontFamily: 'Lato-Bold',
        fontSize: 15,
        color: colors.primary_green,
        borderWidth: 1,
        borderColor: colors.primary_green,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    deleteView: {
        position: 'absolute',
        top: -10,
        right: 0,
        backgroundColor: colors.danger,
        borderRadius: 10
    },
    deleteIcon: {
        width: 50,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    emptyView:{
        padding:20,
        backgroundColor:colors.warning,
        borderRadius:10
    },
    emptyText:{
        fontFamily:'Lato-Blod',
        fontWeight:'800',
        fontSize:20,
        color:colors.white,
        textAlign:'center',
        marginBottom:15
    },
    gotoHome:{
        fontFamily:'Lato-Italic',
        fontSize:16,
        color:colors.primary,
        textAlign:'center'
    },
})