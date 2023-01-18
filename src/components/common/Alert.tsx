import { Icons } from "../../assets/icons"

interface AlertProps {
    variant: keyof typeof variantConfig
}

const Alert: React.FC<AlertProps> = ({
    variant
}) => {
    return (
        <div className={`alert ${variantConfig[variant]} shadow-lg`}>
            <div>
                {iconConfig[variant]}
                <span>New software update available.</span>
            </div>
        </div>
    )
}

export default Alert

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