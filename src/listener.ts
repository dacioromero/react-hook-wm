import { useRef, useEffect } from 'react'

export interface UseListenerOptions {
  onPending?: (event: MonetizationPendingEvent) => void
  onStart?: (event: MonetizationStartEvent) => void
  onProgress?: (event: MonetizationProgressEvent) => void
  onStop?: (event: MonetizationStopEvent) => void
}

export function useListener(options: UseListenerOptions): void {
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handlePending(event: MonetizationPendingEvent) {
      optionsRef.current.onPending?.(event)
    }

    function handleStart(event: MonetizationStartEvent) {
      optionsRef.current.onPending?.(event)
    }

    function handleProgress(event: MonetizationProgressEvent) {
      optionsRef.current.onPending?.(event)
    }

    function handleStop(event: MonetizationStopEvent) {
      optionsRef.current.onPending?.(event)
    }

    monetization.addEventListener('monetizationpending', handlePending)
    monetization.addEventListener('monetizationstart', handleStart)
    monetization.addEventListener('monetizationprogress', handleProgress)
    monetization.addEventListener('monetizationstop', handleStop)

    return () => {
      monetization.removeEventListener('monetizationpending', handlePending)
      monetization.removeEventListener('monetizationstart', handleStart)
      monetization.removeEventListener('monetizationprogress', handleProgress)
      monetization.removeEventListener('monetizationstop', handleStop)
    }
  }, [])
}
