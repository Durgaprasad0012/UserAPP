import React, { useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomTextInput from '../../Components/TextInput'
import CustomButton from '../../Components/CustomButton'
import auth from '@react-native-firebase/auth';
import { styles } from './styles'
import Snackbar from 'react-native-snackbar'
import { colors } from '../../Components/Common/Colors'

const SignPhone = () => {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [showOtp, setShowOtp] = useState(false)
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);


    const navigation = useNavigation()

    const handleSubmit = () => {
        console.warn("Submitted..!");
    }

    const handlePhoneSubmit = async () => {
        if (phoneNumber.trim() === "") {
            Snackbar.show({
                text: 'Fillup the field...',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.warning,
                textColor: colors.white_level_2
            })
        } else {
            try {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                // Otp Conformed..
                if (confirmation) {
                    setConfirm(confirmation);
                    Snackbar.show({
                        text: 'Vaerification code is send to yoour mobilenumber, please verify',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.light_green,
                        textColor: colors.white_level_2
                    })
                    setShowOtp(true)
                }
            } catch (error) {
                console.log("ERROR :=> ", error);
                Snackbar.show({
                    text: 'Given Phone number is invalid...!',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.warning,
                    textColor: colors.white_level_2
                })
            }
        }
    }

    // Verify OTP
    const handleVerifyOTP = async () => {
        try {
            if (otp.trim() !== "") {
                const res = await confirm.confirm(otp.trim());
                if(res){
                    Snackbar.show({
                        text: 'Your phone number is verified, Login successful..!',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.primary_green,
                        textColor: colors.white_level_2
                    })
                    navigation.navigate('Home')
                }
            }
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    const handleGoback = () => navigation.goBack()
    return (
        <View style={styles.container}>
            {/* Top BackGround */}
            <Image source={require('../../asset/img/bgTOP.jpg')} style={styles.bgTop} />

            <ScrollView style={styles.ScrollView}>
                {/* Logo  */}
                <Image source={require('../../asset/img/InKart.png')} style={styles.Logo} />

                {/* Form Text */}
                <Text style={styles.logoText}>Login with Phone</Text>


                {/* Form */}
                <CustomTextInput
                    handleText={text => setPhoneNumber(text)}
                    placeholder="Phone Number..."
                    type="phone"
                />

                {/* OTP Field */}
                {showOtp ?
                    <CustomTextInput
                        handleText={text => setOtp(text)}
                        placeholder="Verify your OTP..."
                        type="phone"
                    />
                    : null}

                {/* Button */}
                <CustomButton
                    type="primary"
                    buttonText="Sign in"
                    onPress={showOtp ? handleVerifyOTP : handlePhoneSubmit}
                />

                {/* Registration pointer */}
                <Text onPress={handleGoback} style={styles.createNew}><Text style={styles.createNewSub}>Go Back...</Text></Text>
            </ScrollView>
        </View>
    )
}

export default SignPhone


