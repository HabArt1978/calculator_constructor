import { createSlice, type CaseReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import appState from './initialState'
import type {
  ActiveBlock,
  ActiveStatus,
  AlertVisible,
  AppStateTypes,
  Block,
  DroppableBlockPosition,
} from './types'
import { Operator, calculate } from '@/library/calculator'

const calculateReducer: CaseReducer<AppStateTypes> = state => {
  if (!state.operator || !state.firstNumber || !state.secondNumber) return

  const result = calculate(
    Number(state.firstNumber),
    Number(state.secondNumber),
    state.operator,
  )

  state.secondNumber = null
  state.operator = null
  state.firstNumber = String(result)
}

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
      if (state.operator) calculateReducer(state, { type: '' })

      state.operator = action.payload
    },

    appendActiveDigit: (state, action: PayloadAction<number | '.'>) => {
      const value = state.operator ? state.secondNumber : state.firstNumber
      const newValue = `${value ?? ''}${action.payload}`

      // Пропускать второй разделитель
      if ((newValue.match(/\./g)?.length ?? 0) > 1) {
        return
      }
      // Не давать вводить более 3 цифр после разделителя
      const floatPointIndex = newValue.lastIndexOf('.')
      if (floatPointIndex !== -1 && newValue.length - floatPointIndex > 4) {
        return
      }
      // Не давать вводить более 9 цифр перед разделителем
      else if (floatPointIndex === -1 && newValue.length > 12) {
        return
      }

      if (state.operator) {
        state.secondNumber = newValue
      } else {
        state.firstNumber = newValue
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

    calculateResult: calculateReducer,
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
