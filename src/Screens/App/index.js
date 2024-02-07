import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DimensionContextProvider, useDimensionContext } from '../../context'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import 'react-native-gesture-handler';
import CustomeDrawer from '../../Components/CustomeDrawer'
import CustomeFooter from '../../Components/CustomeFooter'
import Login from '../Login'
import Categories from '../Categories'
import SignUp from '../SignUp'
import SignPhone from '../SignPhone'
import Home from '../Home'
import Cart from '../Cart'
import Search from '../Search'
import Offers from '../Offers'
import Orders from '../Orders'
import Wishlist from '../Wishlist'
import Account from '../Account'
import { colors } from '../../Components/Common/Colors'
import { Provider, useSelector } from "react-redux";
import { style } from './style'
import { store } from '../../Storage/store'
import Splash from '../Splash'
import Shop from '../Shop'
import ProductDetails from '../ProductDetails'
import Reviews from '../ReView'
import AddAddress from '../AddAddress'
import OrdersDetails from '../OrdersDetails'
navigator.geolocation = require('@react-native-community/geolocation');

const AppStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const Footer = createBottomTabNavigator()

// App Drawer
const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName='AppFooter'
      drawerContent={(props) => <CustomeDrawer {...props} />}
    >
      <Drawer.Screen name='AppFooter' component={AppFooter} options={{ headerShown: false }} />
      <Drawer.Screen name='Categories' component={Categories} />
      <Drawer.Screen name='Orders' component={Orders} />
      <Drawer.Screen name='OrdersDetails' component={OrdersDetails} />
      <Drawer.Screen name='Wishlist' component={Wishlist} />
      <Drawer.Screen name='Account' component={Account} />
      <Drawer.Screen name='Shop' component={Shop} />
      <Drawer.Screen name='ProductDetails' component={ProductDetails} />
      <Drawer.Screen name='Reviews' component={Reviews} />
      <Drawer.Screen name='AddAddress' component={AddAddress} />
    </Drawer.Navigator>
  )
}

// AppFooter
const AppFooter = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  return (
    <Footer.Navigator
      initialRouteName='Home'
      tabBar={(props) => <CustomeFooter  {...props} />}
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
            >
              <Image source={require('../../asset/img/left-arrow.png')} style={styles.title} />
            </TouchableOpacity>
          )
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontFamily: "Lato-Bold",
          color: colors.black_level_1,
          fontSize: 18
        }
      }}
    >
      <Footer.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Footer.Screen name='Category' component={Categories} />
      <Footer.Screen name='Search' component={Search} />
      <Footer.Screen name='Offers' component={Offers} />
      <Footer.Screen name='Cart' component={Cart} />
    </Footer.Navigator>
  )
}
const AppNavigation = () => {
  const [loding, setLoding] = useState(true)
  const isLoggedIn  = useSelector(state=> state.isLoggedIn)

  useEffect(() => {
    setTimeout(() => {
      setLoding(false)
    }, 1000);
  }, [isLoggedIn])
  
  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {loding?
            <AppStack.Screen name='Splash' component={Splash} />
          :
          <>
          {isLoggedIn ?
            <AppStack.Screen name='AppDrawer' component={AppDrawer} />
            :
            <>
              <AppStack.Screen name='Login' component={Login} />
              <AppStack.Screen name='SignUp' component={SignUp} />
              <AppStack.Screen name='SignPhone' component={SignPhone} />
            </>
          }
          </>}

        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}


export default App