import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import { setActiveBlock, setDesignBlocks } from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  DndContext,
  DragEndEvent,
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
import { getBlockContainerForDesignArea } from '@/library/utils'

import type { ActiveBlock } from '@/redux/app/types'

import { FcAddImage } from 'react-icons/fc'
import styles from './designArea.module.scss'
import blockStyles from '../BuildingBlocks/BlockContainer/blocksContainer.module.scss'

export default function DesignArea() {
  const { transferredBlocks, activeBlock } = useStateSelectors()

  const dispatch = useAppDispatch()
  const id = useId()

  const { isOver, setNodeRef } = useDroppable({
    id: 'dropZone',
  })

  const lightUpTheDisplayDropZone = () =>
    activeBlock?.type === 'display' && activeBlock ? '#dcfce7' : 'transparent'

  const lightUpTheOtherDropZone = () =>
    activeBlock?.type !== 'display' && activeBlock ? '#dcfce7' : 'transparent'

  if (transferredBlocks.length === 0 && !isOver)
    return (
      <div
        className={styles.designArea}
        ref={setNodeRef}
        style={activeBlock ? { backgroundColor: '#f0f9ff' } : {}}
      >
        <div className={styles.instruction}>
          <FcAddImage size={30} />
          <h1>
            <span>Перетащите сюда</span>
            <br />
            любой элемент
            <br />
            из левой панели
          </h1>
        </div>
      </div>
    )

  return (
    <div className={styles.designAreaActive} ref={setNodeRef}>
      <div style={{ cursor: 'not-allowed' }}>
        <div
          className={styles.dropZoneForDisplayBlock}
          style={{
            backgroundColor: lightUpTheDisplayDropZone(),
          }}
        >
          {transferredBlocks.map(
            block =>
              block.type === 'display' && (
                <div key={block.id}>
                  {getBlockContainerForDesignArea(block.id)}
                </div>
              ),
          )}
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
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
              backgroundColor: lightUpTheOtherDropZone(),
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

  function handleDragEnd(event: DragEndEvent) {
    dispatch(setActiveBlock(null))

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
