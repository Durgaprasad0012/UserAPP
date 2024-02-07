import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../Common/Colors";

const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
    button: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: width * .04,
        marginVertical: width * .013,
    },
    icon:{
        width:width*.05,
        height:width*.05,
        marginRight:5
    }
})