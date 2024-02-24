import {createSlice} from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {

}
const initialState = {
    token: null,
    isAuthenticated:false,

}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action) => {
            state.token = action.payload.token;
            state.isAuthenticated = !! action.payload.token;
        },
        logout:(state) => {
            state.token = null;
            state.isAuthenticated= false;
        },
    }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;