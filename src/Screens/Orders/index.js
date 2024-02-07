import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { useDimensionContext } from '../../context'
import CommonSearchBox from '../../Components/CommonSearchBox'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'
import CommonRightIcon from '../../Components/CommonRightIcon'

const Orders = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const userId = useSelector(state => state.userId)
  const [ordersList, setOrdersList] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) getOrderslist()
  }, [isFocused])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <CommonLeftIcon />
        )
      },
      headerRight: () => <CommonRightIcon type={'cart'} />
    })
  }, [])

  const getOrderslist = async () => {
    try {
      const snapshot = await firestore().collection('Orders').where("userId", '==', userId).get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => ({ id: doc.id, ...doc?.data() }));
        setOrdersList(res)
      } else {
        setOrdersList([])
      }
    } catch (error) {

    }
  }

  // handleViewOrders
  const handleViewOrders = ordersList => {
    navigation.navigate('OrdersDetails', { item: ordersList })
  }

  // handleSearch
  const handleSearch = async text => {
    try {
      const snapshot = await firestore()
        .collection('Orders')
        .where('userId', '==', userId)
        .orderBy('orderId')
        .startAt(String(text))
        .endAt(String(text) + '\uf8ff')
        .get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => ({ id: doc.id, ...doc?.data() }));
        setOrdersList(res)
      } else {
        setOrdersList([])
      }
    } catch (error) {
      console.log("ERROR :", error);
    }
  }
  return (
    <View style={styles.main}>
      <CommonSearchBox
        filter={true}
        mic={false}
        placeholder={'Search by Order ID..'}
        onChangeText={handleSearch}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {ordersList.length > 0 ? ordersList.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.ordersView} onPress={() => handleViewOrders(item)} >
              <View style={styles.details}>
                <View style={styles.detailsBox}>
                  <Text style={[styles.title, { color: colors.black_level_1 }]}>ID : #{item.orderId}</Text>
                  <Text style={[styles.highLights, { color: colors.black_level_2 }]}>
                    Ordered on :
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>{item.created}</Text>
                  </Text>
                  <Text style={styles.addText}>{item.address}</Text>
                  <Text>
                    paid :
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>
                      ₹ {item.totalAmout}
                    </Text>,
                    Items:
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>
                      {item.cartItems.length}
                    </Text>
                  </Text>
                </View>
                <Image source={require('../../asset/img/map.webp')} style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }} />
              </View>
              <View style={styles.footerView}>
                <Text style={[styles.title, { color: colors.black_level_2 }]}>Order Shipped</Text>
                <Text style={[styles.title, { color: colors.black_level_2 }]}>Rate & Reviews</Text>
              </View>
            </TouchableOpacity>
          )
        })
          :
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No Items left...</Text>
          </View>
        }
      </ScrollView>
    </View>
  )
}

export default Orders