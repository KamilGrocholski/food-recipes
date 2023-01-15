import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputSize?: 'xs' | 'sm' | 'md' | 'lg'
    border?: boolean
    label?: string
    errorMessage?: string
    labelPosition?: 'top' | 'bottom'
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({
    inputSize = 'md',
    border = true,
    label,
    errorMessage,
    labelPosition = 'top',
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
                className={`input ${sizeConfig[inputSize]} ${border ? 'input-bordered' : ''} w-full max-w-xs ${errorMessage ? indicativeStateConfig['error'] : ''}`}
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

const indicativeStateConfig = {
    'error': 'input-error',
    'warning': 'input-warning',
    'success': 'input-success'
} as const