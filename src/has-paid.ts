import { useReducedListener, ListenerReducer } from './reduced-listener'

import { createProviderAndHook } from './utils'

const hasPaidReducer: ListenerReducer<boolean> = (prevHasPaid, event) => {
  switch (event.type) {
    case 'monetizationprogress':
      return true
    case 'monetizationstop':
      return Boolean(event.detail.finalized)
    default:
      return prevHasPaid
  }
}

const initialHasPaid = false

export function useHasPaid(): boolean {
  return useReducedListener(hasPaidReducer, initialHasPaid)
}

const [HasPaidProvider, useHasPaidContext] = createProviderAndHook({
  name: 'HasPaid',
  useHook: useHasPaid,
  defaultValue: initialHasPaid
})

export { HasPaidProvider, useHasPaidContext }
