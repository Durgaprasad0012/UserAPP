import React, { createContext, useContext, useEffect, useState } from "react";
import { useWindowDimensions, Dimensions as dim, Dimensions } from "react-native";

export const DimensionContext = createContext()
export const useDimensionContext = () => useContext(DimensionContext)

export const DimensionContextProvider = ({ children }) => {
    const dimensions = useWindowDimensions()
    const initHeight = dim.get('window').height
    const initWidth = dim.get('window').width

    const [windowWidth, setWindowWidth] = useState(initWidth)
    const [windowHeight, setWindowHeight] = useState(initHeight)
    const [isProtrait, setIsProtrait] = useState(false)

    const checkIsProtrait = () => {
        const dimens = Dimensions.get('screen')
        return dimens.height >= dimens.width
    }

    useEffect(() => {
        setItem()
        setIsProtrait(checkIsProtrait())
        Dimensions.addEventListener('change', () => {
            setIsProtrait(checkIsProtrait())
        })
    }, [dimensions])

    const setItem = () => {
        const { height, width } = dimensions
        setWindowHeight(height)
        setWindowWidth(width)
    }
    return (
        <DimensionContext.Provider
            value={{
                windowWidth, windowHeight, isProtrait
            }}
        >
            {children}
        </DimensionContext.Provider>
    )
}