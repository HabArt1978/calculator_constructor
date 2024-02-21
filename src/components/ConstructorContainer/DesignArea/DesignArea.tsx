import React, { useId } from 'react'
import { setDesignBlocks } from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { blocksIds } from '@/library/data'
import { getBlockContainerForDesignArea } from '@/library/utils'

import { FcAddImage } from 'react-icons/fc'
import styles from './designArea.module.scss'

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
      </DndContext>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

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
