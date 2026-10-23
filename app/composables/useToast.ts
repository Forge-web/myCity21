export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration: number
}

interface ToastOptions {
  type?: ToastType
  duration?: number
}

export function useToast()  {
  const toasts = useState<ToastMessage[]>('app:toasts', () => [])

  function remove(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  function show(message: string, options: ToastOptions = {}) {
    // Всплывающие уведомления создаём только в браузере.
    if (import.meta.server) return

    const id = crypto.randomUUID()

    toasts.value.push({
      id,
      message,
      type: options.type ?? 'info',
      // 0 — не закрывать автоматически.
      duration: options.duration ?? 4000,
    })

    return id
  }

  return {
    toasts: readonly(toasts),
    show,
    remove,
    clear: () => {
      toasts.value = []
    },
    success: (message: string, duration = 4000) =>
      show(message, { type: 'success', duration }),
    error: (message: string, duration = 6000) =>
      show(message, { type: 'error', duration }),
    warning: (message: string, duration = 5000) =>
      show(message, { type: 'warning', duration }),
    info: (message: string, duration = 4000) =>
      show(message, { type: 'info', duration }),
	}
}
