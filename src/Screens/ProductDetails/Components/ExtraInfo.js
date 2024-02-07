import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useDimensionContext } from '../../../context'
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../../Components/Common/Colors';
import { style } from './style'

const ExtraInfo = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const [currentSection, setCurrentSection] = useState([0])
    const arraySections = [
        {
            title: 'Manufacture Details',
            details: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero',
        },
        {
            title: 'Product Disclaimer',
            details: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero',
        },
        {
            title: 'Features & Details',
            details: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero',
        },
    ]

    const _renderHeader = sections => {
        return (
            <View style={styles.sectionView}>
                <Text style={styles.sectionTitle}>{sections.title}</Text>
                <AntDesign name={'down'} size={20} color={colors.black_level_1} />
            </View>
        )
    }
    const _renderContent = sections => {
        return (
            <View>
                <Text style={styles.details}>{sections.details}</Text>
            </View>
        )
    }
    const _updateSections = activeSections => {
        setCurrentSection(activeSections)
    }

    return (
        <>
            <Accordion
                activeSections={currentSection}
                sections={arraySections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                sectionContainerStyle={styles.sectionContainerStyle}
                underlayColor
                onChange={_updateSections}
            />
        </>
    )
}

export default ExtraInfo