const Divider: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`divider ${className ? className : ''}`} />
    )
}

export default Divider