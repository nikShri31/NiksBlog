import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer:{
        auth : authSlice,
    }
})

export default store;

/*** store ko bs saare reducers ki info deni hoti h .***/