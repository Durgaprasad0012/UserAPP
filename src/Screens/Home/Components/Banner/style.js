import { StyleSheet } from "react-native";
import { colors } from "../../../../Components/Common/Colors";


export const style =(width, height, isProtrait)=> StyleSheet.create({
    bannerView:{
        width:isProtrait?width*.99:height*.8,
        height:isProtrait?width*.47:height*.4,
        backgroundColor:colors.light_green,
        marginHorizontal:2,
        padding:10,
        borderRadius:10
    },
    Image:{
        width:'100%',
        height:'100%',
        resizeMode:"contain",
        borderRadius:20,
        elevation:20,
    },

    bannerHead:{
        fontFamily:'Lato-Black',
        fontSize:20,
        color:colors.black,
        textTransform:"capitalize",
        margin:10,
        elevation:30
    },
    bannerContent:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black,
        margin:5,
        elevation:30
    },
    bannerTouch:{
        width:width*.35,
        padding:10,
        backgroundColor:colors.primary_green,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        elevation:20,
    },
    touchText:{
        color:colors.white,
        fontFamily:'Lato-Bold',
        fontSize:18
    }

})