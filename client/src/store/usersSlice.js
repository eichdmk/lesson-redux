import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        editingUser: null
    },

    reducers: {
        setUsers: (state, action) => {
            state.list = action.payload
        },
        addUser: (state, action) => {
            state.list.push(action.payload)
        },
        updateUser: (state, action) => {
            state.list = state.list.map(u => u.id === action.payload.id ? action.payload : u)
        },
        updateStatus: (state, action) => {
            state.list = state.list.map(u => u.id === action.payload ? { ...u, is_active: !u.is_active } : u)
        },
        deleteUser: (state, action) => {
            state.list = state.list.filter(u => u.id !== action.payload)
        },
        setEditingUser: (state, action) =>{
            state.editingUser = action.payload
        }
    }
})

export const {setUsers, setEditingUser, addUser, updateStatus, updateUser, deleteUser} = usersSlice.actions
export default usersSlice.reducer