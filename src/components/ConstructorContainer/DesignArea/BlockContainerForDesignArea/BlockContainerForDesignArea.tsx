import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useSortable } from '@dnd-kit/sortable'

import BlockDropPositionIndicator from '../BlockDropPositionIndicator/BlockDropPositionIndicator'

import type { BlockContainerProp } from '@/redux/app/types'

import styles from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/blockContainerForDesignArea.module.scss'

export default function BlockContainerForDesignArea({
  block,
  children,
}: BlockContainerProp) {
  const { activeStatus } = useStateSelectors()

  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: block.id,
    data: {
      type: block.type,
      block,
    },
  })

  const blockContainerStyles = [
    styles.blockContainerForDesignArea,
    activeStatus === 'runtime' && styles['blockContainerForDesignArea--active'],
  ]

  const unitInnerContainerStyles = [
    styles.unitInnerContainerForDesignArea,
    activeStatus === 'runtime' &&
      styles['unitInnerContainerForDesignArea--active'],
  ]

  return (
    <div
      className={blockContainerStyles.join(' ')}
      ref={activeStatus === 'constructor' ? setNodeRef : null}
      {...listeners}
      {...attributes}
    >
      {isOver && <BlockDropPositionIndicator />}

      <div
        className={unitInnerContainerStyles.join(' ')}
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
  )
}
