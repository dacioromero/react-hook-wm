import { usePaymentPointer, useRequestId } from './value'
import { renderHook, act } from '@testing-library/react-hooks'

describe.each([
  [usePaymentPointer, 'paymentPointer'],
  [useRequestId, 'requestId']
])('%p', (useValue, key) => {
  const monetizationRef = useMonetizationRef()

  it(`should return latest ${key}`, () => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useValue())
    const value = Symbol()

    act(() => {
      monetization.dispatchEvent(
        new CustomEvent('monetizationpending', { detail: { [key]: value } })
      )
    })

    expect(result.current).toBe(value)
  })
})
