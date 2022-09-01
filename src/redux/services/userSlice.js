import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    name: 'Sulhadin',
    email: 'sulhadin@gmail.com',
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
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
    },
})

// A small helper of user state for `useSelector` function.
export const getUserState = (state) => state.user

// Exports all actions
export const { setName, setEmail } = userSlice.actions

export default userSlice.reducer
