import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import appState from './initialState'
import type {
  ActiveBlock,
  ActiveStatus,
  AlertVisible,
  Block,
  DroppableBlockPosition,
} from './types'
import { Operator, calculate } from '@/library/calculator'

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

      if (state.activeStatus === 'constructor') {
        state.firstNumber = null
        state.operator = null
        state.secondNumber = null
      }
    },

    setIsAlertVisible: (state, action: PayloadAction<AlertVisible>) => {
      state.isAlertVisible = action.payload
    },

    setOperator: (state, action: PayloadAction<Operator | null>) => {
      state.operator = action.payload
    },

    appendActiveDigit: (state, action: PayloadAction<string | null>) => {
      const value = state.operator ? state.secondNumber : state.firstNumber

      const newValue = [value, action.payload]

      if (state.operator) {
        state.secondNumber = newValue.join('')
      } else {
        state.firstNumber = newValue.join('')
      }
    },

    invertActiveNumber: state => {
      if (state.operator) {
        state.secondNumber = String(Number(state.secondNumber) * -1)
      } else {
        state.firstNumber = String(Number(state.firstNumber) * -1)
      }
    },

    dropLastActiveDigit: state => {
      if (state.operator) {
        state.secondNumber = state.secondNumber?.slice(0, -1) ?? null
      } else {
        state.firstNumber = state.firstNumber?.slice(0, -1) ?? null
      }
    },

    clearDisplayValue: state => {
      state.firstNumber = null
      state.operator = null
      state.secondNumber = null
    },

    calculateResult: state => {
      if (!state.operator || !state.firstNumber || !state.secondNumber) return

      const result = calculate(
        Number(state.firstNumber),
        Number(state.secondNumber),
        state.operator,
      )

      state.secondNumber = null
      state.operator = null
      state.firstNumber = String(result)
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
  setOperator,
  appendActiveDigit,
  invertActiveNumber,
  dropLastActiveDigit,
  clearDisplayValue,
  calculateResult,
} = appSlice.actions
export default appSlice.reducer
