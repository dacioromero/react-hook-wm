import React from 'react'

import { useReducedListener, ListenerReducer } from './reduced-listener'

export interface Counter {
  total: number
  scale: number
  code: string | null
}

const initialCounter: Counter = {
  total: 0,
  scale: 0,
  code: null
}

const counterReducer: ListenerReducer<Counter> = (prevCounter, event) => {
  switch (event.type) {
    case 'monetizationprogress': {
      const { amount, assetCode: code, assetScale: scale } = event.detail

      // eslint-disable-next-line no-mixed-operators
      const total = prevCounter.total + Number(amount) * 10 ** -scale

      return {
        total,
        code,
        scale
      }
    }
    case 'monetizationstop':
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      if (event.detail.finalized !== false) return initialCounter

      return prevCounter
    default:
      return prevCounter
  }
}

export function useCounter(): Counter {
  return useReducedListener(counterReducer, initialCounter)
}

const CounterContext = React.createContext<Counter>(initialCounter)

export const CounterProvider: React.FC = ({ children }) => {
  const counter = useCounter()

  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  )
}

export const useCounterContext = (): Counter => React.useContext(CounterContext)
