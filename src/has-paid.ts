import { useState } from 'react'

import { useListener } from './listener'

export function useHasPaid(): boolean {
  const [hasPaid, setHasPaid] = useState(false)

  useListener({
    onProgress(event) {
      setHasPaid(true)
    },
    onStop(event) {
      if (event.detail.finalized) setHasPaid(false)
    }
  })

  return hasPaid
}
