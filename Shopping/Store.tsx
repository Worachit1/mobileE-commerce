import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistCombineReducers } from "redux-persist";
import storage from '@react-native-async-storage/async-storage'
import CartReducer from './src/redux/CartReducer'


const persistConfig = {
    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, CartReducer)

export const store = configureStore({
    reducer:{
        cart:persistedReducer
    },
    middleware:(gotoDefaultMiddleware)=> 
        gotoDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
    
})

export const persistor = persistStore(store)

export type RootSate = ReturnType<typeof store.getState>;