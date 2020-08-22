import { renderHook } from '@testing-library/react-hooks'
import { useForceUpdate } from './utils'

it('should update', () => {
  const { result, waitForNextUpdate } = renderHook(() => useForceUpdate())
  const updatePromise = waitForNextUpdate()

  result.current()

  expect(updatePromise).resolves.toBeFalsy()
})
