import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { buildingBlocksData } from '@/library/data'
import {
  setActiveBlock,
  setDesignBlocks,
  setDroppableBlockPosition,
} from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'
import { ActiveBlock, DroppableBlockPosition } from '@/redux/app/types'
import useStateSelectors from '@/redux/app/stateSelectors'
import BlockContainerForDesignArea from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/BlockContainerForDesignArea'

export default function useDesignAreaDnd() {
  const { transferredBlocks, activeBlock } = useStateSelectors()
  const dispatch = useAppDispatch()

  let blockContainerForDesignArea: JSX.Element | undefined
  for (const buildingBlock of buildingBlocksData) {
    if (activeBlock?.id === buildingBlock.block.id) {
      blockContainerForDesignArea = (
        <BlockContainerForDesignArea
          block={{ id: activeBlock.id, type: buildingBlock.block.type }}
        >
          {buildingBlock.children}
        </BlockContainerForDesignArea>
      )
    }
  }

  return {
    blockContainerForDesignArea,

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
