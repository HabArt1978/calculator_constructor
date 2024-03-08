import React from 'react'

import { calculate } from '@/library/calculator'

import { HiOutlineBars2 } from 'react-icons/hi2'

import styles from './equalButton.module.scss'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useAppDispatch } from '@/redux/reduxHooks'
import {
  setFirstDigit,
  setOperator,
  setSecondDigit,
} from '@/redux/app/appSlice'

export default function EqualButton() {
  const { firstDigit, operator, secondDigit } = useStateSelectors()
  const dispatch = useAppDispatch()

  const calculateResult = () => {
    if (operator === null) return

    const result = calculate(Number(firstDigit), Number(secondDigit), operator)

    dispatch(setFirstDigit(String(result)))
    dispatch(setOperator(null))
    dispatch(setSecondDigit(null))
  }

  return (
    <button className={styles.equalButton} onClick={calculateResult}>
      <HiOutlineBars2 size={18} />
    </button>
  )
}
