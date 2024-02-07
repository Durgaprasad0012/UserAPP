import { CARTCOUNT, CATEGORIES, CATID, LOGIN, SIGNOUT, UPDATEPROFILE } from "./constants"

export const login = data => ({
    type: LOGIN,
    payload: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        profilePic: data.profilePic,
    },
})
export const signOut = data => ({
    type: SIGNOUT,
    payload: {},
})

export const updateProfile = data => ({
    type: UPDATEPROFILE,
    payload: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        profilePic: data.profilePic,
    },
})
export const categories = data => ({
    type: CATEGORIES,
    payload: {
        categories: data,
    },
})
export const updateCartCount = data => ({
    type: CARTCOUNT,
    payload: {
        cartCount: data,
    },
})
export const updateCatId = data => ({
    type: CATID,
    payload: {
        catId: data,
    },
})