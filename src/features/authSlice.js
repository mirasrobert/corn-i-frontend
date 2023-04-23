import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URI

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await axios.post(
        `${API_URL}/login`,
        credentials,
        options
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${API_URL}/register`,
        credentials,
        options
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }
    const response = await axios.get(`${API_URL}/user`, options)

    console.log('USER AUTHENTICATED.')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token // set token

        localStorage.setItem('token', action.payload.token)

        window.location.href = '/'
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
        toast.error(action.payload.message)
        state.user = null
        if (localStorage.getItem('token')) localStorage.removeItem('token')
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
        state.user = null
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = localStorage.getItem('token')
          ? localStorage.getItem('token')
          : null
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
      })
  },
})

export const selectUser = (state) => state.auth.user
export const selectLoading = (state) => state.auth.loading
export const selectError = (state) => state.auth.error
export const selectToken = (state) => state.auth.token

export default authSlice.reducer
