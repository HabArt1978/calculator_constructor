import { createSlice } from '@reduxjs/toolkit'
import appState from './initialState'

import type {
  ActiveBlock,
  ActiveStatus,
  AlertVisible,
  Block,
  DroppableBlockPosition,
} from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

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

    deleteDesignBlocks: state => {
      state.designBlocks = []
    },

    setDroppableBlockPosition: (
      state,
      action: PayloadAction<DroppableBlockPosition>,
    ) => {
      state.droppableBlockPosition = action.payload
    },

    setActiveStatus: (state, action: PayloadAction<ActiveStatus>) => {
      state.activeStatus = action.payload
    },

    setIsAlertVisible: (state, action: PayloadAction<AlertVisible>) => {
      state.isAlertVisible = action.payload
    },
  },
})

export const {
  setActiveBlock,
  addDesignBlock,
  setDesignBlocks,
  deleteDesignBlocks,
  setDroppableBlockPosition,
  setActiveStatus,
  setIsAlertVisible,
} = appSlice.actions
export default appSlice.reducer
