import { renderHook, act } from '@testing-library/react-hooks'
import { useStatus } from './status'

describe('server-side', () => {
  it.todo('should return null')
})

describe('no monetization', () => {
  it('should return null without document.monetization', () => {
    const { result } = renderHook(() => useStatus())
    expect(result.current).toBeNull()
  })
})

describe('monetization', () => {
  const monetizationRef = useMonetizationRef()

  it('should return default', () => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useStatus())

    expect(result.current).toBe(monetization.state)
  })

  it('should return latest', () => {
    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useStatus())

    act(() => {
      monetization.state = 'pending'
      monetization.dispatchEvent(new CustomEvent('monetizationpending'))
    })

    expect(result.current).toBe(monetization.state)
  })
})
