
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'


export const login = createAsyncThunk('users/login', async (user, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", user)
    console.log(res.data)
    toast.success(`successful`, {
      position: toast.POSITION.TOP_RIGHT
  });
    return res.data
  } catch (err) {
    console.log(err.response.data)
    toast.error(`invalid credentials`, {
      position: toast.POSITION.TOP_RIGHT
  });
    return thunkAPI.rejectWithValue(err);


  }
}
)


const initialState = {
  currentUser: null,
  isFetching: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null
      state.isFetching = false
      state.error = false
    },
    getUser(state, action){
      state.currentUser = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        console.log("pending")
        state.isFetching = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.isFetching = false
        state.error = false

      })
      .addCase(login.rejected, (state, action) => {
        state.currentUser = null
        state.isFetching = false
        state.error = true
      })


  }
})

// Action creators are generated for each case reducer function
export const { logout, getUser} = userSlice.actions
export const user = (state) => state.user.currentUser
export const status = (state) => state.user.isFetching
export const error = (state) => state.user.error

export default userSlice.reducer