import { type ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'accent' | 'ghost'
    isLoading?: boolean
    loadingText?: string
    outline?: boolean
    content: React.ReactNode
    shape?: 'circle' | 'square' | 'block' | 'none'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    isLoading,
    loadingText,
    outline,
    content,
    size = 'md',
    shape = 'none',
    className,
    ...rest
}, ref) => {
    return (
        <button
            className={`btn ${shapeConfig[shape]} ${sizeConfig[size]} ${variantConfig[variant]} ${outline ? 'btn-outline' : ''} ${isLoading ? 'loading' : ''} ${className ? className : ''}`}
            type='button'
            ref={ref}
            {...rest}
        >
            {isLoading && loadingText ? loadingText : content}
        </button>
    )
})

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

const shapeConfig = {
    'square': 'btn-square',
    'circle': 'btn-circle',
    'block': 'btn-block',
    'none': ''
} as const