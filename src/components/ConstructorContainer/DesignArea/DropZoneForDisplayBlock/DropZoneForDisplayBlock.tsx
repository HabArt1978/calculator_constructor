import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'

import {
  getBlockContainerForDesignArea,
  lightUpTheDisplayDropZone,
} from '@/library/utils'

import styles from './dropZoneForDisplayBlock.module.scss'

export default function DropZoneForDisplayBlock() {
  const { transferredBlocks, activeBlock } = useStateSelectors()

  return (
    <div style={{ cursor: 'not-allowed' }}>
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
