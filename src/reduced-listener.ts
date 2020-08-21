import React from 'react'
import { MonetizationEvent } from 'types-wm'

import { useListener } from './listener'

export type ListenerReducer<State> = (
  prevState: State,
  event: MonetizationEvent
) => State

export function useReducedListener<State>(
  reducer: ListenerReducer<State>,
  initialState: State
): State {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useListener({
    onPending: dispatch,
    onStart: dispatch,
    onProgress: dispatch,
    onStop: dispatch
  })

  return state
}
