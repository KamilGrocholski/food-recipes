import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

const BackgroundFillerModal: React.FC<{
    isOpen: boolean
    close: () => void
}> = ({
    isOpen,
    close
}) => {
        return (
            <Transition appear show={isOpen} as={Fragment}>

                <Dialog as='div' onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className='transition-all duration-500 ease-in-out fixed inset-0 bg-black/70'></div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        )
    }

export default BackgroundFillerModal