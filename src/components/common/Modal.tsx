import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Divider from "./Divider"

interface ModalProps {
    isOpen: boolean
    close: () => void
    children: JSX.Element | JSX.Element[]
    title?: string
    description?: string
    divider?: boolean
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    close,
    children,
    title,
    description,
    divider = true
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4 shadow-2xl shadow-black/80">
                                <Dialog.Title as='div' className='prose mb-4'><h3>{title}</h3></Dialog.Title>
                                <Dialog.Description as='div' className='prose text-left'><h5>{description}</h5></Dialog.Description>
                                {divider ? <Divider /> : null}

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal