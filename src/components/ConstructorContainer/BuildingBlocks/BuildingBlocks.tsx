import React from 'react'

import BlockContainer from './BlockContainer/BlockContainer'
import { blockParams } from '@/library/data'

import styles from './buildingBlock.module.scss'

export default function BuildingBlocks() {
  return (
    <div className={styles.buildingBlocks}>
      {blockParams.map(params => (
        <React.Fragment key={params.block.id}>
          <BlockContainer
            block={{ id: params.block.id, type: params.block.type }}
          >
            {params.children}
          </BlockContainer>
        </React.Fragment>
      ))}
    </div>
  )
}
