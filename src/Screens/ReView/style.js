import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";
export const style = (width, height, isProtrait) => StyleSheet.create({
    container:{
        padding:10
    },
    reviewBox:{
        backgroundColor:colors.white,
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
})