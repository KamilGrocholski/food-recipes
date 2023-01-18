import { useToastStore } from "../store/toast.store"
import { shallow } from 'zustand/shallow'

export const useToastControls = () => {
    const controls = useToastStore(
        store => ({
            show: store.show,
            close: store.close,
            closeAll: store.closeAll
        }),
        shallow
    )

    return controls
}