import { StyleSheet } from "react-native";
import { colors } from "../../../Components/Common/Colors";
export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        width: "100%",
        marginVertical:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    moreInfoView: {
        width: width * .4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: colors.lightGray,
        padding: isProtrait?20:15,
        borderRadius: 8
    },
    data: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: colors.black_level_2
    },
    sectionContainerStyle: {
        borderBottomColor: colors.primary_green,
        borderBottomWidth: 1,
        marginVertical:5,
        padding:5
    },
    sectionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    sectionTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_1,
    },
    details: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_2,
    },
    reviewView:{
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    reviewHead:{
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:colors.black_level_1
    },
    seeAll:{
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:colors.primary_green
    },
    reviewBox:{
        backgroundColor:colors.lightGray,
        padding:15,
        marginVertical:15,
        borderRadius:10
    },
    clientView:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    image:{
        width:40,
        height:40,
        resizeMode:'contain',
        borderRadius:15
    },
    name:{
        marginLeft:10,
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:colors.black_level_1
    },
    review:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black_level_3,
        paddingVertical:10
    },
    deliveryView:{marginBottom:15},
    checkDelivery:{
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:colors.black_level_1,
        marginBottom:10,
    },
    checkInfo:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black_level_2,
        marginVertical:5,

    },
})