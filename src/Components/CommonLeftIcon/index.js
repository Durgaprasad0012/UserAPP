import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useDimensionContext } from '../../context'
import { style } from './style'
import { useNavigation } from '@react-navigation/native'

const CommonLeftIcon = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    // handleChange
    const handleChange = () => {
        if (props.type === 'back') {
            if (props.action) {
                props.action()
            } else {
                navigation.goBack()
            }
        } else {
            navigation.toggleDrawer()
        }
    }
    return (
        <TouchableOpacity
            onPress={handleChange}
            style={styles.touchView}
        >
            <Image source={props.type === 'back' ? require('../../asset/img/left-arrow.png') : require('../../asset/img/drawer.png')} style={styles.touchIcon} />
        </TouchableOpacity>
    )
}

export default CommonLeftIcon