import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import soilTestReducer from '../features/soiltestSlice'
import predictionReducer from '../features/predictionSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  soiltest: soilTestReducer,
  forecasting: predictionReducer,
})

export default rootReducer
