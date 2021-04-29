import { renderHook } from '@testing-library/react-hooks'
import { useStatus } from './status'

describe('server-side', () => {
  it('should return null', () => {
    const { result } = renderHook(() => useStatus())
    expect(result.current).toBeNull()
  })
})
