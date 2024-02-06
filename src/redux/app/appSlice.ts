import { createSlice } from '@reduxjs/toolkit'

import appState from './initialState'

import type { PayloadAction } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: appState,
  reducers: {
    // default fill
    setApp: (state, action: PayloadAction<number>) => {},
  },
})

export const { setApp } = appSlice.actions
export default appSlice.reducer
