import { useAppSelector } from '../reduxHooks'

export default function useStateSelectors() {
  const state = useAppSelector(({ appState }) => appState)

  const activeBlock = state.activeBlock

  const transferredBlocks = state.designBlocks

  const droppableBlockPosition = state.droppableBlockPosition

  const activeStatus = state.activeStatus

  const isAlertVisible = state.isAlertVisible

  const firstDigit = state.firstDigit

  const operator = state.operator

  const secondDigit = state.secondDigit

  return {
    activeBlock,
    transferredBlocks,
    droppableBlockPosition,
    activeStatus,
    isAlertVisible,
    firstDigit,
    operator,
    secondDigit,
  }
}
