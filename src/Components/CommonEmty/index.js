import { View, Text } from 'react-native'
import React from 'react'
import { useDimensionContext } from '../../context'
import { style } from './style'

const CommonEmty = props => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

export default CommonEmty