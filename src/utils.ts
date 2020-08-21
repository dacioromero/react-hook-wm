import React from 'react'

type ForceUpdate = () => void

const initialArg = Symbol()
const reducer = (): symbol => Symbol()

export function useForceUpdate(): ForceUpdate {
  const [, forceUpdate] = React.useReducer(reducer, initialArg)

  return forceUpdate
}
