import Button from "./Button"

const MessageWithSignInButton: React.FC<{
    signIn: () => void
    message: string
}> = ({
    signIn,
    message,
}) => {
        return (
            <span className='m-3'>
                <Button
                    content='Sign in'
                    size='sm'
                    onClick={signIn}
                    className='mr-1'
                />
                <span className='text-lg'>{message}</span>
            </span>
        )
    }

export default MessageWithSignInButton
