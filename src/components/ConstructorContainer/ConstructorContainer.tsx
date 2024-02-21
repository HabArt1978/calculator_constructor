'use client'

import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch } from '@/redux/reduxHooks'
import { addDesignBlock, setActiveBlock } from '@/redux/app/appSlice'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
} from '@dnd-kit/core'

import BuildingBlocks from './BuildingBlocks/BuildingBlocks'
import DesignArea from './DesignArea/DesignArea'

import { buildingBlocksData, blocksIds } from '@/library/data'
import { getBlockContainerForBuildingBlocks } from '@/library/utils'

import type { ActiveBlock, Block } from '@/redux/app/types'

import styles from './constructorContainer.module.scss'

export default function ConstructorContainer() {
  const { activeBlock } = useStateSelectors()

  const dispatch = useAppDispatch()
  const id = useId()

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} id={id}>
      <div className={styles.constructorContainer}>
        <BuildingBlocks />

        <DesignArea />
      </div>

      {typeof window === 'object' &&
        activeBlock?.id &&
        createPortal(
          <DragOverlay style={{ opacity: 0.8 }}>
            {getBlockContainerForBuildingBlocks(activeBlock.id)}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
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
  }
}
