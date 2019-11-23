import { useReducer } from 'react'

type State = symbol
type NoopFunction = () => void

const reducer = (): State => Symbol()
const initialState: State = Symbol()

export function useForceUpdate(): NoopFunction {
  const [, forceUpdate] = useReducer(reducer, initialState)

  return forceUpdate as NoopFunction
}
