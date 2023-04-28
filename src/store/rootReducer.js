import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import soilTestReducer from '../features/soiltestSlice'
import predictionReducer from '../features/predictionSlice'
import accountReducer from '../features/accountSlice'
import mappingReducer from '../features/mappingSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  soiltest: soilTestReducer,
  forecasting: predictionReducer,
  accounts: accountReducer,
  mappings: mappingReducer,
})

export default rootReducer
