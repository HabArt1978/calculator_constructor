import { useAppSelector } from '../reduxHooks'

export default function useStateSelectors() {
  const state = useAppSelector(({ appState }) => appState)

  const activeBlock = state.activeBlock

  const transferredBlocks = state.designBlocks

  const droppableBlockPosition = state.droppableBlockPosition

  const activeStatus = state.activeStatus

  const isAlertVisible = state.isAlertVisible

  const firstNumber = state.firstNumber

  const operator = state.operator

  const secondNumber = state.secondNumber

  return {
    activeBlock,
    transferredBlocks,
    droppableBlockPosition,
    activeStatus,
    isAlertVisible,
    firstNumber,
    operator,
    secondNumber,
  }
}
