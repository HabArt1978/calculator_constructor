import React from 'react'
import { useSortable } from '@dnd-kit/sortable'

import type { BlockContainerProp } from '@/redux/app/types'

import styles from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/blockContainerForDesignArea.module.scss'

export default function BlockContainerForDesignArea({
  block,
  children,
}: BlockContainerProp) {
  const { attributes, listeners, setNodeRef, isOver } = useSortable({
    id: block.id,
    data: {
      type: block.type,
      block,
    },
  })

  const style = {
    backgroundColor: isOver ? '#fda4af' : '',
  }

  return (
    <div
      className={styles.blockContainerForDesignArea}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div
        className={styles.unitInnerContainerForDesignArea}
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
