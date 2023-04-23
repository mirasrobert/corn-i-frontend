import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URI

export const getAllUsers = createAsyncThunk(
  'account/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      }
      const response = await axios.get(`${API_URL}/users`, options)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const addUser = createAsyncThunk(
  'account/addUser',
  async (formData, thunkAPI) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${API_URL}/register`,
        formData,
        options
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'account/deleteUser',
  async (id, thunkAPI) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      }
      const response = await axios.delete(`${API_URL}/users/${id}`, options)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const accountSlicer = createSlice({
  name: 'accounts',
  initialState: {
    loading: false,
    isUsersLoading: false,
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isUsersLoading = true
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isUsersLoading = false
        state.error = action.payload
      })
      .addCase(addUser.pending, (state) => {
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user)
        toast.success('New Account Added')
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isUsersLoading = false
        state.error = action.payload.message
        toast.error(action.payload.message)
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        )
        toast.success('Account Deleted')
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload.message
        toast.error(action.payload.message)
      })
  },
})

export default accountSlicer.reducer
