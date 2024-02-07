import { View, Text, Image } from 'react-native'
import React from 'react'
import { useDimensionContext } from '../../context'
import { style } from './styles'

const Splash = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  return (
    <View style={styles.container}>
        <Image source={require('../../asset/img/app-icon.jpeg')} style={styles.appIcon} />
    </View>
  )
}

export default Splash