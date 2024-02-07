import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { useDimensionContext } from '../../context'
import CommonSearchBox from '../../Components/CommonSearchBox'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'

const Categories = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const [product, setProduct] = useState([])
  const [active, setActive] = useState(0)
  const categories = useSelector(state => state.categories)
  const navigation = useNavigation()
  const route = useRoute()
  const { catIndex = 0 } = route?.params ?? {}

  useEffect(() => {

    if (catIndex) {
      setActive(catIndex)
    }
  }, [catIndex])


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <CommonLeftIcon />
        )
      }
    })
    getProducts()
  }, [])

  // Product Api Calls
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


  const handleTouchChange = async (item, index) => {
    setActive(index)
    const snapshot = await firestore()
      .collection('Products')
      .where('categoryID', '==', item.id)
      .get()

    if (!snapshot.empty) {
      const res = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc?.data() }));
      setProduct(res)
    }else{
      setProduct([])
    }
  }

  const handleProductView = item => {
    navigation.navigate('ProductDetails', { product: item })
  }
  return (
    <View style={styles.main}>
      <CommonSearchBox />

      <View style={styles.contentView}>
        {/* Sidebar */}
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          >
            {categories.length > 0 ? categories.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.touch, { backgroundColor: index === active ? colors.white : 'transparent' }]}
                  onPress={() => handleTouchChange(item, index)}
                >
                  {item.image ?
                    <Image source={{ uri: item.image }} style={styles.image} />
                    : null}
                </TouchableOpacity>
              )
            }) : null}
          </ScrollView>
        </View>
        <View style={styles.prodctList}>
          <View>
            <ImageBackground
              source={require('../../asset/img/bg.jpg')}
              style={styles.bgImage}
              blurRadius={2}
            >
              <Text style={styles.headText} numberOfLines={1}>
                {categories[active]?.name}
              </Text>
              <Text style={styles.descText} numberOfLines={3}>
                {categories[active]?.desc}
              </Text>
            </ImageBackground>
          </View>
          <ScrollView
            contentContainerStyle={styles.productView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {product.length>0?product.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => handleProductView(item)} style={styles.proTouch}>
                    {item.image ?
                      <Image source={{ uri: item.image }} style={styles.proImage} />
                      : null}
                    <Text style={styles.proTextHead}>{item.name}</Text>
                    <Text style={[styles.proTextDesc, {color:colors.black_level_2, lineHeight:20}]}>₹ {item.price}</Text>
                  </TouchableOpacity>
                </View>
              )
            }):
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No Items left...</Text>
            </View>
            }
          </ScrollView>
        </View>

      </View>
    </View>
  )
}

export default Categories