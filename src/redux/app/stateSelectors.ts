import { useAppSelector } from '../reduxHooks'

export default function useStateSelectors() {
  const activeBlock = useAppSelector(({ appState }) => appState.activeBlock)
  const transferredBlocks = useAppSelector(
    ({ appState }) => appState.designBlocks,
  )
  const droppableBlockPosition = useAppSelector(
    ({ appState }) => appState.droppableBlockPosition,
  )

  const activeStatus = useAppSelector(({ appState }) => appState.activeStatus)

  return {
    activeBlock,
    transferredBlocks,
    droppableBlockPosition,
    activeStatus,
  }
}
