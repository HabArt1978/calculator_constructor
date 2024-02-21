import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import appState from './initialState'

import { ActiveBlock, Block } from './types'

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: appState,
  reducers: {
    setActiveBlock: (state, action: PayloadAction<ActiveBlock>) => {
      state.activeBlock = action.payload
    },

    addDesignBlock: (state, action: PayloadAction<Block>) => {
      const designBlock = state.designBlocks
      const updatedDesignBlock = [...designBlock, action.payload]

      state.designBlocks = updatedDesignBlock
    },

    setDesignBlocks: (state, action: PayloadAction<Block[]>) => {
      state.designBlocks = action.payload
    },
  },
})

export const { setActiveBlock, addDesignBlock, setDesignBlocks } =
  appSlice.actions
export default appSlice.reducer
