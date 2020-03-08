import { useReducedListener, ListenerReducer } from './reduced-listener'

import { createProviderAndHook } from './utils'

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

const [CounterProvider, useCounterContext] = createProviderAndHook({
  name: 'Counter',
  useHook: useCounter,
  defaultValue: initialCounter
})

export { CounterProvider, useCounterContext }
