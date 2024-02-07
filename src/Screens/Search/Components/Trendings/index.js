import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useDimensionContext } from '../../../../context'
import { colors } from '../../../../Components/Common/Colors'
import { style } from './style'
import { updateCatId } from '../../../../Storage/action'

const Trendings = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateCatId(''))
    }, [])


    // handleTouch
    const handleTouch = item => {
        dispatch(updateCatId(item?.id ?? ""))
    }
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Trendings...</Text>
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.TrendStyle}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => {
                    const categoryColor =
                        index % 4 === 0 ? colors.gray :
                            index % 4 === 1 ? colors.warning :
                                index % 4 === 2 ? colors.primary :
                                    colors.silver
                    return (
                        <TouchableOpacity
                            onPress={() => handleTouch(item)}
                            style={[styles.touch, { backgroundColor: categoryColor }]}
                        >
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Trendings