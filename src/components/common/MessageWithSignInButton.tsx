import Button from "./Button"

const MessageWithSignInButton: React.FC<{
    signIn: () => void
    message: string
}> = ({
    signIn,
    message
}) => {
        return (
            <span className='m-3'>
                <Button
                    content='Sign in'
                    size='xs'
                    onClick={signIn}
                    className='mr-1'
                />
                {message}
            </span>
        )
    }

export default MessageWithSignInButton