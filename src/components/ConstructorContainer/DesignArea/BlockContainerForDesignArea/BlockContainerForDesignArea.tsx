import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { BlockContainerProp } from '@/redux/app/types'

import styles from '@/components/ConstructorContainer/DesignArea/BlockContainerForDesignArea/blockContainerForDesignArea.module.scss'

export default function BlockContainerForDesignArea({
  block,
  children,
}: BlockContainerProp) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: block.id,
      data: {
        type: block.type,
        block,
      },
    })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      className={styles.blockContainerForDesignArea}
      ref={setNodeRef}
      style={style}
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
