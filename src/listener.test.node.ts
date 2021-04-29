import { renderHook } from '@testing-library/react-hooks'
import { useListener } from './listener'

describe('server-side', () => {
  it('should run', () => {
    renderHook(() => useListener({}))
  })
})
