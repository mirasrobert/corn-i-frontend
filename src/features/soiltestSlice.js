import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

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

export const deleteSoilTest = createAsyncThunk(
  'soiltests/delete',
  async (id, { rejectWithValue }) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }

    try {
      const response = await axios.delete(`${API_URL}/soiltest/${id}`, options)
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
      //state.loading = true
    },
    [createSoilTest.fulfilled]: (state, action) => {
      //state.loading = false
      state.soiltests.push(action.payload)

      toast.success('Soiltest record has been added')
    },
    [createSoilTest.rejected]: (state, action) => {
      //state.loading = false
      if (action.payload.message) {
        state.error = action.payload.message
        toast.error(action.payload.message)
      }

      if (action.payload.error) {
        toast.error(action.payload.error)
      }
    },

    [deleteSoilTest.pending]: (state) => {
      // state.loading = true
    },
    [deleteSoilTest.fulfilled]: (state, action) => {
      // state.loading = false
      const deletedId = action.payload.id
      state.soiltests = state.soiltests.filter(
        (soiltest) => soiltest.id !== deletedId
      )
      toast.success('Soiltest record has been deleted')
    },
    [deleteSoilTest.rejected]: (state, action) => {
      // state.loading = false
      if (action.payload.message) {
        state.error = action.payload.message
        toast.error(action.payload.message)
      }

      if (action.payload.error) {
        toast.error(action.payload.error)
      }
    },
  },
})

export default soiltestSlice.reducer
