import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
    },
})

// A small helper of user state for `useSelector` function.
export const getUserState = (state) => state.user.value

// Exports all actions
export const { setUser } = userSlice.actions

export default userSlice.reducer
