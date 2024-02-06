import { configureStore, combineReducers } from '@reduxjs/toolkit'
import appReducer from './app/appSlice'

const rootReducer = combineReducers({
  appState: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
