import { createSlice } from '@reduxjs/toolkit';

// ......Store k andr bhi hum slice bna skte h toh hum authentication slice bnayenge......
// ***** User authenticated h ya nhi 

const initialState = {
    status: false,    // by default authentication false h 
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {      //action1
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {     //action2
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
