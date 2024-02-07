import { StyleSheet } from "react-native";
import { colors } from "../../../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        backgroundColor: colors.light_green,
        padding: 10,
        borderRadius:10,
        marginBottom:15
    },
    head: {
        fontFamily: 'Lato-Bold',
        fontSize:isProtrait? 20:18,
        color: colors.black_level_2,
        textAlign: 'center',
        marginVertical: isProtrait?10:8,
    },
    listLayout:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:"center",
        marginTop:10
    },
    listView: {
        textAlign:'center',
        justifyContent:'center',
        alignItems:"center",
    },
    innerView:{
        marginHorizontal:5,
        marginBottom:10,
    },
    imageView:{
        borderRadius:20,
        padding:10,
    },
    image:{
        width:isProtrait?width*.13:height*.13,
        height:isProtrait?width*.13:height*.13,
        resizeMode:'contain',
        alignSelf:'center'
    },
    content:{
        fontFamily:'Lato-Regular',
        fontSize:isProtrait?16:14,
        textAlign:'center',
        padding:10,
        color:colors.black_level_2
    }
})