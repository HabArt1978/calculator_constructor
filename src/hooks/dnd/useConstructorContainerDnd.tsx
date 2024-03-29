import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import BlockContainer from '@/components/ConstructorContainer/BuildingBlocks/BlockContainer/BlockContainer'
import { blocksIds, buildingBlocksData } from '@/library/data'
import { addDesignBlock, setActiveBlock } from '@/redux/app/appSlice'
import useStateSelectors from '@/redux/app/stateSelectors'
import { ActiveBlock, Block } from '@/redux/app/types'
import { useAppDispatch } from '@/redux/reduxHooks'

export default function useConstructorContainerDnd() {
  const { activeBlock } = useStateSelectors()
  const dispatch = useAppDispatch()

  let activeBlockContainerForBuildingBlocks: JSX.Element | undefined
  for (const buildingBlock of buildingBlocksData) {
    if (activeBlock?.id === buildingBlock.block.id) {
      activeBlockContainerForBuildingBlocks = (
        <BlockContainer
          block={{ id: activeBlock.id, type: buildingBlock.block.type }}
        >
          {buildingBlock.children}
        </BlockContainer>
      )
    }
  }

  return {
    activeBlockContainerForBuildingBlocks,

    handleDragStart(event: DragStartEvent) {
      buildingBlocksData.forEach(params => {
        if (event.active.data.current?.type === params.block.type) {
          const dragBlockId = event.active.id
          const dragBlockType = event.active.data.current.type as string

          const activeDragBlock: ActiveBlock = {
            id: dragBlockId,
            type: dragBlockType,
          }

          dispatch(setActiveBlock(activeDragBlock))
        }
      })
    },

    handleDragEnd(event: DragEndEvent) {
      dispatch(setActiveBlock(null))

      const { active, over } = event
      if (!over) return

      const activeId = active.id
      const activeType = active.data.current?.type
      const overId = over.id

      let isInvalidDropZoneId = false

      for (const blockId of blocksIds) {
        if (overId === blockId) {
          isInvalidDropZoneId = true
        }
      }

      if (isInvalidDropZoneId) return

      const droppableBlock: Block = {
        id: activeId,
        type: activeType,
      }

      dispatch(addDesignBlock(droppableBlock))
    },
  }
}
