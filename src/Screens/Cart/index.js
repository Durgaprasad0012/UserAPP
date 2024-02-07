import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import { OrderTotal } from './Components/OrdersTotal'
import CustomButton from '../../Components/CustomButton'
import { useDimensionContext } from '../../context'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'
import { updateCartCount } from '../../Storage/action'

const Cart = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [charges, setCharges] = useState(0)
  const userId = useSelector(state => state.userId)
  const email = useSelector(state => state.email)
  const mobileNumber = useSelector(state => state.mobileNumber)
  const cartCount = useSelector(state => state.cartCount)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  useEffect(() => {
    if (cart.length >= 0) {
      setCharges(50)
    } else {
      setCharges(0)
    }
  }, [])

  useEffect(() => {
    if (isFocused) getCartProducts()
  }, [isFocused])

  useFocusEffect(
    useCallback(() => {
      getCartProducts()
    }, [])
  )

  // Api Calls for Product List
  const getCartProducts = async () => {
    try {
      await firestore().collection('Cart').where('userId', '==', userId).get().then((snapshot) => {
        if (!snapshot.empty) {
          const res = []
          let totalAmout = 0
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const amout = parseFloat(doc?.data().price) * parseInt(doc?.data().quantity)
              totalAmout = totalAmout + amout
              const result = { id: doc.id, ...doc?.data() }
              res.push(result)
            }
          })
          setTotal(totalAmout)
          setCart(res)
        } else {
          setTotal(0)
          setCart([])
        }
      })

    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <CommonLeftIcon />
        )
      },
    })
  }, [])

  const updateArray = productItem => {
    const result = cart.filter(data => data.id !== productItem.id)
    setTotal(total - parseFloat(productItem.price))
    setCart(result)
    dispatch(updateCartCount(cartCount - 1))
  }

  const handleTotal = (type, productInfo) => {
    if (type === "add") {
      setTotal(total + parseFloat(productInfo.price))
    } else {
      setTotal(total - parseFloat(productInfo.price))
    }
  }

  const handleCheckOut = () => {
    if (cart.length > 0) {
      if (email === "" || mobileNumber === "") {
        navigation.navigate('Account')
        Snackbar.show({
          text: `you have to complete your profile to continue..`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.danger,
          textColor: colors.white,
          fontFamily: 'Lato-Italic',
        })
      } else {
        const orderTotal = parseFloat(total + charges).toFixed(2)
        navigation.navigate('AddAddress', { cart: cart, total: orderTotal })
      }
    } else {
      Snackbar.show({
        text: `your Cart is Empty...`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.danger,
        textColor: colors.white,
        fontFamily: 'Lato-Italic',
      })
    }
  }

  const handleGotoShop = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {cart.length > 0 ? cart.map((item, index) => {
          return (
            <RenderItem key={index} item={item} index={index} updateArray={updateArray} handleTotal={handleTotal} />
          )
        }) :
          <View style={styles.emptyCartView}>
            <Text style={styles.emptyHead}>Cart is Empty</Text>
            <TouchableOpacity onPress={handleGotoShop}>
              <Text style={styles.emptyEouchText}>go to shop</Text>
            </TouchableOpacity>
          </View>
        }
        <View
          style={styles.couponView}
        >
          <ImageBackground source={require('../../asset/img/Coupon.png')} style={styles.coupon} >
            <View style={styles.offView}>
              <Text style={styles.offText}>50</Text>
              <View>
                <Text style={styles.offSideText}>%</Text>
                <Text style={styles.offSideText}>Off</Text>
              </View>
            </View>
            <View style={styles.contentView}>
              <Text numberOfLines={1} style={styles.headText}>Midnight Sale Off</Text>
              <Text numberOfLines={2} style={styles.descText}>Get 50% off</Text>
            </View>
            <View style={styles.codeView}>
              <Text style={styles.codeText}>Use Code</Text>
              <TouchableOpacity style={styles.touchView}>
                <Text style={styles.touchText}>23EDFF</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <OrderTotal total={total} charges={charges} />

        <View style={{
          marginVertical: 15
        }}>
          <CustomButton buttonText={'Proceed to CheckOut'} type={'primary'} onPress={handleCheckOut} />
        </View>
      </ScrollView>
    </View>
  )
}

const RenderItem = ({ item, index, updateArray, handleTotal }) => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const [qunt, setQunt] = useState(item.quantity)
  const userId = useSelector(state => state.userId)
  const navigation = useNavigation()

  useEffect(() => {
    setQunt(item.quantity)
  }, [item])


  // Add to cart
  const addtoCart = async () => {
    try {
      const snapshot = await firestore()
        .collection('Cart')
        .where('userId', '==', userId)
        .where('productId', "==", item.productId)
        .get();

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        const currentQuantity = snapshot.docs[0].data().quantity || 0;
        await firestore().collection('Cart').doc(docId).update({
          quantity: currentQuantity + 1,
        });
        handleTotal('add', item)
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  }


  // Decrease/Remove Cart Item
  const removeItem = async () => {
    setQunt(qunt - 1)
    try {
      const snapshot = await firestore()
        .collection('Cart')
        .where('userId', '==', userId)
        .where('productId', "==", item.productId)
        .get();
      const docId = snapshot.docs[0].id;
      const currentQuantity = snapshot.docs[0].data().quantity || 0;
      if (qunt <= 1) {
        // Remove Cart
        await firestore().collection('Cart').doc(docId).delete().then(() => {
          updateArray(item)
        })
        Snackbar.show({
          text: `${item.name} is removed from Cart List..`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.warning,
          textColor: colors.white,
          fontFamily: 'Lato-Italic',
        })
      } else {
        await firestore().collection('Cart').doc(docId).update({
          quantity: currentQuantity - 1,
        });
        handleTotal('minus', item)
      }
    } catch (error) {
      console.log("ERROR", error);
    }

  }

  const handleNavigationToProduct = () => {
    navigation.navigate('ProductDetails', { product: item })
  }

  return (
    <TouchableOpacity onPress={handleNavigationToProduct} style={styles.productView}>
      <View style={styles.imageView}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.nameText} numberOfLines={1} >{item.name}</Text>
        <Text style={styles.contentText} numberOfLines={2} >{item.desc}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>₹ {item.price} /-</Text>
          <View style={styles.offerView}>
            <Text style={styles.offerText}>10%</Text>
          </View>
          <View style={styles.qncView}>
            <TouchableOpacity onPress={removeItem}>
              <Text style={styles.qncText1}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qncText2}>{qunt}</Text>
            <TouchableOpacity onPress={() => {
              setQunt(qunt + 1)
              addtoCart()
            }}>
              <Text style={styles.qncText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Cart