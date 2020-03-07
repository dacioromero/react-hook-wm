import { useReducedListener, ListenerReducer } from './reduced-listener'

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

export function useHasPaid(): boolean {
  return useReducedListener(hasPaidReducer, false)
}
