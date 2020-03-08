import { useReducedListener, ListenerReducer } from './reduced-listener'
import React, { createContext, FC, useContext } from 'react'

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

const HasPaidContext = createContext(initialHasPaid)

export const HasPaidProvider: FC = ({ children }) => {
  const hasPaid = useHasPaid()

  return (
    <HasPaidContext.Provider value={hasPaid}>
      {children}
    </HasPaidContext.Provider>
  )
}

export const useHasPaidContext = (): boolean => useContext(HasPaidContext)
