import { AppStateTypes } from './types'

export const appState: AppStateTypes = {
  activeBlock: null,
  designBlocks: [],
  droppableBlockPosition: null,
  activeStatus: 'constructor',
  isAlertVisible: false,

  firstNumber: null,
  operator: null,
  secondNumber: null,
}

export default appState
