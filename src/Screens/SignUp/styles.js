import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";

// const {width, height} = Dimensions.get('screen');
export const styles =(width, height)=> StyleSheet.create({
    container:{
        minHeight:'100%',
        overflow:'hidden',
    },
    bgTop:{
        width:width,
        height:height * 0.25,
        resizeMode:'cover'
    },
    ScrollView:{
        flex:1,
        height:'90%',
        backgroundColor:colors.white,
        marginTop:-width*.25,
        borderTopLeftRadius:width*.12,
        borderTopRightRadius:width*.12,
        paddingBottom:width*.2,
        padding:width*.08
    },
    Logo:{
        width:width * .4,
        height:width * .1,
        resizeMode:'contain',
        marginVertical:width*.035,
    },
    logoText:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        color:colors.gray,
    },
    createNew:{
        textAlign:"center",
        fontFamily:'Lato-Regular',
        fontSize:14,
        color:colors.gray,
        marginVertical:width*.025,
        paddingBottom:width*.2
    },
    createNewSub:{
        textAlign:"center",
        fontFamily:'Lato-Regular',
        fontSize:14,
        color:colors.primary,
    },
    divider:{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:10
    },
    dashed:{
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 1,
        width: '100%',
        margin:-2,
        marginBottom:0
    },
    centerText:{
        textAlign: 'center',
        position: 'relative',
        top: -10,
        backgroundColor: '#fff',
        paddingRight: 5,
        paddingLeft: 5,
    },
    footer:{
        width:width,
        height:width*.12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.secondary_green,
    },
    footerText:{
        fontFamily:'Lato-Black',
        fontSize:16,
        color:colors.black_level_3,
    },
})
