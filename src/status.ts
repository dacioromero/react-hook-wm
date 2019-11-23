import { useEffect } from 'react'

import { MonetizationState } from './types'
import { useForceUpdate } from './utils'

export function useStatus(): MonetizationState | null {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    monetization.addEventListener('monetizationstart', forceUpdate)
    monetization.addEventListener('monetizationpending', forceUpdate)
    monetization.addEventListener('monetizationstop', forceUpdate)

    return (): void => {
      monetization.removeEventListener('monetizationstart', forceUpdate)
      monetization.removeEventListener('monetizationpending', forceUpdate)
      monetization.removeEventListener('monetizationstop', forceUpdate)
    }
  }, [forceUpdate])

  if (typeof document === 'undefined') return null

  return document.monetization?.state ?? null
}
