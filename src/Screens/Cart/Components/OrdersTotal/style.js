import { StyleSheet } from "react-native";
import { colors } from "../../../../Components/Common/Colors";


export const style =(width, height,isProtrait)=> StyleSheet.create({
    conatiner:{
        flex:1, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        paddingBottom:10
    },
    headText:{
        fontFamily:'Lato-Black', 
        fontSize:20, 
        color:colors.black,
        marginBottom:10
    },
    detailHead:{
        fontFamily:"Lato-Bold",
        fontSize:18,
        lineHeight:30,
        color:colors.black_level_2
    },
    detailText:{
        fontFamily:"Lato-Regular",
        fontSize:16,
        lineHeight:30,
        textAlign:"right"
    },
    orderEnd:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    }
})