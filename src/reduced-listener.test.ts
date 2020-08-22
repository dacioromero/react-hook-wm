import { renderHook, act } from '@testing-library/react-hooks'
import { MonetizationEvent } from 'types-wm'

import { useReducedListener, ListenerReducer } from './reduced-listener'

describe.each([
  ['monetizationpending', 'onPending'],
  ['monetizationstart', 'onStart'],
  ['monetizationprogress', 'onProgress'],
  ['monetizationstop', 'onStop']
])('%s', (typeArg, propName) => {
  const monetizationRef = useMonetizationRef()

  it(`should reduce ${propName} calls`, () => {
    const reducer: ListenerReducer<MonetizationEvent | null> = (
      prevEvent,
      event
    ) => {
      switch (event.type) {
        case typeArg:
          return event
        default:
          return prevEvent
      }
    }

    const monetization = monetizationRef.current!
    const { result } = renderHook(() => useReducedListener(reducer, null))
    const event = new CustomEvent(typeArg)

    act(() => {
      monetization.dispatchEvent(event)
    })

    expect(result.current).toBe(event)
  })
})
