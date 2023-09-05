import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userEmail: null, // for user object
  userToken: null, // for storing the JWT
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
})


export default authSlice.reducer