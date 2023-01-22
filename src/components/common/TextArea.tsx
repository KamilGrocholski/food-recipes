import { forwardRef, type TextareaHTMLAttributes } from "react"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputSize?: 'xs' | 'sm' | 'md' | 'lg'
    border?: boolean
    label?: string
    errorMessage?: string
    labelPosition?: 'top' | 'bottom'
}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    inputSize = 'md',
    border = true,
    label,
    errorMessage,
    labelPosition = 'top',
    ...rest
}, ref) => {
    return (
        <div className="form-control w-full">
            {labelPosition === 'top' ? <label className="label">
                <span className="label-text">{label}</span>
                <span className='label-text text-red-500'>{errorMessage}</span>
            </label> : null}
            <textarea
                ref={ref}
                className={`textarea ${sizeConfig[inputSize]} ${border ? 'textarea-bordered' : ''} w-full ${errorMessage ? indicativeStateConfig['error'] : ''}`}
                {...rest}
            />
            {labelPosition === 'bottom' ? <label className="label">
                <span className="label-text">{label}</span>
                <span className='label-text text-red-500'>{errorMessage}</span>
            </label> : null}
        </div>
    )
})

export default TextArea

const sizeConfig = {
    'xs': 'textarea-xs',
    'sm': 'textarea-sm',
    'md': 'textarea-md',
    'lg': 'textarea-lg'
} as const

const indicativeStateConfig = {
    'error': 'textarea-error',
    'warning': 'textarea-warning',
    'success': 'textarea-success'
} as const