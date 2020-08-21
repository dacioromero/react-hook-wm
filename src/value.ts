import React from 'react'
import { MonetizationEvent } from 'types-wm'

import { useReducedListener, ListenerReducer } from './reduced-listener'

type MonetizationEventDetail = MonetizationEvent['detail']

type UseValue<Key extends keyof MonetizationEventDetail> = () =>
  | MonetizationEventDetail[Key]
  | null

// Using a factory because dynamic keys would require keeping track of all values
function createUseValue<Key extends keyof MonetizationEvent['detail']>(
  key: Key
): UseValue<Key> {
  type Value = ReturnType<UseValue<Key>>

  const valueReducer: ListenerReducer<Value> = (_prevValue, event) => {
    return event.detail[key]
  }

  return function useValue(): Value {
    React.useDebugValue(key)

    return useReducedListener(valueReducer, null)
  }
}

export const usePaymentPointer = createUseValue('paymentPointer')
export const useRequestId = createUseValue('requestId')
