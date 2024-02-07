import { CATEGORIES, LOGIN, SIGNOUT, UPDATEPROFILE, CARTCOUNT, CATID} from "./constants"

const initialState = {
    isLoggedIn: false,
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    profilePic: '',
    categories:[],
    cartCount:0,
    catId:''
}

export const inkartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                mobileNumber: action.payload.mobileNumber,
                profilePic: action.payload.profilePic,
                isLoggedIn: true,
            }
        case SIGNOUT:
            return {
                ...state,
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                mobileNumber: '',
                profilePic: '',
                isLoggedIn: false,
            }
        case UPDATEPROFILE :
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                mobileNumber: action.payload.mobileNumber,
                profilePic: action.payload.profilePic,
            }
        case CATEGORIES :
            return {
                ...state,
                categories: action.payload.categories,
            }
        case CARTCOUNT :
            return {
                ...state,
                cartCount: action.payload.cartCount,
            }
        case CATID :
            return {
                ...state,
                catId: action.payload.catId,
            }

        default: return state
    }
}