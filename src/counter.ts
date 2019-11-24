import { useEffect, useReducer } from 'react'

import {
  MonetizationProgresssEvent,
  MonetizationProgressEventDetail
} from './types'

interface Counter {
  total: number
  code: string | null
  scale: number | null
}

interface ProgressAction {
  type: 'progress'
  payload: MonetizationProgressEventDetail
}

type Action = ProgressAction

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
    default:
      return state
  }
}

const initialState: Counter = {
  total: 0,
  code: null,
  scale: null
}

export function useCounter(): Counter {
  const [counter, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handleProgress(event: MonetizationProgresssEvent): void {
      dispatch({ type: 'progress', payload: event.detail })
    }

    monetization.addEventListener('monetizationprogress', handleProgress)

    return (): void => {
      monetization.removeEventListener('monetizationprogress', handleProgress)
    }
  }, [dispatch])

  return counter
}
