import { combineReducers, configureStore } from '@reduxjs/toolkit'

import appReducer from './app/appSlice'

const rootReducer = combineReducers({
  appState: appReducer,
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  })

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
