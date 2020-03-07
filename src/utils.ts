import { useReducer } from 'react'

type ForceUpdate = () => void

const initialArg = Symbol()
const reducer = (): symbol => Symbol()

export function useForceUpdate(): ForceUpdate {
  const [, forceUpdate] = useReducer(reducer, initialArg)

  return forceUpdate
}
