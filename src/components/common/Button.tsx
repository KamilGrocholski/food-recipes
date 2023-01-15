import { type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
    isLoading?: boolean
    loadingText?: string
    outline?: boolean
    content: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    isLoading,
    loadingText,
    outline,
    content,
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={`btn ${variantConfig[variant]} ${outline ? 'btn-outline' : ''} ${isLoading ? 'loading' : ''}`}
        >
            {isLoading && loadingText ? loadingText : content}
        </button>
    )
}

export default Button

const variantConfig = {
    'primary': 'bg-primary',
    'secondary': 'bg-secondary',
    'error': 'btn-error',
    'success': 'btn-success',
    'warning': 'btn-warning'
} as const