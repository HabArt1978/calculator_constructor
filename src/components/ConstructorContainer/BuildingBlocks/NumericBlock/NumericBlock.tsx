import React from 'react'

import styles from './numericBlock.module.scss'

const buttonValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']

export default function NumericBlock() {
  return (
    <>
      {buttonValues.map((value, idx) => (
        <React.Fragment key={idx}>
          {value !== '0' ? (
            <button className={styles.numberedButton}>{value}</button>
          ) : (
            <button className={styles.numberedButtonZero}>{value}</button>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
