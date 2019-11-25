import { useEffect, useReducer, useRef } from 'react'

import {
  MonetizationProgressEvent,
  MonetizationProgressEventDetail,
  MonetizationPendingEvent
} from './types'

interface Counter {
  total: number
  scale: number
  code: string | null
}

interface ProgressAction {
  type: 'progress'
  payload: MonetizationProgressEventDetail
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

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handlePending(event: MonetizationPendingEvent): void {
      const { requestId } = event.detail

      if (requestIdRef.current !== requestId) {
        dispatch({ type: 'reset' })
      }

      requestIdRef.current = requestId
    }

    function handleProgress(event: MonetizationProgressEvent): void {
      const { detail } = event

      requestIdRef.current = detail.requestId

      dispatch({ type: 'progress', payload: event.detail })
    }

    // monetizationstop events can include requestId for new paymentPointer

    monetization.addEventListener('monetizationpending', handlePending)
    monetization.addEventListener('monetizationprogress', handleProgress)

    return (): void => {
      monetization.removeEventListener('monetizationpending', handlePending)
      monetization.removeEventListener('monetizationprogress', handleProgress)
    }
  }, [])

  return counter
}
