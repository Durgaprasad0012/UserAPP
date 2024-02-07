import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { updateCatId } from '../../Storage/action'
import { useDimensionContext } from '../../context'
import CommonHeader from '../../Components/CommonHeader'
import CommonSearchBox from '../../Components/CommonSearchBox'
import BannerContent from './Components/Banner'
import RecentBought from './Components/RecentBought'
import ShopCategory from './Components/ShopCategory'
import ProductScroll from '../../Components/ProductScroll'
import OfferProducts from '../../Components/OfferProducts'
import { style } from './style'

const Home = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const scrollRef = useRef(null)
  const isFouced = useIsFocused()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isFouced) {
      scrollRef.current.scrollTo({ y: 0, animated: true })
    }
  }, [isFouced])

  useEffect(() => {
    dispatch(updateCatId(''))
  }, [])
  

  return (
    <View>
      <CommonHeader />
      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <CommonSearchBox />
        <BannerContent />
        <RecentBought />
        <ShopCategory />
        <ProductScroll />
        <OfferProducts />

        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't find what you are looking for..?</Text>
        </View>
        <View style={styles.footerBtnView}>
          <Text style={styles.footerBtnText}>Browser Category</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home