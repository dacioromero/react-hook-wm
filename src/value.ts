import { useDebugValue } from 'react'
import { MonetizationEvent } from 'types-wm'

import { useReducedListener, ListenerReducer } from './reduced-listener'

type MonetizationEventDetail = MonetizationEvent['detail']

type UseValue<T extends keyof MonetizationEventDetail> = () =>
  | MonetizationEventDetail[T]
  | null

// Using a factory because dynamic keys would require keeping track of all values
function createUseValue<T extends keyof MonetizationEvent['detail']>(
  key: T
): UseValue<T> {
  type Value = ReturnType<UseValue<T>>

  const valueReducer: ListenerReducer<Value> = (_prevValue, event) => {
    return event.detail[key]
  }

  return function useValue(): Value {
    useDebugValue(key)

    return useReducedListener(valueReducer, null)
  }
}

export const usePaymentPointer = createUseValue('paymentPointer')
export const useRequestId = createUseValue('requestId')
