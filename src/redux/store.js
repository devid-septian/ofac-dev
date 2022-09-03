import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userSlice from './services/userSlice'
import { apiSlice } from './services/apiSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

/**
 * Creates a store and includes all the slices as reducers.
 */
const reducers = combineReducers({
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(apiSlice.middleware),
})
