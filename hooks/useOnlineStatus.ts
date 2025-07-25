import { useEffect, useState } from 'react'

const getNavigatorOnlineStatus = () => {
  if (typeof navigator === 'undefined' || !navigator.onLine) {
    return false
  }
  return navigator.onLine
}

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(getNavigatorOnlineStatus())

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
