import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        backgroundColor: colors.white_level_2,
        padding: isProtrait?10:20,
        margin: isProtrait?5:10,
    },
    profileView:{
        justifyContent:'center',
        alignItems:'center'
    },
    headTitle: {
        fontFamily: 'Lato-Black',
        fontSize:isProtrait? 22:18,
        color: colors.black,
        textAlign: 'center',
    },
    imageView:{
        marginVertical:isProtrait?15:10,
        borderRadius:width/2,
        justifyContent:'center',
        alignItems:'center',
        width:isProtrait?width*.32:height*.3,
        height:isProtrait?width*.32:height*.3,
        elevation:10,
        position:'relative',
    },
    bigImageView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.black_level_4,
    },
    image:{
        width:isProtrait?width*.3:height*.25,
        height:isProtrait?width*.3:height*.25,
        borderRadius:width/2,
    },
    bigImage:{
        width:isProtrait?width*.8:height*.55,
        height:isProtrait?width*.8:height*.55,
    },
    iconView:{
        position:"absolute",
        top:isProtrait?height*.135:height*.22,
        left:isProtrait?height*.1:height*.18,
    },
    iconImage:{
        width:isProtrait?width*.1:height*.06,
        height:isProtrait?width*.1:height*.06,
        resizeMode:'contain',
    },
    optionText:{
        backgroundColor:colors.primary_green,
        padding:20,
        fontFamily:'Lato-Black',
        fontSize:20,
        color:colors.white,
        marginHorizontal:10,
        borderRadius:15,

    }
})