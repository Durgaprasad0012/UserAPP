import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDimensionContext } from '../../context'
import { style } from './style'
import { useNavigation } from '@react-navigation/native'

const CommonHeader = () => {
  const navigation = useNavigation()
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
        <Image source={require('../../asset/img/drawer.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Image source={require('../../asset/img/logo.jpeg')} style={styles.logo} />
    </View>
  )
}

export default CommonHeader