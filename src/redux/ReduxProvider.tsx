'use client'

import { useRef, type ReactNode } from 'react'
import { Provider } from 'react-redux'

import { makeStore, type AppStore } from './store'

interface ReduxProviderProps {
  children: ReactNode
}
export default function ReduxProvider(props: ReduxProviderProps): JSX.Element {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>
}
