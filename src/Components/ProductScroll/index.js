import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import CommonSectionHeader from '../CommonSectionHeader'
import { useDimensionContext } from '../../context'
import { updateCartCount } from '../../Storage/action'
import { colors } from '../Common/Colors'
import { style } from './style'

const ProductScroll = props => {
    const { isNavigationNeeded } = props
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const route = useRoute()

    const userId = useSelector(state => state.userId)
    const cartCount = useSelector(state => state.cartCount)
    const dispatch = useDispatch()

    const [product, setProduct] = useState([])
    const [wishlisted, setWishListed] = useState([])
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            getWishlist()
        }, [wishlisted])
    )


    // Api call for wishlist
    const getWishlist = async () => {
        const snapshot = await firestore().collection('Wishlist').get()
        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => (doc?.data()));
            setWishListed(res);
        } else {
            setWishListed([])
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    // Api Calls for Product List
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



    // Product Navigation
    const handleProductView = item => {
        if (route.name === 'ProductDetails') {
            isNavigationNeeded(true, item)
        } else {
            navigation.navigate('ProductDetails', { product: item })
        }
    }


    // handleWishList added
    const handleWishList = async (productItem) => {
        try {
            setLoading(true)
            const snapshot = await firestore()
                .collection('Wishlist')
                .where('userId', '==', userId)
                .where('productId', '==', productItem.id)
                .get()

            if (snapshot.empty) {
                await firestore()
                    .collection('Wishlist')
                    .add({
                        userId: userId,
                        productId: productItem.id,
                        productName: productItem.name,
                        image: productItem.image,
                        price: productItem.price,
                        desc: productItem.desc,
                        created: Date.now(),
                        updated: Date.now(),
                    });
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } else {
                const docId = snapshot.docs[0].id;
                firestore().collection('Wishlist').doc(docId).delete()
                setWishListed([])
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        } catch (error) {
            console.log("ERROR : ", error);
        }
    };
    // Add to cart
    const addToCart = async item => {
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
                    })
                dispatch(updateCartCount(cartCount + 1))

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
        <View style={styles.container}>
            <CommonSectionHeader
                headText={'Newly Added'}
                contentText={'Pay less, Get more'}
                rightText={'See all'}
            />
            {/* Model */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={'large'} color={colors.primary_green} />
                </View>
            </Modal>

            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {product.map((item, index) => {
                        // wished items
                        const wish = wishlisted.some(doc => doc.productId === item.id)
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.productView}
                                onPress={() => handleProductView(item)}
                            >
                                <View>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleWishList(item)}
                                    >
                                        {wish ?
                                            <Image source={require('../../asset/img/whishRed.png')} style={styles.headImage} />
                                            :
                                            <Image source={require('../../asset/img/wishlist.png')} style={styles.headImage} />
                                        }
                                    </TouchableOpacity>

                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                </View>
                                <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.contentText} numberOfLines={2}>{item.desc}</Text>
                                <View style={styles.footerBox}>
                                    <Text style={styles.priceText}>{item.price} /-</Text>
                                    <TouchableOpacity onPress={() => addToCart(item)} style={styles.addBox}>
                                        <Text style={styles.addText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export default ProductScroll