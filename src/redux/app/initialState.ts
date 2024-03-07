import { Operator } from '@/library/calculator'

import { AppStateTypes } from './types'

export const appState: AppStateTypes = {
  activeBlock: null,
  designBlocks: [],
  droppableBlockPosition: null,
  activeStatus: 'constructor',
  isAlertVisible: false,

  displayValue: '0',
  firstDigit: 10,
  operator: Operator.Mul,
  secondDigit: 5,
}

export default appState
