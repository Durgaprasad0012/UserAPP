import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firestore from '@react-native-firebase/firestore'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import RazorpayCheckout from 'react-native-razorpay';
import { useDimensionContext } from '../../context'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CustomButton from '../../Components/CustomButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../Components/Common/Colors';
import { style } from './style'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { updateCartCount } from '../../Storage/action';
import Snackbar from 'react-native-snackbar';
// navigator.geolocation = require('@react-native-community/geolocation');

const AddAddress = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const route = useRoute()
  const { cart, total } = route.params
  const navigation = useNavigation()
  const [position, setNewPosition] = useState({})
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const userId = useSelector(state => state.userId)
  const firstName = useSelector(state => state.firstName)
  const lastName = useSelector(state => state.lastName)
  const email = useSelector(state => state.email)
  const mobileNumber = useSelector(state => state.mobileNumber)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   getCurrentLoaction()
  // }, [])
  const getCurrentLoaction = () => {
    Geolocation.getCurrentPosition(
      info => {
        setNewPosition({
          latitude: info.coords?.latitude ?? 0,
          longitude: info.coords?.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        console.error(error.message);
        // Handle the error (e.g., show a user-friendly message)
      }
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonLeftIcon type={'back'} />,
    })
  }, [])

  // handleCreateOrder
  const handleCreateOrder = async paymentId => {
    const smallId = paymentId.slice(4, 12)

    await firestore().collection('Orders').add({
      orderId: String(smallId).toUpperCase(),
      created: Date.now(),
      updated: Date.now(),
      orderStatus: 'Ordered',
      totalAmout: total,
      address: address,
      userId: userId,
      paymentMethod: 'Online',
      cartItems: cart,
      userName: `${firstName} ${lastName}`,
      userEmail: email,
      userContact: mobileNumber,
      expDelDate: ''
    }).then(res => {
      firestore().collection('Cart').where('userId', '==', userId).get()
        .then(querySnapshort => {
          querySnapshort.forEach(doc => {
            doc.ref.delete()
              .then(() => {
                setLoading(false)
                dispatch(updateCartCount(0))
                Snackbar.show({
                  text: `your Order is succefully Placed..`,
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: colors.primary_green,
                  textColor: colors.white,
                  fontFamily: 'Lato-Italic',
                })
                setTimeout(() => {
                  navigation.goBack()
                }, 2000);
              })
              .catch(err => console.log(err))
          })
        })
    })
  }

  // buttonOnPress
  const buttonOnPress = () => {
    if (address !== "") {
      var options = {
        description: 'Inkart Products purchase',
        // image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_CXo5HbmQ83IYL0',
        amount: parseInt(total, 10) * 100,
        name: 'Inkart',
        prefill: {
          email: email,
          contact: mobileNumber,
          name: `${firstName} ${lastName}`,
        },
        theme: { color: colors.pg },
      };
      RazorpayCheckout.open(options)
        .then(data => {
          // handle success
          setLoading(true)
          handleCreateOrder(data.razorpay_payment_id)
        })
        .catch(error => {
          // handle failure
          console.log('====================================');
          console.log(`Error: ${error.code} | ${error.description}`);
          console.log('====================================');
        });
    } else {
      Snackbar.show({
        text: 'Please text your address...',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.warning,
        textColor: colors.white,
        fontFamily: 'Lato-Italic',

      })
    }
  }
  return (
    <View style={styles.container}>
      {/* Model */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}>
        <View style={styles.centeredView}>
          <ActivityIndicator size={'large'} color={colors.primary_green} />
        </View>
      </Modal>

      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          currentLocation={true}
          fetchDetails={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
            language: 'en',
          }}
          styles={{
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.desc,
          }}
          onPress={(data, details) => {
            const location =
              data?.geometry?.location ?? details?.geometry?.location;
            const positionData = {
              latitude: location?.lat ?? 0,
              longitude: location?.lng ?? 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            };
            setNewPosition(positionData);
            setAddress(data?.name ?? data?.description);
          }}
        />

        {position && (
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: 0.2234,
              longitude: 0.00333,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            region={{
              latitude: 0.2234,
              longitude: 0.00333,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={true}
          >
            {address && (
              <Marker title={address} description='This is your marker' coordinate={position} />
            )}
          </MapView>
        )}
        {address && (
          <Text style={styles.addrText}>{address}</Text>
        )}

        <TouchableOpacity onPress={getCurrentLoaction} style={styles.loactionTouch}>
          <MaterialIcons name='assistant-navigation' size={22} color={colors.primary_green} />
          <Text style={styles.touchText}>Your current Location</Text>
        </TouchableOpacity>

        <CustomButton buttonText={'Continue'} type={'primary'} onPress={buttonOnPress} />
      </ScrollView>
    </View>
  )
}

export default AddAddress