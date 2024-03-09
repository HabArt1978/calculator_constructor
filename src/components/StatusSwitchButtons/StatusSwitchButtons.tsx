'use client'

import React from 'react'
import useStateSelectors from '@/redux/app/stateSelectors'
import { useAppDispatch } from '@/redux/reduxHooks'
import {
  setActiveStatus,
  deleteDesignBlocks,
  setActiveBlock,
} from '@/redux/app/appSlice'

import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { PiBracketsAngleBold } from 'react-icons/pi'
import { MdDeleteForever } from 'react-icons/md'

import styles from '@/components/statusSwitchButtons/statusSwitchButtons.module.scss'
import useAlert from '@/hooks/useAlert'

export default function StatusSwitch() {
  const { activeStatus, transferredBlocks } = useStateSelectors()

  const dispatch = useAppDispatch()

  const { showFor: showAlertFor } = useAlert()

  const isDesignIncomplete = transferredBlocks.length < 4

  const isNoBlocksMoved = transferredBlocks.length === 0

  const isStatusRuntime = activeStatus === 'runtime'

  const isStatusConstructor = activeStatus === 'constructor'

  const isShowDeleteButton = isNoBlocksMoved || isStatusRuntime

  return (
    <div className={styles.containerForStatusButtons}>
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

      <button
        className={styles.deleteButton}
        style={isShowDeleteButton ? { display: 'none' } : {}}
        onClick={deleteDesignAreaBlocks}
      >
        <MdDeleteForever size={30} color="inherit" />
      </button>
    </div>
  )

  function handleClickRuntimeButton() {
    if (isStatusRuntime) {
      return
    }

    if (isDesignIncomplete) {
      return showAlertFor(5)
    }

    dispatch(setActiveStatus('runtime'))
  }

  function handleClickConstructorButton() {
    if (isStatusConstructor) {
      return
    }

    dispatch(setActiveStatus('constructor'))
  }

  function setStylesRuntimeButton() {
    if (isStatusRuntime) {
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
    if (isStatusConstructor) {
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

  function deleteDesignAreaBlocks() {
    dispatch(deleteDesignBlocks())
    dispatch(setActiveBlock(null))
  }
}
