import { View, Text, FlatList, TouchableOpacity, Image, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CommonRightIcon from '../../Components/CommonRightIcon'
import CommonSearchBox from '../../Components/CommonSearchBox'
import { useDimensionContext } from '../../context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { style } from './style'
import CommonEmty from '../../Components/CommonEmty'

const Shop = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const route = useRoute()
  const { type } = route.params
  const [selectedCat, setselectedCat] = useState(type)
  const categories = useSelector(state => state.categories)
  const [product, setProduct] = useState([])
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonLeftIcon type={'back'} />,
      headerRight: () => <CommonRightIcon type={"cart"} />,
      title: selectedCat === 'all' ? 'Shop' : selectedCat
    })
  }, [selectedCat])
 
  // handleSelectItem
  const handleSelectItem = async item => {
    setselectedCat(item.name)
    try {
      const snapshot = await firestore().collection('Products').where('categoryID', "==", item.id).get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => doc.data());
        setProduct(res.length > 0 ? res : [])
      } else {
        setProduct([])
      }

    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Api Calls
  const getProducts = async () => {
    try {
      const snapshot = await firestore().collection('Products').get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => ({ id: doc.id, ...doc?.data() }));
        setProduct(res)
      }

    } catch (error) {
      console.log("Error : ", error);
    }
  }
  // handleCategories
  const handleCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => handleSelectItem(item)}
      >
        <Text style={styles.item}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  const handleProductView = item => {
    navigation.navigate('ProductDetails', { product: item })
  }

  // handleRenderItems
  const handleRenderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleProductView(item)}
        style={styles.commonPadding}
      >
        <View style={styles.productView}>
          <View>
            <Image source={{ uri: item.image }} style={styles.productImage} />
          </View>
          <View style={styles.contentView}>
            <Text style={styles.nameText} numberOfLines={1} >{item.name}</Text>
            <Text style={styles.contentText} numberOfLines={2} >{item.desc}</Text>
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>₹ {item.price} /-</Text>
              <View style={styles.qncView}>
                <Text style={styles.qncText1}>+</Text>
                <Text style={styles.qncText2}>0</Text>
                <Text style={styles.qncText1}>-</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        style={styles.categories}
        contentContainerStyle={styles.contentStyle}
        renderItem={handleCategories}
      />

      <CommonSearchBox filter={true} />

      <FlatList
        data={product}
        keyExtractor={(item, index) => String(index)}
        renderItem={handleRenderItems}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <CommonEmty title='Products to be unavailable...' />}
      />
    </View>
  )
}

export default Shop