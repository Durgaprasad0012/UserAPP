import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { inkartReducer } from "./reducer";

//  redux persist config
const persistConfig = {
    key: 'userApp',
    storage: AsyncStorage,
}

// middleware : Redux persisted reducer
const persistedReducer = persistReducer(persistConfig, inkartReducer)

// redux : store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
})

// middleware : Redux persist persister
let persister = persistStore(store)

// expost

export { store, persister }