import { Fragment } from 'react'

import { buildingBlocksData } from '@/library/data'
import useStateSelectors from '@/redux/app/stateSelectors'

import BlockContainer from './BlockContainer/BlockContainer'
import styles from './buildingBlock.module.scss'

export default function BuildingBlocks() {
  const { activeStatus } = useStateSelectors()

  const isHiddenBlock = activeStatus === 'runtime'

  return (
    <div
      className={styles.buildingBlocks}
      style={isHiddenBlock ? { display: 'none' } : {}}
    >
      {buildingBlocksData.map(blockData => (
        <Fragment key={blockData.block.id}>
          <BlockContainer
            block={{ id: blockData.block.id, type: blockData.block.type }}
          >
            {blockData.children}
          </BlockContainer>
        </Fragment>
      ))}
    </div>
  )
}
