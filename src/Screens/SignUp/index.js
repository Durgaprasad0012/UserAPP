import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { validateEmail, validatePhoneNumber } from '../../Components/Common/Validation'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import CustomTextInput from '../../Components/TextInput'
import CustomButton from '../../Components/CustomButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Snackbar from 'react-native-snackbar'
import { colors } from '../../Components/Common/Colors'
import { styles } from './styles'
import { emailValidation } from './constroller'
import { useDimensionContext } from '../../context'

const SignUp = () => {

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCpassword] = useState("")
    const [error, setError] = useState(null)
    const navigation = useNavigation()

    const dimensions = useDimensionContext()
    const responesiveStyle = styles(dimensions.windowWidth, dimensions.windowHeight)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '801959080196-0rasj6mfk2c70di6soqsgl1nbad5olrp.apps.googleusercontent.com',
        })
    }, [])

    const handleGoogleSubmit = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            })
        } catch (error) {
            console.warn(error);
        }
    }

    const handleSignUp = async () => {
        if (
            username.trim() !== "" &&
            email.trim() &&
            phoneNumber.trim() &&
            password.trim() &&
            cPassword.trim()
        ) {
            if(emailValidation(email.trim())){
                if (password.trim() === cPassword.trim()) {
                    // check exsisting username and email
                    await firestore()
                        .collection('Users')
                        .where('name', '==', username.trim())
                        .where('email', '==', email.trim().toLowerCase())
                        .get()
                        .then(async (snapshort) => {
                            if (snapshort.empty) {
                                if (validateEmail(email.trim())) {
                                    if (validatePhoneNumber(phoneNumber.trim())) {
                                        const userData = {
                                            name: username.trim(),
                                            email: email.trim().toLowerCase(),
                                            mobilenumber: phoneNumber.trim(),
                                            password: password.trim(),
                                            created: String(new Date()),
                                            update: String(new Date()),
                                            status:true
                                        }
                                        await firestore()
                                            .collection('Users')
                                            .add(userData)
                                            .then(res => {
                                                Snackbar.show({
                                                    text: 'New user succefully added..',
                                                    duration: Snackbar.LENGTH_LONG,
                                                    backgroundColor: colors.warning,
                                                    textColor: colors.secondary_green
                                                })
                                                navigation.navigate('Home')
                                            })
                                            .catch(err => console.warn('ERROR :', err))
    
                                    } else {
                                        Snackbar.show({
                                            text: 'Please put the valid Phone number..',
                                            duration: Snackbar.LENGTH_LONG,
                                            backgroundColor: colors.warning,
                                            textColor: colors.white_level_2
                                        })
                                    }
                                } else {
                                    Snackbar.show({
                                        text: 'Please put the valid email address..',
                                        duration: Snackbar.LENGTH_LONG,
                                        backgroundColor: colors.warning,
                                        textColor: colors.white_level_2
                                    })
                                }
                            } else {
                                Snackbar.show({
                                    text: 'This account is already exist, try another one',
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: colors.danger,
                                    textColor: colors.white_level_2
                                })
                            }
                        })
                } else {
                    Snackbar.show({
                        text: 'Password is not Matched..',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.warning,
                        textColor: colors.white_level_2
                    })
                }
            }else{
                Snackbar.show({
                    text: 'Given email is not valid..',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.warning,
                    textColor: colors.white_level_2
                })
            }
            
        } else {
            setError('Fillup all the fields to continue..')
            Snackbar.show({
                text: 'This account is already exist, try another one',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.danger,
                textColor: colors.white_level_2
            })
        }

    }

    const handleGoback = () => navigation.goBack()
    return (
        <View style={responesiveStyle.container}>
            {/* Top BackGround */}
            <Image source={require('../../asset/img/bgTOP.jpg')} style={responesiveStyle.bgTop} />

            <ScrollView style={responesiveStyle.ScrollView}>
                {/* Logo  */}
                <Image source={require('../../asset/img/InKart.png')} style={responesiveStyle.Logo} />

                {/* Form Text */}
                <Text style={responesiveStyle.logoText}>Create New Account</Text>
                <CustomTextInput
                    handleText={text => setUserName(text)}
                    placeholder="Enter you name..."
                />
                <CustomTextInput
                    type='email'
                    handleText={text => setEmail(text)}
                    placeholder="Email Address..."
                />
                <CustomTextInput
                    type='phone'
                    handleText={text => setPhoneNumber(text)}
                    placeholder="Phone Number..."
                />
                <CustomTextInput
                    type='password'
                    handleText={text => setPassword(text)}
                    placeholder="Password..."
                />
                <CustomTextInput
                    type='password'
                    handleText={text => setCpassword(text)}
                    placeholder="Conform Password..."
                />
                <CustomButton
                    type="primary"
                    buttonText="Sign Up"
                    onPress={handleSignUp}
                />


                {/* Divider */}
                <View style={responesiveStyle.divider}>
                    <View style={responesiveStyle.dashed} />
                    <Text style={responesiveStyle.centerText}>OR</Text>
                </View>
                <CustomButton
                    type="secondary"
                    buttonText="Sign in with Google"
                    onPress={handleGoogleSubmit}
                    icon={require('../../asset/img/google.png')}
                />

                {/* Registration pointer */}
                <Text onPress={handleGoback} style={responesiveStyle.createNew}> Go to login, <Text style={responesiveStyle.createNewSub}>Click here...</Text></Text>


            </ScrollView>
        </View>
    )
}

export default SignUp


