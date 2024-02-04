import React from 'react'

import { HiOutlineBars2 } from 'react-icons/hi2'

import styles from './equalButton.module.scss'

export default function EqualButton() {
  return (
    <div className={styles.equalButtonContainer}>
      <button className={styles.equalButton}>
        <HiOutlineBars2 size={18} />
      </button>
    </div>
  )
}
