import { ActiveBlock } from '@/redux/app/types'

export const lightUpTheDisplayDropZone = (activeBlock: ActiveBlock) =>
  activeBlock?.type === 'display' && activeBlock ? '#dcfce7' : 'transparent'

export const lightUpTheOtherDropZone = (activeBlock: ActiveBlock) =>
  activeBlock?.type !== 'display' && activeBlock ? '#dcfce7' : 'transparent'
