import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import {
  setActiveBlock,
  setDesignBlocks,
  setDroppableBlockPosition,
} from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { blocksIds, buildingBlocksData } from '@/library/data'
import {
  getBlockContainerForDesignArea,
  lightUpTheOtherDropZone,
} from '@/library/utils'

import InstructionForDesignBlock from './InstructionForDesignBlock/InstructionForDesignBlock'
import DropZoneForDisplayBlock from './DropZoneForDisplayBlock/DropZoneForDisplayBlock'

import type { ActiveBlock, DroppableBlockPosition } from '@/redux/app/types'

import styles from './designArea.module.scss'
import blockStyles from '../BuildingBlocks/BlockContainer/blocksContainer.module.scss'

export default function DesignArea() {
  const { transferredBlocks, activeBlock } = useStateSelectors()

  const dispatch = useAppDispatch()
  const id = useId()

  const { isOver, setNodeRef } = useDroppable({
    id: 'dropZone',
  })

  const isAllBlocksHaveBeenMoved = transferredBlocks.length < 4

  if (transferredBlocks.length === 0 && !isOver)
    return (
      <InstructionForDesignBlock
        activeBlock={activeBlock}
        setNodeRef={setNodeRef}
      />
    )

  return (
    <div className={styles.designAreaActive} ref={setNodeRef}>
      <DropZoneForDisplayBlock />

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        id={id}
      >
        <SortableContext
          items={blocksIds}
          strategy={verticalListSortingStrategy}
        >
          <div
            className={styles.dropZoneForOtherBlocks}
            style={{
              backgroundColor: isAllBlocksHaveBeenMoved
                ? lightUpTheOtherDropZone(activeBlock)
                : 'inherit',
            }}
          >
            {transferredBlocks.map(
              block =>
                block.type !== 'display' && (
                  <React.Fragment key={block.id}>
                    {getBlockContainerForDesignArea(block.id)}
                  </React.Fragment>
                ),
            )}
          </div>
        </SortableContext>

        {typeof window === 'object' &&
          activeBlock?.id &&
          createPortal(
            <DragOverlay
              className={blockStyles.blockContainer}
              style={{ opacity: 0.8 }}
            >
              {getBlockContainerForDesignArea(activeBlock.id)}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  )

  function handleDragStart(event: DragStartEvent) {
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
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const oldIndex = transferredBlocks.findIndex(block => block.id === activeId)
    const newIndex = transferredBlocks.findIndex(block => block.id === overId)

    let dropPosition: DroppableBlockPosition = null

    if (oldIndex > newIndex) {
      dropPosition = 'top'
    } else {
      dropPosition = 'bottom'
    }

    dispatch(setDroppableBlockPosition(dropPosition))
  }

  function handleDragEnd(event: DragEndEvent) {
    dispatch(setDroppableBlockPosition(null))

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const oldIndex = transferredBlocks.findIndex(block => block.id === activeId)
    const newIndex = transferredBlocks.findIndex(block => block.id === overId)

    const sortedTransferredBlocks = arrayMove(
      transferredBlocks,
      oldIndex,
      newIndex,
    )

    dispatch(setDesignBlocks(sortedTransferredBlocks))
  }
}
