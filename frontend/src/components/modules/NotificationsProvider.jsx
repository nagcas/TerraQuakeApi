import { useEffect, useState } from 'react'
import { subscribeToast, subscribeLoadingInc, subscribeLoadingDec } from './notifyBus'

export default function NotificationsProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [pendingCount, setPendingCount] = useState(0)
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)

  const MAX_TOASTS = 3

  useEffect(() => {
    const unsubToast = subscribeToast((t) => {
      const id = `${Date.now()}-${Math.random()}`
      const durationMs = Math.max(2000, Math.min(8000, Number(t?.durationMs) || 3500))
      setToasts((prev) => {
        const exists = prev.some((x) => x.message === t.message && x.type === t.type)
        const next = exists ? prev : [...prev, { id, ...t, durationMs, createdAt: Date.now(), paused: false }]
        return next.slice(-MAX_TOASTS)
      })
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id))
      }, durationMs)
      setToasts((prev) => prev.map((x) => (x.id === id ? { ...x, _timer: timer } : x)))
    })
    const unsubInc = subscribeLoadingInc(() => setPendingCount((c) => c + 1))
    const unsubDec = subscribeLoadingDec(() => setPendingCount((c) => Math.max(0, c - 1)))

    // online/offline listeners
    const onOffline = () => setIsOffline(true)
    const onOnline = () => setIsOffline(false)
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)
    return () => {
      unsubToast()
      unsubInc()
      unsubDec()
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online', onOnline)
    }
  }, [])

  const hasLoading = pendingCount > 0

  return (
    <>
      {children}
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-3" aria-live="assertive" aria-atomic="true">
        {toasts.map((t) => (
          <div
            key={t.id}
            onMouseEnter={() => {
              if (t._timer) {
                clearTimeout(t._timer)
                setToasts((prev) => prev.map((x) => (x.id === t.id ? { ...x, paused: true, _timer: undefined } : x)))
              }
            }}
            onMouseLeave={() => {
              if (t.paused) {
                const elapsed = Date.now() - (t.createdAt || Date.now())
                const remaining = Math.max(500, (t.durationMs || 3500) - elapsed)
                const timer = setTimeout(() => {
                  setToasts((prev) => prev.filter((x) => x.id !== t.id))
                }, remaining)
                setToasts((prev) => prev.map((x) => (x.id === t.id ? { ...x, paused: false, _timer: timer } : x)))
              }
            }}
            className={
              'group relative overflow-hidden pl-3 pr-10 py-3 rounded-2xl shadow-xl text-sm border ' +
              'motion-safe:transition-all motion-safe:duration-300 backdrop-blur ' +
              (t.type === 'error'
                ? 'bg-red-600/90 border-red-400/50 text-white'
                : t.type === 'success'
                ? 'bg-green-600/90 border-green-400/50 text-white'
                : 'bg-gray-900/90 border-gray-600/40 text-white')
            }
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <span className={
                  'inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white/10 ' +
                  (t.type === 'error' ? 'bg-red-500' : t.type === 'success' ? 'bg-green-500' : 'bg-blue-500')
                }>
                  {t.type === 'error' ? '!' : t.type === 'success' ? '✓' : 'i'}
                </span>
              </div>
              <div className="flex-1 pr-2">
                <p className="font-semibold leading-5">
                  {t.title || (t.type === 'error' ? 'Error' : t.type === 'success' ? 'Success' : 'Notice')}
                </p>
                <p className="opacity-90 mt-0.5 leading-5">
                  {t.message}
                </p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="absolute top-2 right-2 text-white/80 hover:text-white motion-safe:transition-opacity cursor-pointer"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
            <div className="absolute left-0 bottom-0 h-0.5 w-full bg-white/10">
              <div
                className={
                  'h-full ' +
                  (t.type === 'error' ? 'bg-white' : t.type === 'success' ? 'bg-white' : 'bg-white')
                }
                style={{
                  width: t.paused ? '0%' : '100%',
                  transition: t.paused ? 'none' : `width ${Math.max(200, (t.durationMs || 3500))}ms linear`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Offline banner */}
      {isOffline && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-yellow-600 text-white shadow-lg">
          You are offline. Some features may be unavailable.
        </div>
      )}

      {/* Top progress bar tied to global loading */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1"
        style={{ opacity: hasLoading ? 1 : 0, transition: 'opacity 200ms ease' }}
      >
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 animate-pulse" />
          <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        </div>
      </div>

      {/* Global loading overlay */}
      {hasLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-2 border-purple-400/30" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-t-transparent border-purple-400 animate-spin" />
            </div>
            <div className="text-white/90 text-sm">Working...</div>
          </div>
        </div>
      )}
    </>
  )
}


