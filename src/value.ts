import { useState, useDebugValue } from 'react'
import { useListener } from './listener'

type MonetizationEventDetail = MonetizationEvent['detail']

type UseValue<T extends keyof MonetizationEventDetail> = () =>
  | MonetizationEventDetail[T]
  | null

// Using a factory because dynamic keys would require keeping track of all values
function createUseValue<T extends keyof MonetizationEventDetail>(
  key: T
): UseValue<T> {
  type Value = ReturnType<UseValue<T>>

  return function useValue(): Value {
    const [value, setValue] = useState<Value>(null)

    useDebugValue(key)

    function handle(event: MonetizationEvent): void {
      setValue(event.detail[key])
    }

    useListener({
      onPending: handle,
      onStart: handle,
      onProgress: handle,
      onStop: handle
    })

    return value
  }
}

export const usePaymentPointer = createUseValue('paymentPointer')
export const useRequestId = createUseValue('requestId')
