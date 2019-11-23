import { useState, useEffect } from 'react'

export function useHasPaid(): boolean {
  const [hasPaid, setHasPaid] = useState(false)

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handleStart(): void {
      setHasPaid(true)
    }

    monetization.addEventListener('monetizationstart', handleStart)

    return (): void => {
      monetization.removeEventListener('monetizationstart', handleStart)
    }
  }, [])

  return hasPaid
}
