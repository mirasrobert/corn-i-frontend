import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import soilTestReducer from '../features/soiltestSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  soiltest: soilTestReducer,
})

export default rootReducer
