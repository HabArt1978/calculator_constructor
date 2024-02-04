import React from 'react'
import BuildingBlocks from './BuildingBlocks/BuildingBlocks'
import DesignArea from './DesignArea/DesignArea'

import styles from './constructorContainer.module.scss'

export default function ConstructorContainer() {
  return (
    <div className={styles.constructorContainer}>
      <BuildingBlocks />
      <DesignArea />
    </div>
  )
}
