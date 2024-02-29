import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  getBlockContainerForDesignArea,
  lightUpTheDisplayDropZone,
} from '@/library/utils'

import styles from './dropZoneForDisplayBlock.module.scss'

export default function DropZoneForDisplayBlock() {
  const { transferredBlocks, activeBlock, activeStatus } = useStateSelectors()

  return (
    <div
      style={
        activeStatus === 'runtime'
          ? { cursor: 'auto' }
          : { cursor: 'not-allowed' }
      }
    >
      <div
        className={styles.dropZoneForDisplayBlock}
        style={{
          backgroundColor: lightUpTheDisplayDropZone(activeBlock),
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
  )
}
