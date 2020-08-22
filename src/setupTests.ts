import React from 'react'
import { MonetizationState, Monetization } from 'types-wm'

class MonetizationMock extends EventTarget implements Monetization {
  state: MonetizationState = 'pending'
}

function _useMonetizationRef(): React.MutableRefObject<Monetization | null> {
  const monetizationRef: React.MutableRefObject<Monetization | null> = {
    current: null
  }

  beforeEach(() => {
    monetizationRef.current = document.monetization = new MonetizationMock()
  })

  afterEach(() => {
    delete document.monetization
    monetizationRef.current = null
  })

  return monetizationRef
}

global.useMonetizationRef = _useMonetizationRef

// TODO: Investigate no-var and no-implicit-globals
/* eslint-disable */
declare global {
  var useMonetizationRef: typeof _useMonetizationRef
}
/* eslint-enable */
