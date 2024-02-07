import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'
import CommonRightIcon from '../../Components/CommonRightIcon'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import { updateCartCount } from '../../Storage/action'
import { useDimensionContext } from '../../context'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'

const Wishlist = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const userId = useSelector(state => state.userId)
  const cartCount = useSelector(state => state.cartCount)
  const dispatch = useDispatch()
  const [wishlisted, setWishListed] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) getWishlist()
  }, [isFocused])

  // Api call for wishlist
  const getWishlist = async () => {
    const snapshot = await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
    if (!snapshot.empty) {
      const res = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc?.data() }));
      setWishListed(res);
    } else {
      setWishListed([])
    }
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <CommonRightIcon type={'cart'} />
        )
      },
      headerLeft: () => {
        return (
          <CommonLeftIcon />
        )
      },
    })
  }, [])

  // addToCart
  const addToCart = async item => {
    try {
      const snapshot = await firestore()
        .collection('Cart')
        .where('userId', '==', userId)
        .where('productId', '==', item.productId)
        .get();

      if (snapshot.empty) {
        await firestore()
          .collection('Cart')
          .add({
            created: Date.now(),
            desc: item.desc,
            name: item.productName,
            price: item.price,
            quantity: 1,
            userId: userId,
            productId: item.id,
            image: item.image,
          })
        dispatch(updateCartCount(cartCount + 1))
        Snackbar.show({
          text: 'Your product is add to Cart...',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.primary_green,
          textColor: colors.white,
          fontFamily: 'Lato-Italic'
        })
      } else {
        const docId = snapshot.docs[0].id;
        const currentQuantity = snapshot.docs[0].data().quantity || 0;
        await firestore().collection('Cart').doc(docId).update({
          quantity: currentQuantity + 1,
        });
        Snackbar.show({
          text: 'Your product is add to Cart...',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.primary_green,
          textColor: colors.white,
          fontFamily: 'Lato-Italic'
        })
      }
    } catch (error) { console.log("ERROR", error) }
    // try {
    //   await firestore()
    //     .collection('Cart')
    //     .where('productId', '==', item.productId)
    //     .where('userId', '==', userId)
    //     .get()
    //     .then(snapshot => {
    //       if (snapshot.empty) {
    //         firestore()
    //           .collection('Cart')
    //           .add({
    //             created: '"' + Date.now() + '"',
    //             desc: item.description,
    //             name: item.name,
    //             price: item.price,
    //             productId: item.productId,
    //             quantity: 1,
    //             userId: userId,
    //             image: item.image,
    //           })
    //           .then(resp => {
    //             console.warn("Hai", resp);
    //             if(resp){
    //               dispatch(updateCartCount({ cartCount: cartCount + 1 }));
    //             }
    //             // Snackbar.show({
    //             //   text: 'Item added to cart!',
    //             //   duration: Snackbar.LENGTH_LONG,
    //             //   backgroundColor: colors.primaryGreen,
    //             //   textColor: colors.white,
    //             // });
    //           });
    //       } else {
    //         firestore()
    //           .collection('Cart')
    //           .doc(snapshot?.docs[0].id)
    //           .update({
    //             quantity: parseInt(snapshot?.docs[0].data().quantity) + 1,
    //             // price:
    //             //   parseFloat(snapshot?.docs[0].data().price) +
    //             //   parseFloat(item.price),
    //           })
    //           .then(() => {
    //             Snackbar.show({
    //               text: 'Item added to cart!',
    //               duration: Snackbar.LENGTH_LONG,
    //               backgroundColor: colors.primaryGreen,
    //               textColor: colors.white,
    //             });
    //           });
    //       }
    //     });
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  }

  // handleRemoveWishlist
  const handleRemoveWishlist = async product => {
    try {
      await firestore().collection('Wishlist').doc(product.id).delete()
      const updateWishlist = wishlisted.filter(doc => doc.id !== product.id)
      setWishListed(updateWishlist)
    } catch (error) { console.log(error) }
  }

  // handleGotoHome
  const handleGotoHome = () => navigation.goBack()

  return (
    <View style={styles.container}>
      <ScrollView>
        {wishlisted.length > 0 ? wishlisted.map((item, index) => {
          return (
            <View key={index} style={styles.contentContainer} >
              <Image source={{ uri: item.image }} style={styles.contentImage} />
              <View style={styles.innerContent}>
                <Text style={styles.head} numberOfLines={2}>{item.productName}</Text>
                <Text numberOfLines={2} style={styles.desc}>{item.desc}</Text>

                <View style={styles.subView}>
                  <Text style={styles.price}>₹ {item.price}</Text>
                  <TouchableOpacity onPress={() => addToCart(item)}>
                    <Text style={styles.addCart}>add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveWishlist(item)} style={styles.deleteView}>
                <Image source={require('../../asset/img/delete-white.png')} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          )
        }) :
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>Wishlist is Empty..</Text>
            <TouchableOpacity onPress={handleGotoHome}>
              <Text style={styles.gotoHome}> Go to Home </Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    </View >
  )
}

export default Wishlist