import { renderHook, act } from '@testing-library/react-hooks'

import { useHasPaidContext, HasPaidProvider } from './has-paid'

describe('monetizationprogress', () => {
  const monetizationRef = useMonetizationRef()

  it('should return true', () => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useHasPaidContext(), {
      wrapper: HasPaidProvider
    })

    act(() => {
      monetization.dispatchEvent(new CustomEvent('monetizationprogress'))
    })

    expect(result.current).toBe(true)
  })
})

describe('monetizationstop', () => {
  const monetizationRef = useMonetizationRef()

  it.each([
    [true, false],
    [false, true],
    [false, undefined] // eslint-disable-line no-undefined
  ])('should return %p when finalized is %p', (expected, finalized) => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useHasPaidContext(), {
      wrapper: HasPaidProvider
    })

    act(() => {
      monetization.dispatchEvent(
        new CustomEvent('monetizationstop', { detail: { finalized } })
      )
    })

    expect(result.current).toBe(expected)
  })
})

describe.each(['monetizationpending', 'monetizationstart'])(
  '%s',
  eventTypeArg => {
    const monetizationRef = useMonetizationRef()

    it.each([true, false])('it should continue to return %p', beforeState => {
      const monetization = monetizationRef.current!
      const { result } = renderHook(() => useHasPaidContext(), {
        wrapper: HasPaidProvider
      })

      act(() => {
        // hasPaid = true
        if (beforeState) {
          monetization.dispatchEvent(new CustomEvent('monetizationprogress'))
        }

        monetization.dispatchEvent(new CustomEvent(eventTypeArg))
      })

      expect(result.current).toBe(beforeState)
    })
  }
)
