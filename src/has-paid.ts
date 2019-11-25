import { useState, useEffect, useRef } from 'react'

import { MonetizationProgressEvent, MonetizationPendingEvent } from './types'

export function useHasPaid(): boolean {
  const [hasPaid, setHasPaid] = useState(false)
  const requestIdRef = useRef<string>()

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handlePending(event: MonetizationPendingEvent): void {
      const { requestId } = event.detail

      if (requestIdRef.current !== requestId) {
        setHasPaid(false)
      }

      requestIdRef.current = requestId
    }

    function handleProgress(event: MonetizationProgressEvent): void {
      requestIdRef.current = event.detail.requestId
      setHasPaid(true)
    }

    // monetizationstop events can include requestId for new paymentPointer

    monetization.addEventListener('monetizationpending', handlePending)
    monetization.addEventListener('monetizationprogress', handleProgress)

    return (): void => {
      monetization.removeEventListener('monetizationpending', handlePending)
      monetization.removeEventListener('monetizationprogress', handleProgress)
    }
  }, [])

  return hasPaid
}
