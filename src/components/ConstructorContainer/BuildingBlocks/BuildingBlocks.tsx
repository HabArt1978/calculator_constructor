import React from 'react'

import BlockContainer from './BlockContainer/BlockContainer'
import { buildingBlocksData } from '@/library/data'

import styles from './buildingBlock.module.scss'

export default function BuildingBlocks() {
  return (
    <div className={styles.buildingBlocks}>
      {buildingBlocksData.map(blockData => (
        <React.Fragment key={blockData.block.id}>
          <BlockContainer
            block={{ id: blockData.block.id, type: blockData.block.type }}
          >
            {blockData.children}
          </BlockContainer>
        </React.Fragment>
      ))}
    </div>
  )
}
