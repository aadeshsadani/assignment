import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './reducers/signupSlice';
export const store = configureStore({
    reducer:{
        updatedUsers : signupSlice
    }
});