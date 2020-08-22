import { renderHook, act } from '@testing-library/react-hooks'

import { useListener } from './listener'

describe('not monetized', () => {
  it('should not error without monetization', () => {
    renderHook(() => useListener({}))
  })
})

describe('monetized', () => {
  describe.each([
    ['monetizationpending', 'onPending'],
    ['monetizationstart', 'onStart'],
    ['monetizationprogress', 'onProgress'],
    ['monetizationstop', 'onStop']
  ])('%s', (eventTypeArg, propName) => {
    const monetizationRef = useMonetizationRef()

    it(`should pass event to ${propName}`, () => {
      const handle = jest.fn()
      const monetization = monetizationRef.current!
      const event = new CustomEvent(eventTypeArg)

      renderHook(() => useListener({ [propName]: handle }))

      act(() => {
        monetization.dispatchEvent(event)
      })

      expect(handle).toBeCalledWith(event)
    })

    it(`should not error without ${propName}`, () => {
      const monetization = monetizationRef.current!
      const event = new CustomEvent(eventTypeArg)

      renderHook(() => useListener({}))

      act(() => {
        monetization.dispatchEvent(event)
      })
    })
  })
})
