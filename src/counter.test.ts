import { renderHook, act, HookResult } from '@testing-library/react-hooks'

import { useCounterContext, CounterProvider, Counter } from './counter'
import { Monetization } from 'types-wm'

describe.each(['monetizationpending', 'monetizationstart'])(
  '%s',
  eventTypeArg => {
    const monetizationRef = useMonetizationRef()

    it('should return the initial counter', () => {
      const monetization = monetizationRef.current!
      const { result } = renderHook(() => useCounterContext(), {
        wrapper: CounterProvider
      })

      const initialResult = result.current

      act(() => {
        monetization.dispatchEvent(new CustomEvent(eventTypeArg))
      })

      expect(result.current).toBe(initialResult)
    })
  }
)

// https://webmonetization.org/docs/api#example-event-object-3
const progressEvent = new CustomEvent('monetizationprogress', {
  detail: {
    paymentPointer: '$wallet.example.com/alice',
    requestId: 'ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce',
    amount: '7567',
    assetCode: 'USD',
    assetScale: 2
  }
})

describe('monetizationprogress', () => {
  const monetizationRef = useMonetizationRef()

  it('should count', () => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useCounterContext(), {
      wrapper: CounterProvider
    })

    act(() => {
      monetization.dispatchEvent(progressEvent)
    })

    expect(result.current).toEqual({
      total: 75.67,
      scale: 2,
      code: 'USD'
    })
  })
})

describe('monetizationstop', () => {
  const monetizationRef = useMonetizationRef()

  function createStopEvent(finalized?: boolean): CustomEvent {
    // https://webmonetization.org/docs/api#example-event-object-2
    return new CustomEvent('monetizationstop', {
      detail: {
        paymentPointer: '$wallet.example.com/alice',
        requestId: 'ec4f9dec-0ba4-4029-8f6a-29dc21f2e0ce',
        finalized
      }
    })
  }

  function initCounter(monetization: Monetization): HookResult<Counter> {
    const { result } = renderHook(() => useCounterContext(), {
      wrapper: CounterProvider
    })

    act(() => {
      monetization.dispatchEvent(progressEvent)
    })

    return result
  }

  it('should not reset', () => {
    const monetization = monetizationRef.current!
    const result = initCounter(monetization)
    const beforeResult = result.current

    act(() => {
      monetization.dispatchEvent(createStopEvent(false))
    })

    expect(result.current).toBe(beforeResult)
  })

  // eslint-disable-next-line no-undefined
  it.each([true, undefined])('should reset when finalized is %p', finalized => {
    const monetization = monetizationRef.current!
    const result = initCounter(monetization)

    act(() => {
      monetization.dispatchEvent(createStopEvent(finalized))
    })

    expect(result.current).toEqual({
      total: 0,
      scale: 0,
      code: null
    })
  })
})
