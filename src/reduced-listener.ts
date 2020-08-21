import React from 'react'
import { MonetizationEvent } from 'types-wm'

import { useListener } from './listener'

export type ListenerReducer<S> = (prevState: S, event: MonetizationEvent) => S

export function useReducedListener<S>(
  reducer: ListenerReducer<S>,
  initialState: S
): S {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useListener({
    onPending: dispatch,
    onStart: dispatch,
    onProgress: dispatch,
    onStop: dispatch
  })

  return state
}
