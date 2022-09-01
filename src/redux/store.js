import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userSlice from './services/userSlice'
import { apiSlice } from './services/apiSlice'

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
    reducer: {
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
