import { View, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDimensionContext } from '../../../../context'
import firestore from '@react-native-firebase/firestore'
import { style } from './style'

const BannerContent = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)

    const [bannerItems, setBannerItems] = useState([])

    useEffect(() => {
        getBanners()
    }, [])

    // Api Call
    const getBanners = async () => {
        try {
            const snapshot = await firestore().collection('Banners').get();

            if (!snapshot.empty) {
                const res = snapshot.docs
                    .filter(doc => doc.exists)
                    .map(doc => doc.data());

                setBannerItems(res);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bannerItems.map((item, index) => {
                    return (
                        <View key={index} style={styles.bannerView}>
                            <ImageBackground source={{ uri: item.image }} blurRadius={1.9} style={styles.Image} >
                                <Text style={styles.bannerHead}>{item.head}</Text>
                                <Text style={styles.bannerContent}>{item.desc}</Text>
                                <TouchableOpacity style={styles.bannerTouch}>
                                    <Text style={styles.touchText}>Shop Now</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default BannerContent