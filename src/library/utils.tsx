import { buildingBlocksData } from './data'
import { ActiveBlock } from '@/redux/app/types'

import BlockContainerForDesignArea from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/BlockContainerForDesignArea'

export function getBlockContainerForDesignArea(activeBlockId: string | number) {
  for (const buildingBlock of buildingBlocksData) {
    if (activeBlockId === buildingBlock.block.id) {
      return (
        <BlockContainerForDesignArea
          block={{ id: activeBlockId, type: buildingBlock.block.type }}
        >
          {buildingBlock.children}
        </BlockContainerForDesignArea>
      )
    }
  }
}

export const lightUpTheDisplayDropZone = (activeBlock: ActiveBlock) =>
  activeBlock?.type === 'display' && activeBlock ? '#dcfce7' : 'transparent'

export const lightUpTheOtherDropZone = (activeBlock: ActiveBlock) =>
  activeBlock?.type !== 'display' && activeBlock ? '#dcfce7' : 'transparent'
