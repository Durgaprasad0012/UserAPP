import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomTextInput from '../../Components/TextInput'
import CustomButton from '../../Components/CustomButton'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'
import { colors } from '../../Components/Common/Colors'
import { useDimensionContext } from '../../context'
import { validateEmail } from '../../Components/Common/Validation'
import { useDispatch } from 'react-redux'

import { styles } from './style'
import { login } from '../../Storage/action'


const Login = () => {
    const dispatch = useDispatch()
    const dimensions = useDimensionContext()
    const responsiveStyle = styles(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    const handleSubmit = () => Alert.alert("Hai....")

    const handleSignIN = async () => {
        if (email.trim() === "" && password.trim() === "") {
            Snackbar.show({
                text: 'Fillup the fields...!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.danger,
                textColor: colors.white_level_2,
                fontFamily: 'Lato-Italic',
            })
        } else {
            if (validateEmail(email.trim().toLowerCase())) {
                await firestore()
                    .collection('Users')
                    .where('email', "==", email.trim().toLowerCase())
                    .where('status', '==', true)
                    .get()
                    .then(snapshort => {
                        if (snapshort.empty) {
                            Snackbar.show({
                                text: 'Unknown e-mail address, Please check your email and try agin..!',
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor: colors.warning,
                                textColor: colors.white_level_2,
                                fontFamily: 'Lato-Italic',
                            })
                        } else {
                            snapshort.forEach(res => {
                                const respData = res.data()
                                if (respData.password === password.trim()) {
                                    Snackbar.show({
                                        text: 'Welcome Home',
                                        duration: Snackbar.LENGTH_LONG,
                                        backgroundColor: colors.primary_green,
                                        textColor: colors.white_level_1,
                                        fontFamily: 'Lato-Italic',
                                    })
                                    dispatch(
                                        login({
                                            userId:res.id,
                                            firstName: respData.firstName,
                                            lastName: respData.lastName,
                                            email: respData.email,
                                            mobileNumber: respData.mobilenumber,
                                            profilePic:respData.profileimage,
                                        })
                                    )
                                } else {
                                    Snackbar.show({
                                        text: 'Incorrect password, Please check your password and try Agin..!',
                                        duration: Snackbar.LENGTH_LONG,
                                        backgroundColor: colors.warning,
                                        textColor: colors.white_level_2,
                                        fontFamily: 'Lato-Italic',
                                    })
                                }
                            })
                        }
                    })
            } else {
                Snackbar.show({
                    text: 'Please put valid e-mail Address..!',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.danger,
                    textColor: colors.white_level_2,
                    fontFamily: 'Lato-Italic',
                })
            }

        }
    }

    const handleSignUp = () => navigation.navigate('SignUp')
    const handlePhone = () => navigation.navigate('SignPhone')
    return (
        <View style={responsiveStyle.container}>
            {/* Top BackGround */}
            <Image source={require('../../asset/img/bgTOP.jpg')} style={responsiveStyle.bgTop} />

            <ScrollView style={responsiveStyle.ScrollView}>
                {/* Logo  */}
                <Image source={require('../../asset/img/InKart.png')} style={responsiveStyle.Logo} />

                {/* Form Text */}
                <Text style={responsiveStyle.logoText}>Login Account</Text>

                {/* Form */}
                <CustomTextInput
                    type='email'
                    handleText={text => setEmail(text)}
                    placeholder="Email Address..."
                />
                <CustomTextInput
                    type='password'
                    handleText={text => setPassword(text)}
                    placeholder="Password..."
                />
                <CustomButton
                    type="primary"
                    buttonText="Sign in"
                    onPress={handleSignIN}
                />

                {/* Registration pointer */}
                <Text onPress={handleSignUp} style={responsiveStyle.createNew}> If you are new, <Text style={responsiveStyle.createNewSub}>Click here...</Text></Text>

                {/* Divider */}
                <View style={responsiveStyle.divider}>
                    <View style={responsiveStyle.dashed} />
                    <Text style={responsiveStyle.centerText}>OR</Text>
                </View>

                {/* Another Sign in Options */}
                <CustomButton
                    type="secondary"
                    buttonText="Sign in with Phone"
                    onPress={handlePhone}
                    icon={require('../../asset/img/smartphone.png')}
                />
                <CustomButton
                    type="secondary"
                    buttonText="Sign in with Google"
                    onPress={handleSubmit}
                    icon={require('../../asset/img/google.png')}
                />
            </ScrollView>

            {/* Footer Button */}
            <View style={responsiveStyle.footer}>
                <Text style={responsiveStyle.footerText}>Login in as a Guest</Text>
            </View>
        </View>
    )
}

export default Login