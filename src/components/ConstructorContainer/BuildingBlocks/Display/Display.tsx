import { useMemo } from 'react'

import useStateSelectors from '@/redux/app/stateSelectors'

import styles from './display.module.scss'

export default function Display() {
  const { firstDigit, secondDigit, operator, activeStatus } =
    useStateSelectors()

  const displayValue = useMemo<string>(() => {
    if (firstDigit && !operator) {
      return firstDigit as string
    } else if (firstDigit && operator) {
      return secondDigit as string
    } else {
      return '0'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDigit, secondDigit])

  return <div className={styles.display}>{displayValue}</div>
}
