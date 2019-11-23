import { useState, useEffect, useDebugValue } from 'react'
import { MonetizationEvent, MonetizationEventDetail } from './types'

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

    useEffect(() => {
      const { monetization } = document

      if (!monetization) return

      function handle(event: MonetizationEvent): void {
        setValue(event.detail[key])
      }

      monetization.addEventListener('monetizationpending', handle)
      monetization.addEventListener('monetizationstart', handle)
      monetization.addEventListener('monetizationprogress', handle)
      monetization.addEventListener('monetizationstop', handle)

      return (): void => {
        monetization.removeEventListener('monetizationpending', handle)
        monetization.removeEventListener('monetizationstart', handle)
        monetization.removeEventListener('monetizationprogress', handle)
        monetization.removeEventListener('monetizationstop', handle)
      }
    }, [])

    return value
  }
}

export const usePaymentPointer = createUseValue('paymentPointer')
export const useRequestId = createUseValue('requestId')
