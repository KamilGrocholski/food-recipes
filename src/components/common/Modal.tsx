import { Dialog } from "@headlessui/react"

interface ModalProps {
    isOpen: boolean
    close: () => void
    children: JSX.Element | JSX.Element[]
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    close,
    children
}) => {
    return (
        <Dialog open={isOpen} onClose={close}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                {children}

            </Dialog.Panel>
        </Dialog>
    )
}

export default Modal