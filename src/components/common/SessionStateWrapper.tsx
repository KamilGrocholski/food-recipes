import { signIn, useSession } from "next-auth/react"

interface SessionStateWrapperProps {
    LoggedIn: (user: ReturnType<typeof useSession>) => JSX.Element
    NotLoggedIn: (signIn: () => void) => JSX.Element
}

const SessionStateWrapper: React.FC<SessionStateWrapperProps> = ({
    LoggedIn,
    NotLoggedIn
}) => {
    const session = useSession()

    const handleSignIn = () => signIn('google', { callbackUrl: 'http://localhost:3000' })

    if (session.data) return LoggedIn(session)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return NotLoggedIn(handleSignIn)
}

export default SessionStateWrapper