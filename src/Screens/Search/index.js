import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { useDimensionContext } from '../../context'
import Trendings from './Components/Trendings'
import CommonSearchBox from '../../Components/CommonSearchBox'
import OfferProducts from '../../Components/OfferProducts'
import { useNavigation } from '@react-navigation/native'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import { style } from './style'
import { updateCatId } from '../../Storage/action'

const Search = () => {
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
        <Trendings />
        <OfferProducts />
      </ScrollView>
    </View>
  )
}

export default Search