import React from 'react'

import BlockContainer from './BlockContainer/BlockContainer'
import { buildingBlocksData } from '@/library/data'

import styles from './buildingBlock.module.scss'
import useStateSelectors from '@/redux/app/stateSelectors'

export default function BuildingBlocks() {
  const { activeStatus } = useStateSelectors()

  const isHiddenBlock = activeStatus === 'runtime'

  return (
    <div
      className={styles.buildingBlocks}
      style={isHiddenBlock ? { display: 'none' } : {}}
    >
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
