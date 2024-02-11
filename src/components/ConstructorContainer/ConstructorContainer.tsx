'use client'

import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { setActiveBlock } from '@/redux/app/appSlice'

import { DndContext, DragStartEvent, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import BuildingBlocks from './BuildingBlocks/BuildingBlocks'
import DesignArea from './DesignArea/DesignArea'
import BlockContainer from './BuildingBlocks/BlockContainer/BlockContainer'

import { blockParams } from '@/library/data'

import type { ActiveBlock } from '@/redux/app/types'

import styles from './constructorContainer.module.scss'

export default function ConstructorContainer() {
  const activeBlock = useAppSelector(({ appState }) => appState.activeBlock)

  const dispatch = useAppDispatch()
  const id = useId()

  const blocksId = blockParams.map(block => block.block.id)

  return (
    <DndContext onDragStart={onDragStart} id={id}>
      <div className={styles.constructorContainer}>
        <BuildingBlocks />

        <SortableContext items={blocksId}>
          <DesignArea />
        </SortableContext>
      </div>

      {typeof window === 'object' &&
        createPortal(
          <DragOverlay style={{ opacity: 0.8 }}>
            {getActiveBlockContainer()}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )

  function onDragStart(event: DragStartEvent) {
    blockParams.forEach(params => {
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

  function getActiveBlockContainer() {
    for (const block of blockParams) {
      if (activeBlock?.id === block.block.id) {
        return (
          <BlockContainer
            block={{ id: activeBlock.id, type: block.block.type }}
          >
            {block.children}
          </BlockContainer>
        )
      }
    }
  }
}
