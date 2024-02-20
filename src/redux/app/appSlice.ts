import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import appState from './initialState'

import { ActiveBlock, AppStateTypes, Block, BlockId } from './types'

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
  },
})

export const { setActiveBlock, addDesignBlock } = appSlice.actions
export default appSlice.reducer
