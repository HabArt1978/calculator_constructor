import BlockContainer from '@/components/ConstructorContainer/BuildingBlocks/BlockContainer/BlockContainer'

import { buildingBlocksData } from './data'
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
