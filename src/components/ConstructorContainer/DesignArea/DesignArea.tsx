import React, { useId, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import useDesignAreaDnd from '@/hooks/dnd/useDesignAreaDnd'
import { blocksIds } from '@/library/data'
import useStateSelectors from '@/redux/app/stateSelectors'

import type { Block } from '@/redux/app/types'

import InstructionForDesignBlock from './InstructionForDesignBlock/InstructionForDesignBlock'
import DropZoneForDisplayBlock from './DropZoneForDisplayBlock/DropZoneForDisplayBlock'

import styles from './designArea.module.scss'
import displayBlockStyles from './DropZoneForDisplayBlock/dropZoneForDisplayBlock.module.scss'
import blockStyles from '../BuildingBlocks/BlockContainer/blocksContainer.module.scss'

export default function DesignArea() {
  const { transferredBlocks, activeBlock, activeStatus } = useStateSelectors()
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    getBlockContainerForDesignArea,
  } = useDesignAreaDnd()

  const id = useId()

  const { isOver, setNodeRef } = useDroppable({
    id: 'dropZone',
  })

  const displayBlock = useMemo<Block | undefined>(
    () => transferredBlocks.find(b => b.type === 'display'),
    [transferredBlocks],
  )

  const isAllBlocksHaveBeenMoved = transferredBlocks.length < 4
  const lightUpTheDisplayDropZone =
    activeBlock?.type === 'display' && activeBlock ? '#dcfce7' : 'transparent'
  const lightUpTheOtherDropZone =
    activeBlock?.type !== 'display' && activeBlock ? '#dcfce7' : 'transparent'

  if (transferredBlocks.length === 0 && !isOver)
    return (
      <InstructionForDesignBlock
        activeBlock={activeBlock}
        setNodeRef={setNodeRef}
      />
    )

  return (
    <div className={styles.designAreaActive} ref={setNodeRef}>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        id={id}
      >
        <div
          style={
            activeStatus === 'runtime'
              ? { cursor: 'auto' }
              : { cursor: 'not-allowed' }
          }
        >
          <div
            className={displayBlockStyles.dropZoneForDisplayBlock}
            style={{
              backgroundColor: lightUpTheDisplayDropZone,
            }}
          >
            {displayBlock && <DropZoneForDisplayBlock block={displayBlock} />}
          </div>
        </div>
      </DndContext>

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
                ? lightUpTheOtherDropZone
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
}
