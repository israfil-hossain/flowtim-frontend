import toast from "react-hot-toast"

interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

function useToast() {
  const showToast = ({ title, description, variant = "default" }: ToastOptions) => {
    const message = title && description ? `${title}: ${description}` : title || description || ""
    
    switch (variant) {
      case "success":
        return toast.success(message)
      case "destructive":
        return toast.error(message)
      default:
        return toast(message)
    }
  }

  return {
    toast: showToast,
    toasts: [], // For compatibility
  }
}

export { useToast, toast }