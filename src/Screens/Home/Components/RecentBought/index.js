import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { useDimensionContext } from '../../../../context'
import { style } from './style'

const RecentBought = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const [recentItems, setrRecentItems] = useState([])

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
                setrRecentItems(res)
            }

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    const handleProducts = item => {
        navigation.navigate('ProductDetails', { product: item })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Recently Boughts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentItems.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => handleProducts(item)} style={styles.itemView}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
           
        </View>
    )
}

export default RecentBought