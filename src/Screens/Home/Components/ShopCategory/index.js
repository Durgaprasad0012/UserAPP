import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../../../context'
import { categories } from '../../../../Storage/action'
import { colors } from '../../../../Components/Common/Colors'
import { style } from './style'

const ShopCategory = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [category, setCategory] = useState([])

    useEffect(() => {
        getCategoies()
    }, [])


    // Api Calls
    const getCategoies = async () => {
        try {
            const snapshot = await firestore().collection('Categories').get();

            if (!snapshot.empty) {
                const res = snapshot.docs
                    .filter(doc => doc.exists)
                    .map(doc => ({id:doc.id,...doc?.data()}));
                setCategory(res)
                dispatch(categories(res))
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }
    const handleCategory = index => {
        navigation.navigate('Categories', { catIndex: index })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Shop by Category</Text>
            <View style={styles.listLayout}>
                {category.map((item, index) => {
                    const categoryColor =
                        index % 4 === 0 ? colors.gray :
                            index % 4 === 1 ? colors.warning :
                                index % 4 === 2 ? colors.primary :
                                    colors.silver
                    return (
                        <TouchableOpacity key={index} onPress={() => handleCategory(index)} style={styles.innerView}>
                            <View style={[styles.imageView, { backgroundColor: categoryColor }]}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                            </View>
                            <Text style={styles.content}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default ShopCategory