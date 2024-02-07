import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../context'
import { useDispatch, useSelector } from 'react-redux'
import CommonSectionHeader from '../CommonSectionHeader'
import { style } from './style'
import { RefreshControl } from 'react-native'

const OfferProducts = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)

    const [product, setProduct] = useState([])
    const catId = useSelector(state => state.catId)
    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()
    const isFouced = useIsFocused()

    useEffect(() => {
        getTouchedProducts()
    }, [catId])

    useEffect(() => {
        if (isFouced) getProducts()
    }, [isFouced])

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            dispatch(updateCatId(""))
            setRefreshing(false)
        }, 1000);
    }

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

    const getTouchedProducts = async () => {
        try {
            const snapshot = await firestore().collection('Products').where('categoryID', '==', catId).get()
            if (!snapshot.empty) {
                const res = snapshot.docs
                    .filter(doc => doc.exists)
                    .map(doc => ({ id: doc.id, ...doc?.data() }));
                setProduct(res)
            } else {
                setProduct([])
            }

        } catch (error) {
            console.log("Error : ", error);
        }
    }
    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['blue', 'green', 'red']}
                />
            }
        >
            <CommonSectionHeader
                headText={'Say hello to Offers'}
                contentText={'Best price ever for all the time..'}
                rightText={'See all'}
            />
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {product.length > 0 ? product.map((item, index) => <RenderItem key={index} item={item} index={index} />)
                        :
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyText}>No Items left...</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        </ScrollView>
    )
}
// RenderItem
const RenderItem = ({ item, index }) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const [qunt, setQunt] = useState(0)

    const userId = useSelector(state => state.userId)
    // handleProducts
    const handleProducts = () => {
        navigation.navigate('ProductDetails', { product: item })
    }

    // Add to cart
    const addToCart = async () => {
        try {
            const snapshot = await firestore()
                .collection('Cart')
                .where('userId', '==', userId)
                .where('productId', '==', item.id)
                .get();

            if (snapshot.empty) {
                await firestore()
                    .collection('Cart')
                    .add({
                        created: Date.now(),
                        desc: item.desc,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        userId: userId,
                        productId: item.id,
                        image: item.image,
                    });
            } else {
                const docId = snapshot.docs[0].id;
                const currentQuantity = snapshot.docs[0].data().quantity || 0;
                await firestore().collection('Cart').doc(docId).update({
                    quantity: currentQuantity + 1,
                });

            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }
    return (
        <TouchableOpacity key={index} onPress={handleProducts} style={styles.productView}>
            <View>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
            <View style={styles.contentView}>
                <Text style={styles.nameText} numberOfLines={1} >{item.name}</Text>
                <Text style={styles.contentText} numberOfLines={2} >{item.desc}</Text>
                <View style={styles.footerBox}>
                    <Text style={styles.priceText}>₹ {item.price} /-</Text>
                    <View style={styles.offView}>
                        <Text style={styles.offText}>10%</Text>
                    </View>
                    <View style={styles.qncView}>
                        <TouchableOpacity onPress={() => {
                            setQunt(qunt <= 0 ? qunt : qunt - 1)

                        }}>
                            <Text style={styles.qncText1}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qncText2}>{qunt}</Text>
                        <TouchableOpacity onPress={() => {
                            setQunt(qunt + 1),
                                addToCart()
                        }}>
                            <Text style={styles.qncText1}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OfferProducts