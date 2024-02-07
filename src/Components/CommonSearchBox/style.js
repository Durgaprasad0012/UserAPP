import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    newContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:15
    },
    searchView:{
        height:isProtrait?width*.12:height*.115,
        width:'100%',
        borderRadius:10,
        paddingHorizontal:5,
        marginVertical:10,
        backgroundColor:colors.light_green,
        borderWidth:1,
        borderColor:colors.primary_green,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    newSearchView:{
        height:isProtrait?height*.07:height*.1,
        width:isProtrait?width*.8:width*.9,
        borderRadius:10,
        padding:isProtrait?5:2,
        marginVertical:10,
        backgroundColor:colors.light_green,
        borderWidth:1,
        borderColor:colors.primary_green,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    innerView:{
        flexDirection:'row',
        alignItems:'center'
    },
    searchIcon:{
        width:isProtrait?width*.06:width*.04,
        height:isProtrait?width*.06:width*.04,
        resizeMode:'contain'
    },
    TextInput:{
        flex:1,
        fontFamily:'Lato-Regular',
        fontSize:isProtrait?16:14,
        color:colors.primary_green,
        marginLeft:5,
    },
    filterText:{
        fontFamily:'Lato-Bold',
        fontSize:18,
        color:colors.primary_green,
        padding:5,
    }

})