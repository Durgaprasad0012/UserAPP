import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { colors } from '../../../Components/Common/Colors';
import { useDimensionContext } from '../../../context'
import { style } from './style'

const ProductReview = (props) => {
    const {product}=props
    const dimensions = useDimensionContext()
    const navigation = useNavigation()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)

    const [rating, setRating] = useState(0)
    const handleReview=()=>{
        navigation.navigate('Reviews', {product:product})
    }
    return (
        <View>
            <View style={styles.reviewView}>
                <Text style={styles.reviewHead}>Product Reviews  (1)</Text>
                <TouchableOpacity onPress={handleReview}>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.reviewBox}>
                <View style={styles.clientView}>
                    <Image source={require('../../../asset/img/profile-pic.png')} style={styles.image} />
                    <View>
                        <Text style={styles.name} >Surendhran</Text>
                        {/* Rating */}
                        <StarRating
                            rating={rating}
                            starSize={20}
                            color={colors.primary_green}
                            enableHalfStar={false}
                            onChange={()=>{}}
                        />
                    </View>
                </View>
                <Text style={styles.review}>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero
                </Text>
            </View>
        </View>
    )
}

export default ProductReview