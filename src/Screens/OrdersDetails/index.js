import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CustomButton from '../../Components/CustomButton'
import { useSelector } from 'react-redux'
import { useDimensionContext } from '../../context'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'

const OrdersDetails = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const userId = useSelector(state => state.userId)
    const route = useRoute()
    const { item } = route.params
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CommonLeftIcon type={'back'} action={() => {
                navigation.navigate('Orders')
            }} />,
            title: 'Orders Summery'
        })
    }, [])

    //handleReOrder 
    const handleReOrder = async () => {
        try {
            setLoading(true)
            const smallId = Math.random()
            await firestore().collection('Orders').add({
                orderId: String(smallId).slice(4, 12).toUpperCase(),
                created: Date.now(),
                updated: Date.now(),
                orderStatus: 'Ordered',
                totalAmout: item.totalAmout,
                address: item.address,
                userId: userId,
                paymentMethod: 'Online',
                cartItems: item.cartItems,
                userName: item.userName,
                userEmail: item.userEmail,
                userContact: item.userContact,
                expDelDate: ''
            }).then(res => {
                if (res) {
                    setTimeout(() => {
                        Snackbar.show({
                            text: `your Order is succefully Placed..`,
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: colors.primary_green,
                            textColor: colors.white,
                            fontFamily: 'Lato-Italic',
                        })
                        setLoading(false)
                    }, 1000);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            {/* Model */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>
                <View style={styles.centeredView}>
                    <ActivityIndicator size={'large'} color={colors.primary_green} />
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Order Status */}
                <View style={styles.orderBox}>
                    <Entypo name='box' size={50} color={colors.white} />
                    <View style={styles.orderIdView}>
                        <Text style={styles.headText} numberOfLines={2}>OrderID : {(item.id).toUpperCase()}</Text>
                        <Text style={styles.headBold}>{item.orderStatus}</Text>
                    </View>
                </View>

                {/* Item Details */}
                <View>
                    <Text style={styles.items}>Items :</Text>
                    {item.cartItems.map((data, index) => {
                        return (
                            <View key={index} style={styles.cartItemView}>
                                <View style={styles.cartQntView}>
                                    <Text style={styles.cartQnt}>{data.quantity}</Text>
                                </View>
                                <Octicons name={'north-star'} size={18} color={colors.black_level_2} />
                                <View>
                                    <Text style={styles.cartHead}>{data.name}</Text>
                                    <Text style={styles.cartBody} numberOfLines={2}>{data.desc}</Text>
                                </View>
                                <View style={styles.priceView}>
                                    <Text style={styles.cartHead}>₹ {data.price}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                {/* Payment Details */}
                <View>
                    <Text style={styles.items}>Payment Details :</Text>
                    <View style={styles.payDetails}>
                        <View>
                            <Text style={styles.payBody}>Bag Total</Text>
                            <Text style={styles.payBody}>Coupon Discount</Text>
                            <Text style={styles.payBody}>Delivery</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={[styles.payBody, { alignSelf: 'flex-end' }]}>₹ 0.00</Text>
                            <Text style={styles.coupon}>Applay Coupon</Text>
                            <Text style={[styles.payBody, { alignSelf: 'flex-end' }]}>₹ 50.00</Text>
                        </View>
                    </View>
                    <View style={styles.totalAmout}>
                        <Text style={styles.cartHead}>Total Amout</Text>
                        <Text style={styles.cartHead}>₹ {item.totalAmout}</Text>
                    </View>
                </View>

                {/* Address Details */}
                <View>
                    <Text style={styles.items}>Address : </Text>
                    <Text style={styles.cartBody} numberOfLines={2}>{item.address}</Text>
                </View>

                {/* Payment Method */}
                <View>
                    <Text style={styles.items}>Payment Method</Text>
                    <View style={styles.methodView}>
                        <MaterialIcons name='payment' color={colors.black} size={50} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.cartBody}>******789</Text>
                            <Text style={styles.cartBody}>{item.paymentMethod}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerView}>
                <CustomButton type={'primary'} buttonText={"Reorder"} onPress={handleReOrder} />
            </View>
        </View>
    )
}

export default OrdersDetails