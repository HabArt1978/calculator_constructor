import { useMemo } from 'react'
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

  const isDisabledContainer = useMemo<boolean>(
    () => !!transferredBlocks.find(b => b.type === block.type),
    [block.type, transferredBlocks],
  )

  return (
    <div style={isDisabledContainer ? { cursor: 'not-allowed' } : {}}>
      <div
        className={
          isDisabledContainer
            ? styles.blockContainerDisabled
            : styles.blockContainer
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
