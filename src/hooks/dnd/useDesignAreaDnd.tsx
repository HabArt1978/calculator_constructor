import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import BlockContainerForDesignArea from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/BlockContainerForDesignArea'
import { buildingBlocksData } from '@/library/data'
import {
  setActiveBlock,
  setDesignBlocks,
  setDroppableBlockPosition,
} from '@/redux/app/appSlice'
import useStateSelectors from '@/redux/app/stateSelectors'
import { ActiveBlock, DroppableBlockPosition } from '@/redux/app/types'
import { useAppDispatch } from '@/redux/reduxHooks'

export default function useDesignAreaDnd() {
  const { transferredBlocks } = useStateSelectors()
  const dispatch = useAppDispatch()

  return {
    getBlockContainerForDesignArea(activeBlockId: string | number) {
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
      return undefined
    },

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

    handleDragOver(event: DragOverEvent) {
      const { active, over } = event
      if (!over) return

      const activeId = active.id
      const overId = over.id

      if (activeId === overId) return

      const oldIndex = transferredBlocks.findIndex(
        block => block.id === activeId,
      )
      const newIndex = transferredBlocks.findIndex(block => block.id === overId)

      let dropPosition: DroppableBlockPosition = null

      if (oldIndex > newIndex) {
        dropPosition = 'top'
      } else {
        dropPosition = 'bottom'
      }

      dispatch(setDroppableBlockPosition(dropPosition))
    },

    handleDragEnd(event: DragEndEvent) {
      dispatch(setDroppableBlockPosition(null))

      const { active, over } = event
      if (!over) return

      const activeId = active.id
      const overId = over.id

      if (activeId === overId) return

      const oldIndex = transferredBlocks.findIndex(
        block => block.id === activeId,
      )
      const newIndex = transferredBlocks.findIndex(block => block.id === overId)

      const sortedTransferredBlocks = arrayMove(
        transferredBlocks,
        oldIndex,
        newIndex,
      )

      dispatch(setDesignBlocks(sortedTransferredBlocks))
    },
  }
}
