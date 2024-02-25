import { buildingBlocksData } from './data'
import { ActiveBlock } from '@/redux/app/types'

import BlockContainer from '@/components/ConstructorContainer/BuildingBlocks/BlockContainer/BlockContainer'
import BlockContainerForDesignArea from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/BlockContainerForDesignArea'

export function getBlockContainerForBuildingBlocks(
  activeBlockId: string | number,
) {
  const blockData = buildingBlocksData

  for (const buildingBlock of blockData) {
    if (activeBlockId === buildingBlock.block.id) {
      return (
        <BlockContainer
          block={{ id: activeBlockId, type: buildingBlock.block.type }}
        >
          {buildingBlock.children}
        </BlockContainer>
      )
    }
  }
}

export function getBlockContainerForDesignArea(activeBlockId: string | number) {
  const blockData = buildingBlocksData

  for (const buildingBlock of blockData) {
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
