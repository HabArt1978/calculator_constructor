import React from 'react'

import Display from './Display/Display'
import MathOperators from './MathOperators/MathOperators'

import styles from '@/components/ConstructorContainer/BuildingBlocks/buildingBlock.module.scss'
import NumericBlock from './NumericBlock/NumericBlock'
import EqualButton from './EqualButton/EqualButton'

export default function BuildingBlocks() {
  return (
    <div className={styles.buildingBlocks}>
      <Display />
      <MathOperators />
      <NumericBlock />
      <EqualButton />
    </div>
  )
}
