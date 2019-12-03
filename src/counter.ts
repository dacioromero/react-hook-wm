import { useReducer, useRef } from 'react'

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

interface ResetAction {
  type: 'reset'
}

type Action = ProgressAction | ResetAction

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
    case 'reset':
      return initialState
    default:
      return state
  }
}

export function useCounter(): Counter {
  const [counter, dispatch] = useReducer(reducer, initialState)
  const requestIdRef = useRef<string>()

  useListener({
    onPending(event) {
      const { requestId } = event.detail

      if (requestIdRef.current !== requestId) {
        dispatch({ type: 'reset' })
      }

      requestIdRef.current = requestId
    },
    onProgress(event) {
      const { detail } = event

      requestIdRef.current = detail.requestId

      dispatch({ type: 'progress', payload: event.detail })
    }
  })

  return counter
}
