import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: colors.white,
        borderRadius: 10, 
        padding: 10,  
        elevation:2
    },
    productView: {
        width:isProtrait?width*.4:height*.4,
        height:isProtrait?width*.65:height*.65,
        borderRadius: 15,
        borderColor: colors.primary_green,
        borderWidth: 1,
        padding: 15,
        margin: 10,
        justifyContent:'space-between',
        alignItems:'center',
        position:"relative",
    },
    headImage: {
        width: isProtrait?width * .04:height*.04,
        height: isProtrait?width * .04:height*.04,
        resizeMode: 'contain',
        alignSelf:'flex-end',
        right:-25,
    },
    productImage: {
        width:isProtrait? width * .25:height*.25,
        height:isProtrait? width * .25:height*.25,
        resizeMode: 'contain',
    },
    nameText:{
        fontFamily:'Lato-Black',
        fontSize:isProtrait?20:18,
        color:colors.black,
        
    },
    contentText:{
        fontFamily:'Lato-Regular',
        fontSize:isProtrait?18:16,
        color:colors.black_level_2,

    },
    footerBox:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    },
    priceText:{
        fontFamily:'Lato-Bold',
        fontSize:18,
        color:colors.primary_green
    },
    addBox:{
        borderRadius:5,
        backgroundColor:colors.primary_green,
        justifyContent:'center',
        alignContent:'center'
    },
    addText:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        color:colors.white,
        padding:5
    }

})