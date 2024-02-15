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
import { SortableContext } from '@dnd-kit/sortable'

import BuildingBlocks from './BuildingBlocks/BuildingBlocks'
import DesignArea from './DesignArea/DesignArea'
import BlockContainer from './BuildingBlocks/BlockContainer/BlockContainer'

import { buildingBlocksData } from '@/library/data'

import type { ActiveBlock, BlockContainerProp } from '@/redux/app/types'

import styles from './constructorContainer.module.scss'
import { getBlockContainer } from '@/library/utils'

//! === END IMPORT ===

export default function ConstructorContainer() {
  const { activeBlock, transferredBlockIds } = useStateSelectors()

  if (transferredBlockIds.length !== 0) {
    console.log('Design Blocks :', transferredBlockIds)
  }

  const dispatch = useAppDispatch()
  const id = useId()

  const blocksIds = buildingBlocksData.map(block => block.block.id)

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} id={id}>
      <div className={styles.constructorContainer}>
        <BuildingBlocks />

        <SortableContext items={blocksIds}>
          <DesignArea />
        </SortableContext>
      </div>

      {typeof window === 'object' &&
        activeBlock?.id &&
        createPortal(
          <DragOverlay style={{ opacity: 0.8 }}>
            {getBlockContainer(activeBlock.id, buildingBlocksData)}
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

    return
  }

  function handleDragEnd(event: DragEndEvent) {
    dispatch(setActiveBlock(null))

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    let isInvalidDropZoneId = false

    for (const blockId of blocksIds) {
      if (overId === blockId) {
        isInvalidDropZoneId = true
      }
    }

    if (isInvalidDropZoneId) return

    console.log('handleDragEnd() :', { ActiveID: activeId, OverID: overId })

    dispatch(addDesignBlock(activeId))
  }
}
