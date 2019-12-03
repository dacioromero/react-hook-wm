import { MonetizationState } from 'types-wm'

import { useForceUpdate } from './utils'
import { useListener } from './listener'

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
