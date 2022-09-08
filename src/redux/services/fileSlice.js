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
export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.value = action.payload
        },
    },
})

// A small helper of user state for `useSelector` function.
export const getFilesState = (state) => state.file.value

// Exports all actions
export const { setFiles } = fileSlice.actions

export default fileSlice.reducer
