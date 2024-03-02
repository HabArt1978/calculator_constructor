'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import React, { useId } from 'react'
import { createPortal } from 'react-dom'

import useConstructorContainerDnd from '@/hooks/dnd/useConstructorContainerDnd'
import useStateSelectors from '@/redux/app/stateSelectors'

import BuildingBlocks from './BuildingBlocks/BuildingBlocks'
import DesignArea from './DesignArea/DesignArea'
import styles from './constructorContainer.module.scss'

export default function ConstructorContainer() {
  const { activeBlock, activeStatus } = useStateSelectors()
  const { handleDragStart, handleDragEnd, blockContainerForBuildingBlocks } =
    useConstructorContainerDnd()

  const id = useId()

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} id={id}>
      <div
        className={styles.constructorContainer}
        style={activeStatus === 'runtime' ? { justifyContent: 'center' } : {}}
      >
        <BuildingBlocks />

        <DesignArea />
      </div>

      {typeof window === 'object' &&
        activeBlock?.id &&
        createPortal(
          <DragOverlay style={{ opacity: 0.8 }}>
            {blockContainerForBuildingBlocks}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )
}
