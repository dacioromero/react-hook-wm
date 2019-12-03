import { useState, useEffect, useRef } from 'react'

import { useListener } from './listener'

export function useHasPaid(): boolean {
  const [hasPaid, setHasPaid] = useState(false)
  const requestIdRef = useRef<string>()

  useListener({
    onPending(event) {
      const { requestId } = event.detail

      if (requestIdRef.current !== requestId) {
        setHasPaid(false)
      }

      requestIdRef.current = requestId
    },
    onProgress(event) {
      requestIdRef.current = event.detail.requestId
      setHasPaid(true)
    }
  })

  return hasPaid
}
