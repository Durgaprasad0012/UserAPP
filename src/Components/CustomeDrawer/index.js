import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { style } from './style'
import { useDimensionContext } from '../../context'
import { colors } from '../Common/Colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../Storage/action'

const CustomeDrawer = () => {
    const navigation = useNavigation()
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const dispatch = useDispatch()
    const firstName = useSelector(state => state.firstName)
    const lastName = useSelector(state => state.lastName)
    const email = useSelector(state => state.email)
    const profilePic = useSelector(state => state.profilePic)
    const arrayItems = [
        {
            itemId: 0,
            ItemName: 'Home',
            navigateTo: 'Home',
            ItemIcon: require('../../asset/img/home_icon_blk.png')
        },
        {
            itemId: 1,
            ItemName: 'Shop by Category',
            navigateTo: 'Categories',
            ItemIcon: require('../../asset/img/category_blk_icon.png')
        },
        {
            itemId: 2,
            ItemName: 'Orders',
            navigateTo: 'Orders',
            ItemIcon: require('../../asset/img/orders_icon.png')
        },
        {
            itemId: 3,
            ItemName: 'Your Wishlist',
            navigateTo: 'Wishlist',
            ItemIcon: require('../../asset/img/heart_icon.png')
        },
        {
            itemId: 4,
            ItemName: 'Your Account',
            navigateTo: 'Account',
            ItemIcon: require('../../asset/img/user_icon.png')
        },
    ]

    const handleSignOut = () => {
        Alert.alert('Warning..!', 'Are you sure want to SignOut?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(signOut()) },
        ]);


    }
    const handleNavigate = () => {
        navigation.navigate('Account')
    }
    return (
        <View style={[styles.container,]}>
            <ScrollView>
                {/* Profile */}
                <TouchableOpacity
                    style={styles.profile}
                    onPress={handleNavigate}
                >
                    <View style={styles.profileImage}>
                        {profilePic !== "" ?
                            <Image source={{ uri: profilePic }} style={styles.image} />
                            : <Text style={{ color: colors.black_level_2, fontSize: 20, fontWeight: "bold", fontFamily: 'Lato-Bold' }}>{firstName.charAt(0)}</Text>
                        }
                    </View>
                    <View style={styles.profileText}>
                        <Text style={styles.profileName}>{firstName} {lastName}</Text>
                        <Text style={styles.profileMail}>{email}</Text>
                    </View>
                </TouchableOpacity>
                {/* DraweContent */}
                <View style={styles.drawerContent}>
                    {arrayItems.map((route, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(route.navigateTo)}
                                key={route.itemId}
                                style={styles.drawerContentItem}
                            >
                                <View style={styles.drawerContentItemIcon}>
                                    <Image source={route.ItemIcon} style={styles.drawerIcon} />
                                    <Text style={styles.drawerText}>{route.ItemName}</Text>
                                </View>
                                <Image source={require('../../asset/img/arrow_icon.png')} style={styles.drawerIcon} />
                            </TouchableOpacity>
                        )
                    })}

                </View>
                {/* Logout */}
                <View style={styles.logoutView}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={handleSignOut}
                    >
                        <Image source={require('../../asset/img/arrow_icon.png')} style={styles.drawerIcon} />
                        <Text style={styles.logoutBtnText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
                {/* Contact Support */}
                <View style={styles.SupportView}>
                    <Text style={styles.supportHead}>Contact Support</Text>
                    <Text style={styles.supportText}>
                        If you have any problem with the app, feel free to contact our 24 hours support system..
                    </Text>
                    <TouchableOpacity style={styles.supportBtn}>
                        <Text style={styles.supportBtnText}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CustomeDrawer