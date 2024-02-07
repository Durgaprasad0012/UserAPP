import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        height:isProtrait?height*.08:height*.11,
        backgroundColor:colors.primary_green,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    items:{
        width:isProtrait?width*.2:width*.15,
        justifyContent:'flex-start',    
        alignItems:'center',
        borderRadius:50,
        paddingHorizontal:2,
        paddingTop:10,
        backgroundColor:colors.primary_green
    },
    notify: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 1,
        position: 'absolute',
        right: 20,
        borderRadius: 10,
        backgroundColor: colors.danger,
        zIndex: 9,
    },
    notifyText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.white
    },
    icon:{
        width:isProtrait? width*.07:width*.04,
        height:isProtrait? width*.07:width*.04,
        resizeMode:'contain',
    },
    iconText:{
        color:colors.white,
        fontFamily:'Lato-Bold',
        fontSize:isProtrait?16:14,
    }
})