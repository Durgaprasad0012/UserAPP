import { View, Text, Image, TextInput, FlatList } from 'react-native'
import React from 'react'
import { style } from './style'
import { useDimensionContext } from '../../context'
import { colors } from '../Common/Colors'
import { useNavigation } from '@react-navigation/native'

const CommonSectionHeader = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight)
    const navigation = useNavigation()
    
    const handleNavigate=()=> navigation.navigate('Shop', {type:'all'})
    return (
        <View style={styles.container}>
            <View style={styles.contentView}>
                <View>
                    <Text style={styles.textHead}>{props.headText}</Text>
                    <Text style={styles.textContent}>{props.contentText}</Text>
                </View>
                <Text style={styles.textContent} onPress={handleNavigate} >{props.rightText}</Text>
            </View>
            
        </View>
    )
}

export default CommonSectionHeader