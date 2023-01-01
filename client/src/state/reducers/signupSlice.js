import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getUsers = createAsyncThunk('signup/getUsers', async () => {
    try {
        const response = await fetch('http://localhost:2929/signup');
        return response.json();
        
    } catch (error) {
        console.log(error);
    }
});

const signupSlice = createSlice({
    name : 'signup',
    initialState : {
        data : [],
        stateus : 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
        error : null
    },
    reducers :{},
    extraReducers : (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.stateus = 'pending'
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.stateus = 'succeeded';
                state.data.push(action.payload);
                console.log(action.payload);
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.stateus = 'failed'
            })
    }
});
export default signupSlice.reducer;