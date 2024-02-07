import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../../../context'
import { style } from './style'

const Coupons = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const [offers, setOffers] = useState([])
    const isFoucsed = useIsFocused()

    useEffect(() => {
        if (isFoucsed) getOffers()
    }, [isFoucsed])

    const getOffers = async () => {
        const snapshot = await firestore().collection('Offers').get()
        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => ({ id: doc.id, ...doc?.data() }));
            setOffers(res)
        }
    }

    return (
        <View style={styles.FlatList}>
            {offers.length > 0 ? offers.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={styles.main}
                    >
                        <ImageBackground source={require('../../../../asset/img/Coupon.png')} style={styles.coupon} >
                            <View style={styles.offView}>
                                <Text style={styles.offText}>{item.offer}</Text>
                                <View>
                                    <Text style={styles.offSideText}>%</Text>
                                    <Text style={styles.offSideText}>Off</Text>
                                </View>
                            </View>
                            <View style={styles.contentView}>
                                <Text numberOfLines={1} style={styles.headText}>{item.head}</Text>
                                <Text numberOfLines={2} style={styles.descText}>{item.desc}</Text>
                            </View>
                            <View style={styles.codeView}>
                                <Text style={styles.codeText}>Use Code</Text>
                                <TouchableOpacity style={styles.touchView}>
                                    <Text style={styles.touchText}>{item.code}</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )
            })
                :
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>No coupons here..</Text>
                    <Text style={styles.emptyGotoHome}
                        onPress={() => navigation.goBack()}
                    >Go to Home</Text>
                </View>
            }
        </View>
    )
}

export default Coupons