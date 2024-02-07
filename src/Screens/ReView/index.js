import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../context'
import ActionSheet from "react-native-actions-sheet";
import StarRating from 'react-native-star-rating-widget';
import CustomTextInput from '../../Components/TextInput'
import CommonLeftIcon from '../../Components/CommonLeftIcon'
import CommonRightIcon from '../../Components/CommonRightIcon'
import CustomButton from '../../Components/CustomButton'
import { colors } from '../../Components/Common/Colors'
import { style } from './style'

const Reviews = () => {
    const dimensions = useDimensionContext()
    const navigation = useNavigation()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const [rating, setRating] = useState(0)

    const actionSheetRef = useRef(null)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CommonLeftIcon type={'back'} />,
            headerRight: () => <CommonRightIcon plus={true} handlePlus={handleRviewBox} />,
        })
    }, [])
    const handleRviewBox = () => {
        actionSheetRef.current.show()
    }

    // handleReviewSubmit
    const handleReviewSubmit=()=>{console.warn("Submitted")}
    return (
        <View style={styles.container}>
            <View style={styles.reviewBox}>
                <View style={styles.clientView}>
                    <Image source={require('../../asset/img/profile-pic.png')} style={styles.image} />
                    <View>
                        <Text style={styles.name} >Surendhran</Text>
                        {/* Rating */}
                        <StarRating
                            rating={rating}
                            starSize={20}
                            color={colors.primary_green}
                            enableHalfStar={false}
                            onChange={value => setRating(value)}
                        />
                    </View>
                </View>
                <Text style={styles.review}>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero
                </Text>
                <ActionSheet ref={actionSheetRef}>
                    <View style={{
                        padding: 15,
                    }}>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 20,
                            marginVertical: 15,
                        }}>Review here....</Text>
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <StarRating
                                rating={rating}
                                starSize={40}
                                color={colors.primary_green}
                                enableHalfStar={false}
                                onChange={value => setRating(value)}
                            />
                        </View>
                        <CustomTextInput placeholder={'Write reviews here..'} multiline={true} />
                        <CustomButton buttonText={'Submit Review'} type={'primary'} onPress={handleReviewSubmit} />
                    </View>
                </ActionSheet>
            </View>
        </View>
    )
}

export default Reviews