import { type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'accent'
    isLoading?: boolean
    loadingText?: string
    outline?: boolean
    content: React.ReactNode
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    variant = 'accent',
    isLoading,
    loadingText,
    outline,
    content,
    className,
    ...rest
}) => {
    return (
        <button
            className={`btn ${variantConfig[variant]} ${outline ? 'btn-outline' : ''} ${isLoading ? 'loading' : ''} ${className ? className : ''}`}
            type='button'
            {...rest}
        >
            {isLoading && loadingText ? loadingText : content}
        </button>
    )
}

export default Button

const variantConfig = {
    'primary': 'btn-primary',
    'secondary': 'btn-secondary',
    'error': 'btn-error',
    'success': 'btn-success',
    'warning': 'btn-warning',
    'accent': 'btn-accent'
} as const