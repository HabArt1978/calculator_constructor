import { useMemo } from 'react'
import { IoBackspaceOutline } from 'react-icons/io5'

import { dropLastActiveDigit } from '@/redux/app/appSlice'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useAppDispatch } from '@/redux/reduxHooks'

import styles from './display.module.scss'

export default function Display() {
  const { firstNumber, secondNumber } = useStateSelectors()
  const dispatch = useAppDispatch()

  const displayValue = useMemo<string>(() => {
    const result: number = Number(secondNumber) || Number(firstNumber) || 0
    return new Intl.NumberFormat('ru').format(result)
  }, [firstNumber, secondNumber])

  const fontSize = useMemo<string>(() => {
    let fontSize = ''

    const isFirstBreakPoint =
      displayValue.length > 6 && displayValue.length <= 10
    const isSecondBreakPoint = displayValue.length > 10

    fontSize = isFirstBreakPoint ? '26px' : isSecondBreakPoint ? '17px' : ''

    return fontSize
  }, [displayValue])

  return (
    <div className={styles.display} style={{ fontSize }}>
      {displayValue}
      <button
        className={styles.backButton}
        onClick={() => dispatch(dropLastActiveDigit())}
      >
        <IoBackspaceOutline size={20} />
      </button>
    </div>
  )
}
