import { useReducer } from 'react'
import { MonetizationProgressEvent, MonetizationStopEvent } from 'types-wm'

import { useListener } from './listener'

interface Counter {
  total: number
  scale: number
  code: string | null
}

interface ProgressAction {
  type: 'progress'
  payload: MonetizationProgressEvent['detail']
}

interface StopAction {
  type: 'stop'
  payload: MonetizationStopEvent['detail']
}

type Action = ProgressAction | StopAction

const initialState: Counter = {
  total: 0,
  scale: 0,
  code: null
}

function reducer(state: Counter, action: Action): Counter {
  switch (action.type) {
    case 'progress':
      const { amount, assetCode: code, assetScale: scale } = action.payload

      const total = state.total + Number(amount) * 10 ** -scale

      return {
        total,
        code,
        scale
      }
    case 'stop':
      if (action.payload.finalized) return initialState

      return state
    default:
      return state
  }
}

export function useCounter(): Counter {
  const [counter, dispatch] = useReducer(reducer, initialState)

  useListener({
    onProgress(event) {
      dispatch({ type: 'progress', payload: event.detail })
    },
    onStop(event) {
      dispatch({ type: 'stop', payload: event.detail })
    }
  })

  return counter
}
