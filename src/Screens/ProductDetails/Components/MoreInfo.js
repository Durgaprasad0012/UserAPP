import { View, Text } from 'react-native'
import React from 'react'
import { useDimensionContext } from '../../../context'
import { style } from './style'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../../Components/Common/Colors';

const MoreInfo = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    return (
        <View style={styles.container}>
            <View style={styles.moreInfoView}>
                <Text style={styles.data}>{props.data1}</Text>
                <AntDesign name={'down'}  size={20} color={colors.black_level_1} />
            </View>
            <View style={styles.moreInfoView}>
                <Text style={styles.data}>{props.data2}</Text>
                <AntDesign name={'down'}  size={20} color={colors.black_level_1} />
            </View>

        </View>
    )
}

export default MoreInfo