import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    centeredView:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    orderBox: {
        backgroundColor: colors.primary_green,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    orderIdView: {
        marginLeft: 5,
        paddingVertical: 10,
    },
    headText: {
        fontFamily: 'Lato-Bold',
        fontSize: 15,
        color: colors.white_level_2,
        marginBottom: 10
    },
    headBold: {
        fontFamily: 'Lato-Black',
        fontSize: 18,
        color: colors.white
    },
    items: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.primary_green,
        marginVertical: 10,
    },
    cartItemView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        paddingHorizontal: 5
    },
    cartQntView: {
        backgroundColor: colors.primary_green,
        padding: 10,
        borderRadius: 8
    },
    cartQnt: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.white,
    },
    cartHead: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black,
    },
    cartBody: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.black_level_3,
    },
    priceView:{
        width:'20%'
    },
    payDetails:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        borderBottomColor:colors.black_level_3,
        borderBottomWidth:1,
        paddingBottom:15
    },
    payBody:{
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.black_level_2,
        lineHeight:28
    },
    coupon:{
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.danger,
        lineHeight:25
    },
    totalAmout:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10
    },
    methodView:{
        flexDirection:'row',
        alignItems:'center'
    },
    footerView:{
        paddingVertical:5,
        backgroundColor:colors.white,
        marginTop:15
    }

})