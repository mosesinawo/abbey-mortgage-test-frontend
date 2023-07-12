// @ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

  
  export const addUser = createAsyncThunk( 'users/addUser', async (user) => {
      try{
        const res = await axios.post(`${URL}auth/register`, user)
      return res.data
      }catch(err){
        console.log(err)
        
       
      }
    }
  )


const initialState = {
  currentUser: null,
  status:'idle',
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register() {
        
        
    }
  }, 
  extraReducers(builder){
    builder
    .addCase(addUser.pending,(state, action) =>{
         console.log("pending")
         state.status= 'pending'
     })
     .addCase(addUser.fulfilled,(state, action) =>{
         state.currentUser = action.payload
        if(state.currentUser){
            state.status = 'success'
            state.error = false
        }else{
            state.status = 'failed'
            state.error = true
        }
     
     })
    
 
  }
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions
export const user = (state) => state.user.currentUser
export const status = (state) => state.user.status
export const error = (state) => state.user.error

export default userSlice.reducer