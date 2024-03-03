import { setIsAlertVisible } from '@/redux/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

let closeDelay: NodeJS.Timeout

export default function useAlert() {
  const isVisible = useAppSelector(({ appState }) => appState.isAlertVisible)
  const dispatch = useAppDispatch()

  const show = () => dispatch(setIsAlertVisible(true))
  const close = () => {
    dispatch(setIsAlertVisible(false))
    clearTimeout(closeDelay)
  }
  const showFor = (seconds: number) => {
    show()
    closeDelay = setTimeout(close, seconds * 1000)
  }

  return { isVisible, show, showFor, close }
}
