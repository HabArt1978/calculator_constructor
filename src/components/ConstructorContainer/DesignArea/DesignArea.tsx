import React from 'react'
import { useDroppable } from '@dnd-kit/core'

import { buildingBlocksData } from '@/library/data'

import { FcAddImage } from 'react-icons/fc'

import stylesBlockContainer from '../BuildingBlocks/buildingBlock.module.scss'
import styles from './designArea.module.scss'
import useStateSelectors from '@/redux/app/stateSelectors'
import { getBlockContainer } from '@/library/utils'

export default function DesignArea() {
  const { transferredBlockIds } = useStateSelectors()

  const buildingBlocks = buildingBlocksData.map(blockData => blockData.block)

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppableOne',
    //! TODO
    data: {
      accepts: buildingBlocks.filter(block => block.type !== 'display'),
    },
  })

  return (
    <div
      className={styles.designArea}
      ref={setNodeRef}
      style={isOver ? { backgroundColor: '#fda4af', border: 'none' } : {}}
    >
      {!isOver && (
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
      )}

      {isOver && <div className={stylesBlockContainer.blockContainer} />}

      {transferredBlockIds.length !== 0 &&
        transferredBlockIds.map(id => {
          for (const block of buildingBlocks) {
            if (id === block.id) {
              return (
                <React.Fragment key={block.id}>
                  {getBlockContainer(block.id, buildingBlocksData)}
                </React.Fragment>
              )
            }
          }
        })}
    </div>
  )
}
