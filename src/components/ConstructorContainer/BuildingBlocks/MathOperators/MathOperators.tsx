import React from 'react'

import { TbDivide } from 'react-icons/tb'
import { HiXMark } from 'react-icons/hi2'
import { HiMinus } from 'react-icons/hi2'
import { HiPlus } from 'react-icons/hi2'

import styles from './mathOperators.module.scss'

const mathOperatorsIcon = [
  { icon: <TbDivide /> },
  { icon: <HiXMark /> },
  { icon: <HiMinus /> },
  { icon: <HiPlus /> },
]

export default function MathOperators() {
  return (
    <div className={styles.mathOperatorsContainer}>
      {mathOperatorsIcon.map((operator, idx) => (
        <React.Fragment key={idx}>
          <button className={styles.operatorButton}>{operator.icon}</button>
        </React.Fragment>
      ))}
    </div>
  )
}
