import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URI

export const generatePrediction = createAsyncThunk(
  'soiltests/generatePrediction',
  async (farm_site, { rejectWithValue }) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await axios.get(
        `${API_URL}/soiltests/latest?farm_site=${farm_site}`,
        options
      )

      const { data } = response

      const nitrogenPrediction = await axios.post(
        `${API_URL}/predict/nitrogen`,
        {
          data: [data.N],
        },
        options
      )

      const phosphorusPrediction = await axios.post(
        `${API_URL}/predict/phosphorus`,
        {
          data: [data.P],
        },
        options
      )

      const potassiumPrediction = await axios.post(
        `${API_URL}/predict/potassium`,
        {
          data: [data.K],
        },
        options
      )

      const phLevelPrediction = await axios.post(
        `${API_URL}/predict/ph_level`,
        {
          data: [data.pH],
        },
        options
      )

      const payload = {
        data: data,
        predictions: {
          nitrogen: nitrogenPrediction.data.predictions,
          phosphorus: phosphorusPrediction.data.predictions,
          potassium: potassiumPrediction.data.predictions,
          pH: phLevelPrediction.data.predictions,
        },
      }

      return payload
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  loading: true,
  soiltest: null,
  predictions: null,
  error: null,
}

const predictionSlice = createSlice({
  name: 'predictionSoiltest',
  initialState,
  reducers: {},
  extraReducers: {
    [generatePrediction.pending]: (state) => {
      state.loading = true
      state.soiltest = null
      state.predictions = null
    },
    [generatePrediction.fulfilled]: (state, action) => {
      state.loading = false
      state.soiltest = action.payload.data
      state.predictions = action.payload.predictions
      state.error = null
    },
    [generatePrediction.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default predictionSlice.reducer
