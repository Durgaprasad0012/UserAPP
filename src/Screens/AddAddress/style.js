import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.primary_green,
        width: width * .5,
        height: 45,
        alignSelf: 'center',
        backgroundColor: colors.light_green,
    },
    desc: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_2
    },
    mapView: {
        height: height * .5,
        width: width * .9,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15,
    },
    loactionTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    touchText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_3,
        paddingLeft: 5
    },
    addrText:{
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black_level_3,
    },
    centeredView:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    }
})