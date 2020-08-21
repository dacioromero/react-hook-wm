import { MonetizationState } from 'types-wm'

import { useListener } from './listener'
import { useForceUpdate } from './utils'

export function useStatus(): MonetizationState | null {
  const forceUpdate = useForceUpdate()

  useListener({
    onPending: forceUpdate,
    onStart: forceUpdate,
    onStop: forceUpdate
  })

  // SSR support
  if (typeof document === 'undefined') return null

  return document.monetization?.state ?? null
}
