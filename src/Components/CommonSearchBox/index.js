import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { style } from './style'
import { useDimensionContext } from '../../context'
import { colors } from '../Common/Colors'

const CommonSearchBox = (props) => {
    const { filter, mic = true, placeholder, onChangeText = {} } = { ...props }
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    return (
        <View style={[filter ? styles.newContainer : styles.container]}>
            <View style={[filter ? styles.newSearchView : styles.searchView]}>
                <View style={styles.innerView}>
                    <Image source={require('../../asset/img/searchfind_icon.png')} style={styles.searchIcon} />
                    <TextInput
                        placeholder={placeholder ? placeholder : 'Search here..'}
                        placeholderTextColor={colors.primary_green}
                        style={styles.TextInput}
                        selectionColor={colors.primary_green}
                        clearTextOnFocus={true}
                        onChangeText={text => onChangeText(text)}
                    />
                    {mic ?
                        <Image source={require('../../asset/img/mic_icon.png')} style={styles.searchIcon} />
                        : null}
                </View>

            </View>
            {filter ?
                <Text style={styles.filterText}>Filter</Text>
                : null}
        </View>
    )
}

export default CommonSearchBox