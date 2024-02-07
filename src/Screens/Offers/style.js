import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/Colors";


export const style =(width, height,isProtrait)=> StyleSheet.create({
    main:{
        flex:1,
        padding:10
    },
    container:{
        backgroundColor:colors.white_level_1,
    }
})