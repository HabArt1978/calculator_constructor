import React from 'react'
import styles from './blockDropPositionIndicator.module.scss'
import useStateSelectors from '@/redux/app/stateSelectors'

export default function BlockDropPositionIndicator() {
  const { droppableBlockPosition } = useStateSelectors()

  if (droppableBlockPosition === null) return

  const lineClasses = [
    styles.indicatorLine,
    droppableBlockPosition === 'top'
      ? styles['indicatorLine--top']
      : styles['indicatorLine--bottom'],
  ]

  return (
    <div className={lineClasses.join(' ')}>
      <div className={styles.triangleLeft} />
      <div className={styles.triangleRight} />
    </div>
  )
}
