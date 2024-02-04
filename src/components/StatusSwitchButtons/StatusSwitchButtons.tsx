import React from 'react'

import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { TbBracketsAngle } from 'react-icons/tb'

import styles from '@/components/statusSwitchButtons/statusSwitchButtons.module.scss'

export default function StatusSwitch() {
  return (
    <div className={styles.statusSwitchButtons}>
      <button className={styles.runtimeBtn}>
        <MdOutlineRemoveRedEye size="22px" color="#4b5563" />
        <span>Runtime</span>
      </button>

      <button className={styles.constructorBtn}>
        <TbBracketsAngle size="16px" color="#4b5563" />
        <span>Constructor</span>
      </button>
    </div>
  )
}
