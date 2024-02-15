import BlockContainer from '@/components/ConstructorContainer/BuildingBlocks/BlockContainer/BlockContainer'
import { BlockContainerProp } from '@/redux/app/types'

export function getBlockContainer(
  activeBlockId: string | number,
  blockData: BlockContainerProp[],
) {
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
