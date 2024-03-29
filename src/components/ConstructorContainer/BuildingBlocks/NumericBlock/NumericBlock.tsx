import { Fragment } from 'react'
import { PiPlusMinus } from 'react-icons/pi'

import { appendActiveDigit, invertActiveNumber } from '@/redux/app/appSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import styles from './numericBlock.module.scss'

const buttonValues: Array<number | '+/-' | '.'> = [
  7,
  8,
  9,
  4,
  5,
  6,
  1,
  2,
  3,
  '+/-',
  0,
  '.',
]

export default function NumericBlock() {
  const dispatch = useAppDispatch()

  return (
    <>
      {buttonValues.map((value, idx) => (
        <Fragment key={idx}>
          {value !== '+/-' ? (
            <button
              className={styles.numberedButton}
              onClick={() => dispatch(appendActiveDigit(value))}
              style={value === '.' ? { fontSize: '30px' } : {}}
            >
              {value}
            </button>
          ) : (
            <button
              className={styles.numberedButton}
              onClick={() => dispatch(invertActiveNumber())}
            >
              <PiPlusMinus size={18} />
            </button>
          )}
        </Fragment>
      ))}
    </>
  )
}
