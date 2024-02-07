import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDimensionContext } from '../../context'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartCount } from '../../Storage/action'
import { style } from './style'

const CustomeFooter = ({ state, discriptor, navigation }) => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const cartCount = useSelector(state => state.cartCount)
  const userId = useSelector(state => state.userId)
  const dispatch = useDispatch()

  useEffect(() => {
    getCartProducts()
  }, [])

  // Api Calls for Product List
  const getCartProducts = async () => {
    try {
      await firestore().collection('Cart').where('userId', '==', userId).get()
        .then(snapshot => {
          dispatch(updateCartCount(snapshot.size))
        })
    } catch (error) {
      console.log("Error : ", error);
    }
  }
  return (
    <View style={[styles.container]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const icon =
          route.name === 'Home' ? require('../../asset/img/home_icon.png') :
            route.name === 'Category' ? require('../../asset/img/category_icon.png') :
              route.name === 'Search' ? require('../../asset/img/search_icon.png') :
                route.name === 'Offers' ? require('../../asset/img/offers_icon.png') :
                  require('../../asset/img/cart_icon.png')
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.name)}
            key={index}
            style={[styles.items, {
              paddingTop: isFocused ? 15 : 0,
            }]}
          >
            {route.name === 'Cart' ?
              <View style={[styles.notify, {
                top: isFocused ? 5 : -5,
              }]}>
                <Text style={styles.notifyText}>{ cartCount }</Text>
              </View>
              : null}
            <Image source={icon} style={[styles.icon, { opacity: isFocused ? 1 : .5 }]} />
            <Text style={[styles.iconText, { opacity: isFocused ? 1 : .5 }]}>{route.name}</Text>
            {isFocused ? <Text>.</Text> : null}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomeFooter