import React from 'react'
import { Alert, Image, Share, Text, TouchableOpacity, View } from 'react-native'
import { useDimensionContext } from '../../context'
import { useNavigation } from '@react-navigation/native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../Common/Colors'
import { style } from './style'
import { useSelector } from 'react-redux';

const CommonRightIcon = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const cartCount = useSelector(state=>state.cartCount)
    // handleChange
    const handleChange = () => navigation.navigate('Cart')
    const handleShare = async () => {
        const result = await Share.share({
            message:
                'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    }

    return (
        <View style={styles.iconView}>
            {props.share ?
                <TouchableOpacity
                    onPress={handleShare}
                    style={styles.touchView}
                >

                    <EvilIcons name="share-google" size={40} color={colors.black} />
                </TouchableOpacity>

                : null}
            {props.plus ?
                <TouchableOpacity
                    onPress={props.handlePlus}
                    style={styles.touchView}
                >

                    <EvilIcons name="plus" size={38} color={colors.black} />
                </TouchableOpacity>

                : null}
            {props.type === 'cart' ?
                <TouchableOpacity
                    onPress={handleChange}
                    style={styles.touchView}
                >
                    <Text style={styles.count}> {cartCount} </Text>
                    <Image source={require('../../asset/img/cart.png')} style={styles.touchIcon} />
                </TouchableOpacity>
                : null}
        </View>
    )
}

export default CommonRightIcon