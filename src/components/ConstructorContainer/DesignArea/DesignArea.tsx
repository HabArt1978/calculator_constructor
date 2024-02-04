import React from 'react'

import { FcAddImage } from 'react-icons/fc'

import styles from './designArea.module.scss'

export default function DesignArea() {
  return (
    <div className={styles.designArea}>
      <div className={styles.instruction}>
        <FcAddImage size={30} />
        <h1>
          <span>Перетащите сюда</span>
          <br />
          любой элемент
          <br />
          из левой панели
        </h1>
      </div>
    </div>
  )
}
