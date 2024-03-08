import { AppStateTypes } from './types'

export const appState: AppStateTypes = {
  activeBlock: null,
  designBlocks: [],
  droppableBlockPosition: null,
  activeStatus: 'constructor',
  isAlertVisible: false,

  firstDigit: null,
  operator: null,
  secondDigit: null,
}

export default appState
