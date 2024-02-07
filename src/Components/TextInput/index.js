import { Image, TextInput, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { style } from './styles'
import { colors } from '../Common/Colors'
import { useDimensionContext } from '../../context'

const CustomTextInput = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const [show, setShow] = useState(false)

    const { type, handleText, placeholder, value, check, multiline } = props
    const keyboardType = type === 'email' ? 'email-address' : type === 'password' ? 'default' : type === 'phone' ? 'phone-pad' : 'default'
    const secureTextEntry = type === 'password' ? (show ? false : true) : false

    const icon = type === "email" ? require('../../asset/img/email.png') :
        type === 'password' ? show ?
            require('../../asset/img/view.png') :
            require('../../asset/img/hide.png') : "";

    const handleShow = () => setShow(!show)
    return (
        <View
            style={styles.container}
        >
            <TextInput
                style={[styles.TextInput, { textTransform: type === 'email' ? 'lowercase' : 'capitalize', height: multiline ? dimensions.windowHeight * .2 : null }]}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={colors.gray}
                onChangeText={handleText}
                autoCapitalize={type === 'email' ? 'none' : 'words'}
                value={value}
                multiline={multiline}
            />
            {check ? <Text style={styles.check}>Check</Text> : null}
            <TouchableOpacity
                onPress={handleShow}
                disabled={type === 'password' ? false : true}
            >
                <Image style={styles.icon} source={icon} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomTextInput