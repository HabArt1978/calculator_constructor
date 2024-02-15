import { useAppSelector } from '../reduxHooks'

export default function useStateSelectors() {
  const activeBlock = useAppSelector(({ appState }) => appState.activeBlock)
  const transferredBlockIds = useAppSelector(
    ({ appState }) => appState.designBlocks,
  )

  return {
    activeBlock,
    transferredBlockIds,
  }
}
