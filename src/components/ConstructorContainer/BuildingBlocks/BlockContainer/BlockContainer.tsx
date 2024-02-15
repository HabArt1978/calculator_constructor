import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { BlockContainerProp } from '@/redux/app/types'

import styles from './blocksContainer.module.scss'

export default function BlockContainer({
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
      className={styles.blockContainer}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}
