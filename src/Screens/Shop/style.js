import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    categories:{
        backgroundColor:colors.secondary_green,
        padding:10,
        borderRadius:10,
        height:50,
    },
    contentStyle:{
        justifyContent:'space-around',
        alignItems:'center',
    },
    itemView:{
        marginHorizontal:10,
        paddingHorizontal:15,
        elevation:20
    },
    item:{
        fontFamily:"Lato-Regular",
        fontSize:18,
        color:colors.primary_green,
        zIndex:5,
    },
    commonPadding:{paddingHorizontal:15},
    productView: {
        width:'100%',
        borderRadius: 15,
        padding: 15,
        marginRight: 10,
        marginVertical:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:colors.white,
        overflow:'hidden',
        elevation:5,
    },
    productImage: {
        width:isProtrait? width * .2:height*.2,
        height:isProtrait? width * .2:height*.2,
        resizeMode: 'contain',
    },
    content:{paddingBottom:500},
    contentView:{
        width:'80%',
        borderLeftWidth:1,
        paddingHorizontal:15,
        marginLeft:10,
    },
    nameText:{
        fontFamily:'Lato-Black',
        fontSize:20,
        color:colors.black,
    },
    contentText:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black_level_2,
        textAlign:'justify',
        paddingRight:15,
        marginRight:10,

    },
    priceBox:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
    },
    priceText:{
        fontFamily:'Lato-Bold',
        fontSize:18,
        color:colors.primary_green,
        marginRight:15
    },
    offerView:{
        backgroundColor:colors.primary_green,
        padding:5,
        borderRadius:20,
        marginRight:20
    },
    offerText:{
        fontFamily:'Lato-Regular',
        fontSize:14,
        color:colors.white
    },
    qncView:{
        borderWidth:1,
        borderColor:colors.primary_green,
        padding:5,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:10,
    },
    qncText1:{
        fontFamily:'Lato-Black',
        fontSize:16,
        color:colors.black_level_3
    },
    qncText2:{
        fontFamily:'Lato-Black',
        fontSize:18,
        color:colors.black_level_3,
        marginHorizontal:10
    },
})