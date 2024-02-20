import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import useStateSelectors from '@/redux/app/stateSelectors'

import { buildingBlocksData, blocksIds } from '@/library/data'
import { getBlockContainerForDesignArea } from '@/library/utils'

import { FcAddImage } from 'react-icons/fc'

import styles from './designArea.module.scss'

export default function DesignArea() {
  const { transferredBlocks, activeBlock } = useStateSelectors()

  const buildingBlocks = buildingBlocksData.map(blockData => blockData.block)

  const { isOver, setNodeRef } = useDroppable({
    id: 'dropZone',
    //! TODO
    data: {
      accepts: buildingBlocks.filter(block => block.type !== 'display'),
    },
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

      <SortableContext items={blocksIds}>
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
    </div>
  )
}
