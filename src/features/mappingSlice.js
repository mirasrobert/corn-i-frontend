import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URI

// Thunk for fetching all Mapping objects
export const fetchMappings = createAsyncThunk('mappings/fetchAll', async () => {
  const response = await axios.get(`${API_BASE_URL}/mapping`)
  return response.data
})

// Thunk for fetching a single Mapping object by its type
export const fetchMappingByType = createAsyncThunk(
  'mappings/fetchByType',
  async (type) => {
    const response = await axios.get(`${API_BASE_URL}/mapping/${type}`)
    return response.data
  }
)

// Thunk for updating a Mapping object by its type
export const updateMappingByType = createAsyncThunk(
  'mappings/updateByType',
  async (mappingData) => {
    const { type, data } = mappingData
    const response = await axios.put(`${API_BASE_URL}/mapping/${type}`, {
      type,
      data,
    })
    return response.data
  }
)

// Slice for managing Mapping objects
const mappingsSlice = createSlice({
  name: 'mappings',
  initialState: {
    allMappings: [],
    currentMapping: null,
    loading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for handling fetchMappings() thunk
    builder.addCase(fetchMappings.pending, (state) => {
      state.loading = true
      state.status = 'loading'
    })
    builder.addCase(fetchMappings.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.allMappings = action.payload
    })
    builder.addCase(fetchMappings.rejected, (state, action) => {
      state.status = 'failed'
      state.loading = false
      state.error = action.error.message
    })

    // Reducer for handling fetchMappingByType() thunk
    builder.addCase(fetchMappingByType.pending, (state) => {
      state.status = 'loading'
      state.loading = true
    })
    builder.addCase(fetchMappingByType.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.currentMapping = action.payload

      state.loading = false
    })
    builder.addCase(fetchMappingByType.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.loading = false
    })

    // Reducer for handling updateMappingByType() thunk
    builder.addCase(updateMappingByType.pending, (state) => {
      state.status = 'loading'
      state.loading = true
    })
    builder.addCase(updateMappingByType.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.currentMapping = action.payload
      state.loading = false

      toast.success('Coordinates added in mapping')
    })
    builder.addCase(updateMappingByType.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.loading = false

      toast.error('Something went wrong adding coordinates')
    })
  },
})

// Selectors for accessing Mapping objects from the state
export const selectAllMappings = (state) => state.mappings.allMappings
export const selectCurrentMapping = (state) => state.mappings.currentMapping

export default mappingsSlice.reducer
