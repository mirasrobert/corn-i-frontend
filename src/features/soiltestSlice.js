import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URI

export const fetchSoilTests = createAsyncThunk(
  'soiltests/fetchSoilTests',
  async (_, { rejectWithValue }) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }

    try {
      const response = await axios.get(`${API_URL}/soiltests`, options)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createSoilTest = createAsyncThunk(
  'soiltests/create',
  async (fields, { rejectWithValue }) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }

    try {
      const response = await axios.post(`${API_URL}/soiltest`, fields, options)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  loading: true,
  soiltests: [],
  error: null,
}

const soiltestSlice = createSlice({
  name: 'soiltests',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSoilTests.pending]: (state) => {
      state.loading = true
    },
    [fetchSoilTests.fulfilled]: (state, action) => {
      state.loading = false
      state.soiltests = action.payload
    },
    [fetchSoilTests.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [createSoilTest.pending]: (state) => {
      state.loading = true
    },
    [createSoilTest.fulfilled]: (state, action) => {
      state.loading = false
      state.soiltests.push(action.payload)
    },
    [createSoilTest.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default soiltestSlice.reducer
