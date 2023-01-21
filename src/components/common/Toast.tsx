import { useEffect } from "react"
import { shallow } from "zustand/shallow"
import { Icons } from "../../assets/icons"
import { useToastStore } from "../../store/toast.store"

interface ToastProps {
    message: string,
    variant: keyof typeof variantConfig
    uniqueId: typeof toastsUniqueIds[number]
    duration?: number
}

const toasts: { toasts: ToastProps[] } = {
    toasts: [
        {
            message: 'Collection deleted!',
            uniqueId: 'folder-deletion-success',
            variant: 'success'
        },
        {
            message: 'An error has occured during the deletion of the collection.',
            uniqueId: 'folder-deletion-error',
            variant: 'error',
            duration: 5000
        },
        {
            message: 'Recipe added successfully!',
            uniqueId: 'recipe-creation-success',
            variant: 'success'
        },
        {
            message: 'An error has occured during the creation of the recipe.',
            uniqueId: 'recipe-creation-error',
            variant: 'error',
            duration: 5000
        },
        {
            message: 'Recipe added to the collections!',
            uniqueId: 'recipe-to-folder-success',
            variant: 'success'
        },
        {
            message: "Couldn't add the recipe to your collection.",
            uniqueId: 'recipe-to-folder-error',
            variant: 'error',
            duration: 5000
        },
        {
            message: 'Recipe deleted successfully!',
            uniqueId: 'recipe-remove-success',
            variant: 'success'
        },
        {
            message: "Couldn't delete the recipe.",
            uniqueId: 'recipe-remove-error',
            variant: 'error',
            duration: 5000
        }
    ]
}

export const toastsUniqueIds = [
    'folder-deletion-success',
    'folder-deletion-error',
    'recipe-creation-success',
    'recipe-creation-error',
    'recipe-to-folder-success',
    'recipe-to-folder-error',
    'recipe-remove-success',
    'recipe-remove-error'
] as const

const ToastContainer = () => {

    return (
        <div className="toast toast-end z-50">
            {toasts.toasts.map((toast, index) => (
                <Toast key={index} {...toast} />
            ))}
        </div>
    )
}

export default ToastContainer

const Toast: React.FC<ToastProps> = ({
    message,
    variant,
    uniqueId,
    duration = 3000
}) => {
    const { toastList, close } = useToastStore(
        store => ({
            toastList: store.toastList,
            close: store.close
        }),
        shallow
    )

    const isShown = toastList.has(uniqueId)

    useEffect(() => {
        if (!isShown) return

        const timeoutId = setTimeout(() => {
            close(uniqueId)
        }, duration)

        return () => {
            clearTimeout(timeoutId)
        }

    }, [uniqueId, isShown, duration, close])

    if (!isShown) return null

    return (
        <div className={`alert ${variantConfig[variant]}`}>
            <div>
                {iconConfig[variant]}
                <span>{message}</span>
            </div>
        </div>
    )
}

const variantConfig = {
    'info': 'alert-info',
    'success': 'alert-success',
    'warning': 'alert-warning',
    'error': 'alert-error'
} as const

const iconConfig = {
    'info': Icons.infoCircle,
    'success': Icons.checkCircle,
    'warning': Icons.warningTriangle,
    'error': Icons.xCircle
} as const