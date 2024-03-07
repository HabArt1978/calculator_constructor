import { useMemo } from 'react'

import useStateSelectors from '@/redux/app/stateSelectors'

import styles from './display.module.scss'

export default function Display() {
  const { firstDigit, secondDigit } = useStateSelectors()

  const displayValue = useMemo<string>(
    () => secondDigit?.toString() ?? firstDigit?.toString() ?? '',
    [firstDigit, secondDigit],
  )

  return <div className={styles.display}>{displayValue}</div>
}
