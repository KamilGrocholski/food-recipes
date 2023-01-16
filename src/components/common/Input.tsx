import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputSize?: 'xs' | 'sm' | 'md' | 'lg'
    border?: boolean
    label?: string
    errorMessage?: string
    labelPosition?: 'top' | 'bottom'
    variant?: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning'
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({
    inputSize = 'md',
    border = true,
    label,
    errorMessage,
    labelPosition = 'top',
    variant,
    ...rest
}, ref) => {
    return (
        <div className="form-control w-full max-w-xs">
            {labelPosition === 'top' ? <label className="label">
                <span className="label-text">{label}</span>
                <span className='label-text text-red-500'>{errorMessage}</span>
            </label> : null}
            <input
                ref={ref}
                className={`input ${sizeConfig[inputSize]} ${border ? 'input-bordered' : ''} w-full max-w-xs ${errorMessage ? variantConfig['error'] : ''} ${variant ? variantConfig[variant] : ''}`}
                {...rest}
            />
            {labelPosition === 'bottom' ? <label className="label">
                <span className="label-text">{label}</span>
                <span className='label-text text-red-500'>{errorMessage}</span>
            </label> : null}
        </div>
    )
})

export default Input

const sizeConfig = {
    'xs': 'input-xs',
    'sm': 'input-sm',
    'md': 'input-md',
    'lg': 'input-lg'
} as const

const variantConfig = {
    'error': 'input-error',
    'warning': 'input-warning',
    'success': 'input-success',
    'primary': 'input-primary',
    'secondary': 'input-secondary',
    'accent': 'input-accent'
} as const