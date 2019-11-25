import { useReducer } from 'react'

type State = symbol
type NoopFunction = () => void

const initialState: State = Symbol()
const reducer = (): State => Symbol()

export function useForceUpdate(): NoopFunction {
  const [, forceUpdate] = useReducer(reducer, initialState)

  return forceUpdate as NoopFunction
}
