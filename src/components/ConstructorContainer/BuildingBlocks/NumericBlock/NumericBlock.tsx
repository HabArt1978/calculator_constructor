import React, { type MouseEventHandler } from 'react'

import styles from './numericBlock.module.scss'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { setFirstDigit, setSecondDigit } from '@/redux/app/appSlice'

const buttonValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']

export default function NumericBlock() {
  const { operator } = useAppSelector(({ appState }) => appState)
  const dispatch = useAppDispatch()

  const clickHandler: MouseEventHandler<HTMLButtonElement> = event => {
    const buttonValue = event.currentTarget.textContent

    if (!operator) {
      dispatch(setFirstDigit(buttonValue))
    } else {
      dispatch(setSecondDigit(buttonValue))
    }
  }

  return (
    <>
      {buttonValues.map((value, idx) => (
        <React.Fragment key={idx}>
          {value !== '0' ? (
            <button className={styles.numberedButton} onClick={clickHandler}>
              {value}
            </button>
          ) : (
            <button
              className={styles.numberedButtonZero}
              onClick={clickHandler}
            >
              {value}
            </button>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
