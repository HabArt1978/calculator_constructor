import React from 'react'

import styles from './display.module.scss'

export default function Display() {
  return (
    <div className={styles.displayContainer}>
      <div className={styles.display}>0</div>
    </div>
  )
}
