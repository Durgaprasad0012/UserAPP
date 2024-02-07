import React from 'react'
import { style } from './style'
import { Text, View } from 'react-native'
import { useDimensionContext } from '../../../../context'
import { colors } from '../../../../Components/Common/Colors'

export const OrderTotal = (props) => {
    const {total, charges} =props
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    return (
        <View>
            <Text style={styles.headText}>OrderTotal</Text>
            <View style={styles.conatiner}>
                <View>
                    <Text style={styles.detailHead}>Bag Total</Text>
                    <Text style={styles.detailHead}>Bag Savings</Text>
                    <Text style={styles.detailHead}>Coupon Discount</Text>
                    <Text style={styles.detailHead}>Devlivery</Text>
                </View>
                <View>
                    <Text style={styles.detailText}> ₹ {parseFloat(total).toFixed(2)}</Text>
                    <Text style={[styles.detailText, {color:colors.primary_green}]}> ₹ 0.00</Text>
                    <Text style={[styles.detailText, {color:colors.danger}]}>Apply Coupon</Text>
                    <Text style={styles.detailText}> ₹ {parseFloat(charges).toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.orderEnd}>
                <Text style={{
                    fontFamily:'Lato-Bold',
                    fontSize:20,
                    color:colors.black_level_2
                }}>Order Details</Text>
                <Text style={{
                    fontFamily:'Lato-Regular',
                    fontSize:20,
                    color:colors.black_level_2
                }}>₹ {parseFloat(total+charges).toFixed(2)}</Text>
            </View>
        </View>
    )
}