import React from 'react'

import { ActiveBlock } from '@/redux/app/types'

import { FcAddImage } from 'react-icons/fc'
import styles from './InstructionForDesignBlock.module.scss'

interface InstructionForDesignBlockProps {
  setNodeRef: (element: HTMLElement | null) => void
  activeBlock: ActiveBlock
}

export default function InstructionForDesignBlock({
  setNodeRef,
  activeBlock,
}: InstructionForDesignBlockProps) {
  return (
    <div
      className={styles.designArea}
      ref={setNodeRef}
      style={activeBlock ? { backgroundColor: '#f0f9ff' } : {}}
    >
      <div className={styles.instruction}>
        <FcAddImage size={30} />
        <h1>
          <span>Перетащите сюда</span>
          <br />
          любой элемент
          <br />
          из левой панели
        </h1>
      </div>
    </div>
  )
}
