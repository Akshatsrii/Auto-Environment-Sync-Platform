import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error:   'bg-red-50 border-red-200 text-red-600',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info:    'bg-blue-50 border-blue-200 text-blue-700',
  }

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }

  return (
    <div className={`flex items-center gap-3 border rounded-lg px-4 py-3 shadow-lg ${styles[type]}`}>
      <span className="font-bold">{icons[type]}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
    </div>
  )
}

export default Toast