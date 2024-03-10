import { HiOutlineBars2 } from 'react-icons/hi2'

import { calculateResult, clearDisplayValue } from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import styles from './equalButton.module.scss'

export default function EqualButton() {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.equalContainer}>
      <button
        className={styles.equalButton}
        onClick={() => dispatch(calculateResult())}
      >
        <HiOutlineBars2 size={18} />
      </button>
      <button
        className={styles.clearButton}
        onClick={() => dispatch(clearDisplayValue())}
      >
        C
      </button>
    </div>
  )
}
