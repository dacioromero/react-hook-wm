import React from 'react'

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

const initialHasPaid = false

export function useHasPaid(): boolean {
  return useReducedListener(hasPaidReducer, initialHasPaid)
}

const HasPaidContext = React.createContext(initialHasPaid)

export const HasPaidProvider: React.FC = ({ children }) => {
  const hasPaid = useHasPaid()

  return (
    <HasPaidContext.Provider value={hasPaid}>
      {children}
    </HasPaidContext.Provider>
  )
}

export const useHasPaidContext = (): boolean => React.useContext(HasPaidContext)
