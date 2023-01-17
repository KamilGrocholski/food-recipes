import { type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'accent' | 'ghost'
    isLoading?: boolean
    loadingText?: string
    outline?: boolean
    content: React.ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    variant = 'accent',
    isLoading,
    loadingText,
    outline,
    content,
    size = 'md',
    className,
    ...rest
}) => {
    return (
        <button
            className={`btn ${sizeConfig[size]} ${variantConfig[variant]} ${outline ? 'btn-outline' : ''} ${isLoading ? 'loading' : ''} ${className ? className : ''}`}
            type='button'
            {...rest}
        >
            {isLoading && loadingText ? loadingText : content}
        </button>
    )
}

export default Button

const sizeConfig = {
    'xs': 'btn-xs',
    'sm': 'btn-sm',
    'md': 'btn-md',
    'lg': 'btn-lg',
} as const

const variantConfig = {
    'primary': 'btn-primary',
    'secondary': 'btn-secondary',
    'error': 'btn-error',
    'success': 'btn-success',
    'warning': 'btn-warning',
    'accent': 'btn-accent',
    'ghost': 'btn-ghost'
} as const