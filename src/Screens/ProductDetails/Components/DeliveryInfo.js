import { View, Text } from 'react-native'
import React from 'react'
import { style } from './style'
import { useDimensionContext } from '../../../context'
import CustomTextInput from '../../../Components/TextInput'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../../Components/Common/Colors'

const DeliveryInfo = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    return (
        <View style={styles.deliveryView}>
            <View style={{ flexDirection: 'row', alignItems:'flex-start' }}>
                <Text style={styles.checkDelivery}>Check Delivery</Text>
                <AntDesign name='down' size={18} color={colors.black} />
            </View>
            <Text style={styles.checkInfo}>Enter pincode to check Delivery date/pickup option..</Text>
            <CustomTextInput
                type={'defualt'}
                handleText={() => console.log("hai")}
                placeholder={"Pincode"}
                check={true}
            />
            <Text style={styles.checkInfo}>Free Delivery on orders above 200.00</Text>
            <Text style={styles.checkInfo}>Cash on Delivery available</Text>
            <Text style={styles.checkInfo}>Essay 21 days return and exchanges.</Text>
        </View>
    )
}

export default DeliveryInfo