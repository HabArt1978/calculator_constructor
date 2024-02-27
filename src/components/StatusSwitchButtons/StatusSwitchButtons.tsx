'use client'

import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useAppDispatch } from '@/redux/reduxHooks'
import { setActiveStatus } from '@/redux/app/appSlice'

import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { PiBracketsAngleBold } from 'react-icons/pi'

import styles from '@/components/statusSwitchButtons/statusSwitchButtons.module.scss'

export default function StatusSwitch() {
  const { activeStatus } = useStateSelectors()

  const dispatch = useAppDispatch()

  return (
    <div className={styles.statusSwitchButtons}>
      <button
        className={setStylesRuntimeButton().baseStyle}
        onClick={handleClickRuntimeButton}
      >
        <MdOutlineRemoveRedEye
          size="22px"
          color={setStylesRuntimeButton()?.iconColor}
        />
        <span>Runtime</span>
      </button>

      <button
        className={setStylesConstructorButton().baseStyle}
        onClick={handleClickConstructorButton}
      >
        <PiBracketsAngleBold
          size="18px"
          color={setStylesConstructorButton()?.iconColor}
        />
        <span>Constructor</span>
      </button>
    </div>
  )

  function handleClickRuntimeButton() {
    if (activeStatus === 'runtime') {
      return
    }

    dispatch(setActiveStatus('runtime'))
  }

  function handleClickConstructorButton() {
    if (activeStatus === 'constructor') {
      return
    }

    dispatch(setActiveStatus('constructor'))
  }

  function setStylesRuntimeButton() {
    if (activeStatus === 'runtime') {
      return {
        baseStyle: styles['runtimeBtn--active'],
        iconColor: '#6366f1',
      }
    }

    return {
      baseStyle: styles.runtimeBtn,
      iconColor: '#4b5563',
    }
  }

  function setStylesConstructorButton() {
    if (activeStatus === 'constructor') {
      return {
        baseStyle: styles['constructorBtn--active'],
        iconColor: '#6366f1',
      }
    }

    return {
      baseStyle: styles.constructorBtn,
      iconColor: '#4b5563',
    }
  }
}
