'use client'

import { GrAlert } from 'react-icons/gr'

import useAlert from '@/hooks/useAlert'

import styles from './alertPopUp.module.scss'

export default function AlertPopUp() {
  const { isVisible, close } = useAlert()

  return !isVisible ? undefined : (
    <div className={styles.backdrop}>
      <div className={styles.alertContainer}>
        <div className={styles.alertHeader}>
          <GrAlert size={20} color="inherit" />
          <p className={styles.alertHearerText}>Внимание!</p>
        </div>

        <p className={styles.alertMessage}>
          Сборка калькулятора не закончена! Режим <code>Runtime</code>, будет
          доступен после завершения сборки.
        </p>

        <button onClick={close}>OK</button>
      </div>
    </div>
  )
}
