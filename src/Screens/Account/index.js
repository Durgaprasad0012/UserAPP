import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CustomTextInput from '../../Components/TextInput'
import CustomButton from '../../Components/CustomButton'
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { useDimensionContext } from '../../context'
import { useNavigation } from '@react-navigation/native'
import { validateEmail, validatePhoneNumber } from '../../Components/Common/Validation'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'
import { updateProfile } from '../../Storage/action'
import { updateProfileImage } from '../../Components/Common/Controller'

const Account = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userId)
  const firstName = useSelector(state => state.firstName)
  const lastName = useSelector(state => state.lastName)
  const email = useSelector(state => state.email)
  const mobileNumber = useSelector(state => state.mobileNumber)
  const profilePic = useSelector(state => state.profilePic)
  const [fName, setFName] = useState(firstName)
  const [lName, setLName] = useState(lastName)
  const [mail, setEmail] = useState(email)
  const [contact, setContact] = useState(mobileNumber)
  const [model, setModel] = useState(false)
  const [modelPicker, setModelPicker] = useState(false)
  const [profileImage, setProfileImage] = useState('')



  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <CommonLeftIcon  />
        )
      },
    })
  }, [])


  // handleChangeProfile
  const handleChangeProfileView = () => {
    setModel(!model)
  }

  const handleChangeProfile = () => {
    setModelPicker(true)
  }
  // ChooseGallery
  const handleChoosePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => setProfileImage(image.path ?? ''))
      .catch(err => console.log('ERROR:', err));

    setModelPicker(false);
  }
  // ChooseOpen Camera
  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => setProfileImage(image.path ?? ''))
      .catch(err => console.log('ERROR : ', err))
    setModelPicker(false)
  }

  // Submit
  const handleSubmit = async () => {
    const validPhoneNumber = validatePhoneNumber(contact.trim());
    const validEmail = validateEmail(mail.trim());
    const validName = fName !== '' && lName !== '';

    let message = '';
    let bgColor = '';
    if (validPhoneNumber && validEmail && validName) {
      let newURL = profileImage
      if (profileImage !== "") {
        newURL = await updateProfileImage(profileImage)
      }
      await firestore().collection('Users').doc(userId).update({
        firstName: fName,
        lastName: lName,
        email: mail.toLowerCase(),
        mobilenumber: contact,
        profileimage: newURL,
      }).then(() => {
        dispatch(
          updateProfile({
            firstName: fName,
            lastName: lName,
            email: mail.toLowerCase(),
            mobilenumber: contact,
            profileimage: newURL,
          })
        )
        message = 'Your Profile is Updated..!'
        bgColor = colors.primary_green
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: bgColor,
          textColor: colors.white,
          fontFamily: 'Lato-Italic',
        });
      });
    } else {
      if (!validPhoneNumber) {
        message = 'Given Phone Number is not Valid...';
        bgColor = colors.danger
      } else if (!validEmail) {
        message = 'Given email Address is not Valid...';
        bgColor = colors.danger
      } else {
        message = 'Fill up all Fields...';
        bgColor = colors.danger
      }

      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: bgColor,
        textColor: colors.white,
        fontFamily: 'Lato-Italic',
      });
    }


  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.profileView}>
        <TouchableOpacity
          onPress={handleChangeProfileView}
          style={styles.imageView}>
          <Image source={profileImage === '' ?
            profilePic === '' ?
              require('../../asset/img/profile-pic.png')
              : { uri: profilePic }
            : {
              uri: profileImage
            }}
            style={styles.image} />
          <TouchableOpacity
            onPress={handleChangeProfile}
            style={styles.iconView}>
            <Image source={require('../../asset/img/edit-green.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.headTitle}>{firstName} {lastName}</Text>
      </View>
      <CustomTextInput
        handleText={text => setFName(text)}
        placeholder="Fisrt Name.."
        value={fName}
      />
      <CustomTextInput
        handleText={text => setLName(text)}
        placeholder="Last Name.."
        value={lName}
      />
      <CustomTextInput
        handleText={text => setEmail(text)}
        placeholder="e-mail Address.."
        value={mail}
        type={email}
      />
      <CustomTextInput
        handleText={text => setContact(text)}
        placeholder="Mobile Number.."
        value={contact}
        type={'phone'}
      />
      <CustomButton
        buttonText={'Update Profile'}
        type={'primary'}
        onPress={handleSubmit}
      />

      {/* Model */}
      <Modal visible={model} onRequestClose={() => setModel(false)} transparent>
        <TouchableOpacity
          onPress={() => setModel(false)}
          style={styles.bigImageView}>
          <Image source={profileImage === '' ?
            profilePic === '' ?
              require('../../asset/img/profile-pic.png')
              : { uri: profilePic }
            : {
              uri: profileImage
            }}
            style={styles.bigImage} />
        </TouchableOpacity>
      </Modal>
      <Modal visible={modelPicker} onRequestClose={() => setModelPicker(false)} transparent>
        <TouchableOpacity
          onPress={() => setModelPicker(false)}
          style={styles.bigImageView}>
          <TouchableOpacity
            onPress={handleCameraPicker}
          >
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChoosePicker}
          >
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  )
}

export default Account