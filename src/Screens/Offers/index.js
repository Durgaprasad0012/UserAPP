import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { style } from './style'
import { useDimensionContext } from '../../context'
import CommonSearchBox from '../../Components/CommonSearchBox'
import Coupons from './Components/Coupon'
import { useNavigation } from '@react-navigation/native'
import CommonLeftIcon from '../../Components/CommonLeftIcon'

const Offers = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <CommonLeftIcon />
        )
      }
    })
  }, [])
  return (
    <View style={styles.main}>
      <CommonSearchBox />
      <ScrollView
        contentContainerStyle={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <Coupons />
      </ScrollView>
    </View>
  )
}

export default Offers