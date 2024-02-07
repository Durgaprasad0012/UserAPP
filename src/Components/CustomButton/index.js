import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { colors } from '../Common/Colors'

const CustomButton = (props) => {
  const { buttonText, onPress, icon, type } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {
       backgroundColor : type === "primary"? colors.primary_green:colors.light_green
      }]}
    >
      {type!=="primary"? <Image source={icon} style={styles.icon} /> : null}
      <Text style={[styles.text,{
        color : type==="primary"?colors.white : colors.black_level_3,
        fontSize:type==="primary"?20: 16,
        fontFamily:type==="primary"?'Poppins-SemiBold':'Poppins-Regular'
      }]}
      >{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton