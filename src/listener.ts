import React from 'react'
import {
  MonetizationPendingEvent,
  MonetizationStartEvent,
  MonetizationProgressEvent,
  MonetizationStopEvent
} from 'types-wm'

export interface UseListenerOpts {
  onPending?: (event: MonetizationPendingEvent) => void
  onStart?: (event: MonetizationStartEvent) => void
  onProgress?: (event: MonetizationProgressEvent) => void
  onStop?: (event: MonetizationStopEvent) => void
}

export function useListener(opts: UseListenerOpts): void {
  const optsRef = React.useRef(opts)

  React.useEffect(() => {
    optsRef.current = opts
  }, [opts])

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const { monetization } = document

    if (typeof monetization == 'undefined') return

    function handlePending(event: MonetizationPendingEvent): void {
      optsRef.current.onPending?.(event)
    }

    function handleStart(event: MonetizationStartEvent): void {
      optsRef.current.onStart?.(event)
    }

    function handleProgress(event: MonetizationProgressEvent): void {
      optsRef.current.onProgress?.(event)
    }

    function handleStop(event: MonetizationStopEvent): void {
      optsRef.current.onStop?.(event)
    }

    monetization.addEventListener('monetizationpending', handlePending)
    monetization.addEventListener('monetizationstart', handleStart)
    monetization.addEventListener('monetizationprogress', handleProgress)
    monetization.addEventListener('monetizationstop', handleStop)

    return (): void => {
      monetization.removeEventListener('monetizationpending', handlePending)
      monetization.removeEventListener('monetizationstart', handleStart)
      monetization.removeEventListener('monetizationprogress', handleProgress)
      monetization.removeEventListener('monetizationstop', handleStop)
    }
  }, [])
}
