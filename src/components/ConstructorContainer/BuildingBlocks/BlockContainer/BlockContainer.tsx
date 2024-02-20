import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useDraggable } from '@dnd-kit/core'

import type { BlockContainerProp } from '@/redux/app/types'

import styles from './blocksContainer.module.scss'

export default function BlockContainer({
  block,
  children,
}: BlockContainerProp) {
  const { transferredBlocks } = useStateSelectors()

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: block.id,
    data: {
      type: block.type,
      block,
    },
  })

  function isDisabledContainer() {
    for (const transferBlock of transferredBlocks) {
      if (transferredBlocks.length === 0) return

      if (transferBlock.type === block.type) {
        return true
      } else {
        false
      }
    }
  }

  return (
    <div style={!isDisabledContainer() ? {} : { cursor: 'not-allowed' }}>
      <div
        className={
          !isDisabledContainer()
            ? styles.blockContainer
            : styles.blockContainerDisabled
        }
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <div
          className={styles.unitInnerContainer}
          style={
            block.type === ('display' || 'equal')
              ? { justifyContent: 'center', alignItems: 'center' }
              : block.type === 'operators'
                ? { justifyContent: 'space-between', alignItems: 'center' }
                : block.type === 'numeric'
                  ? { flexWrap: 'wrap', justifyContent: 'space-between' }
                  : {}
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}
