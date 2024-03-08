import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import appState from './initialState'
import type {
  ActiveBlock,
  ActiveStatus,
  AlertVisible,
  Block,
  Digit,
  DroppableBlockPosition,
  OperatorType,
} from './types'

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

    setFirstDigit: (state, action: PayloadAction<Digit>) => {
      if (!state.operator) {
        const newValue = [state.firstDigit, action.payload]

        state.firstDigit = newValue.join('')
      } else {
        state.firstDigit = action.payload
      }
    },

    setOperator: (state, action: PayloadAction<OperatorType>) => {
      state.operator = action.payload
    },

    setSecondDigit: (state, action: PayloadAction<Digit>) => {
      if (state.operator) {
        const newValue = [state.secondDigit, action.payload]

        state.secondDigit = newValue.join('')
      } else {
        state.secondDigit = action.payload
      }
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
  setFirstDigit,
  setOperator,
  setSecondDigit,
} = appSlice.actions
export default appSlice.reducer
