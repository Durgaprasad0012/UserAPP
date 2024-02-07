import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import StarRating from 'react-native-star-rating-widget';
import firestore from '@react-native-firebase/firestore'

import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CommonRightIcon from '../../Components/CommonRightIcon'
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MoreInfo from './Components/MoreInfo'
import ExtraInfo from './Components/ExtraInfo'
import ProductReview from './Components/ProductReview'
import DeliveryInfo from './Components/DeliveryInfo'
import ProductScroll from '../../Components/ProductScroll'
import { useDimensionContext } from '../../context'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../../Storage/action';
import Snackbar from 'react-native-snackbar';


const ProductDetails = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const route = useRoute()
  const navigation = useNavigation()
  const { product } = route.params
  const [rating, setRating] = useState(0)
  const [productDetails, setProductDetails] = useState({})
  const scrollRef = useRef(null)
  const userId = useSelector(state => state.userId)
  const cartCount = useSelector(state => state.cartCount)
  const dispatch = useDispatch()
  const [wishlisted, setWishListed] = useState([])
  const [qunt, setqunt] = useState(1)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonLeftIcon type={'back'} />,
      headerRight: () => <CommonRightIcon type={"cart"} share={true} />,
    })
  }, [])

  useEffect(() => {
    setProductDetails(product)
  }, [product])

  const navigationNeeded = (val, item) => {
    if (val) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
      setProductDetails(item)
    }
  }

  const handleQuntity = type => {
    setqunt(type === 'plus' ? qunt + 1 : type === 'minus' && qunt > 1 ? qunt - 1 : qunt);
  }

  // Check Wishlist
  useFocusEffect(
    useCallback(() => {
      getWishlist()
    }, [wishlisted])
  )

  // Api call for wishlist
  const getWishlist = async () => {
    const snapshot = await firestore().collection('Wishlist').get()
    if (!snapshot.empty) {
      const res = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => (doc?.data()));
      setWishListed(res);
    }
  }

  // handleWishList
  const handleWishList = async item => {
    const snapshot = await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
      .get()
    if (snapshot.empty) {
      await firestore()
        .collection('Wishlist')
        .add({
          userId: userId,
          productId: item.id,
          productName: item.name,
          image: item.image,
          price: item.price,
          desc: item.desc,
          created: Date.now(),
          updated: Date.now(),
        });
    } else {
      await firestore().collection('Wishlist').doc(snapshot.docs[0].id).delete();
    }
  }
  const wish = wishlisted.some(doc => doc.productId === productDetails?.id)

  const handleAddtoCart = async () => {
    try {
      const snapshot = await firestore()
        .collection('Cart')
        .where('userId', '==', userId)
        .where('productId', "==", productDetails.id)
        .get();

      if (snapshot.empty) {
        await firestore()
          .collection('Cart')
          .add({
            created: Date.now(),
            desc: productDetails.desc,
            name: productDetails.name,
            price: productDetails.price,
            quantity: qunt,
            userId: userId,
            productId: productDetails.id,
            image: productDetails.image,
          });
        dispatch(updateCartCount(cartCount + 1))
      } else {
        const docId = snapshot.docs[0].id;
        const currentQuantity = snapshot.docs[0].data().quantity || 0;
        await firestore().collection('Cart').doc(docId).update({
          quantity: currentQuantity + qunt,
        });

      }
      Snackbar.show({
        text: `${productDetails.name} is Add to Cart with the Quantity of ${qunt}...`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.warning,
        textColor: colors.white,
        fontFamily: 'Lato-Italic'
      })
    } catch (error) {
      console.log("ERROR", error);
    }
  }
  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef} style={styles.container}>
        <TouchableOpacity
          onPress={() => handleWishList(productDetails)}
        >
          {wish ?
            <Ionicons name='heart-sharp' size={30} color={colors.danger} style={styles.heart} />
            :
            <Ionicons name='heart-outline' size={30} color={colors.danger} style={styles.heart} />
          }
        </TouchableOpacity>
        {/* image */}
        <View style={styles.imageView}>
          {productDetails.image !== "" ?<Image source={{ uri: productDetails?.image }} style={styles.image} />: null}
        </View>
        {/* Details  */}
        <View style={styles.detailsView}>
          <Text style={styles.title}>{productDetails?.name}</Text>
          {/* Rating */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StarRating
              rating={rating}
              starSize={40}
              color={colors.primary_green}
              enableHalfStar={false}

              onChange={value => setRating(value)}
            />
          </View>
          <Text style={styles.price}>₹ {parseFloat(productDetails?.price).toFixed(2)}</Text>
          <MoreInfo data1={'500g/300g'} data2={'Delivery time'} />
          <View style={styles.productDetailsView}>
            <Text style={styles.productDetails}>Product Details</Text>
            <Text style={styles.desc}>{productDetails?.desc}</Text>
          </View>
          <ExtraInfo />
          <ProductReview product={product} />
          <DeliveryInfo />
          <ProductScroll isNavigationNeeded={navigationNeeded} />
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.qntView}>
          <TouchableOpacity onPress={() => handleQuntity('minus')}>
            <Feather name='minus-circle' color={colors.primary_green} size={20} />
          </TouchableOpacity>
          <Text style={styles.qntCount}>{qunt}</Text>
          <TouchableOpacity onPress={() => handleQuntity('plus')}>
            <Feather name='plus-circle' color={colors.primary_green} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddtoCart}>
          <Text style={styles.addtoCart}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ProductDetails