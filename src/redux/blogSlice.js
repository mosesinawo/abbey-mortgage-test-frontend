import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {search } from "../pages/homepage/Homepage"
import { URL } from '../App'

  
  export const post = createAsyncThunk( 'blog/post', async () => {
      try{
        const res =  await axios.get(`${URL}/posts`)
      return res.data
      }catch(err){
        console.log(err)
       
      }
    }
  )


const initialState = {
  blogs : []
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
    .addCase(post.pending,(state, action) =>{
         console.log("pending")
     })
     .addCase(post.fulfilled,(state, action) =>{
         state.blogs = action.payload
     
     })
     .addCase(post.error, () =>{

     })
    
 
  }
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions

export default userSlice.reducer