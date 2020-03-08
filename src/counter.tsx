import { useReducedListener, ListenerReducer } from './reduced-listener'
import React, { createContext, FC, useContext } from 'react'

interface Counter {
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
    case 'monetizationprogress':
      const { amount, assetCode: code, assetScale: scale } = event.detail

      const total = prevCounter.total + Number(amount) * 10 ** -scale

      return {
        total,
        code,
        scale
      }
    case 'monetizationstop':
      if (event.detail.finalized) return initialCounter

      return prevCounter
    default:
      return prevCounter
  }
}

export function useCounter(): Counter {
  return useReducedListener(counterReducer, initialCounter)
}

const CounterContext = createContext<Counter>(initialCounter)

export const CounterContextProvider: FC = ({ children }) => {
  const counter = useCounter()

  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  )
}

export const useCounterContext = (): Counter => useContext(CounterContext)
