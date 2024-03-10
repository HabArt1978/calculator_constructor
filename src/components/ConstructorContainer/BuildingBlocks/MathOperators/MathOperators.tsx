import { HiMinus, HiPlus, HiXMark } from 'react-icons/hi2'
import { TbDivide } from 'react-icons/tb'

import { Operator } from '@/library/calculator'
import { setOperator } from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import styles from './mathOperators.module.scss'

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
