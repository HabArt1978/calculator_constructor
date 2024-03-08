import React, { MouseEventHandler } from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'

import { Operator } from '@/library/calculator'

import { TbDivide } from 'react-icons/tb'
import { HiXMark } from 'react-icons/hi2'
import { HiMinus } from 'react-icons/hi2'
import { HiPlus } from 'react-icons/hi2'

import styles from './mathOperators.module.scss'
import { useAppDispatch } from '@/redux/reduxHooks'
import { setOperator } from '@/redux/app/appSlice'

const mathOperatorsParams = [
  { icon: <TbDivide />, value: Operator.Div },
  { icon: <HiXMark />, value: Operator.Mul },
  { icon: <HiMinus />, value: Operator.Sub },
  { icon: <HiPlus />, value: Operator.Sum },
]

export default function MathOperators() {
  const dispatch = useAppDispatch()

  const clickHandler = (op: Operator) => {
    dispatch(setOperator(op))
  }

  return (
    <>
      {mathOperatorsParams.map((operator, idx) => (
        <button
          className={styles.operatorButton}
          key={idx}
          onClick={() => clickHandler(operator.value)}
        >
          {operator.icon}
        </button>
      ))}
    </>
  )
}
