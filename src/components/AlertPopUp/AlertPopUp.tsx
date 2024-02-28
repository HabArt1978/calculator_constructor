'use client'

import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'

import { GrAlert } from 'react-icons/gr'
import styles from './alertPopUp.module.scss'

export default function AlertPopUp() {
  const { isAlertVisible } = useStateSelectors()

  return (
    <>
      {isAlertVisible && (
        <div className={styles.backdrop}>
          <div className={styles.alertContainer}>
            <div className={styles.alertHeader}>
              <GrAlert size={20} color="#ea580c" />
              <p className={styles.alertHearerText}>ВНИМАНИЕ!</p>
            </div>

            <p className={styles.alertMessage}>
              Сборка калькулятора не закончена! Режим{' '}
              <code style={{ fontSize: '16px', fontWeight: 700 }}>Runtime</code>
              , будет доступен после завершения сборки.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
