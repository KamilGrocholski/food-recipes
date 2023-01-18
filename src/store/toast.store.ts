import { create } from 'zustand'
import { type toastsUniqueIds } from '../components/common/Toast'

interface State<T = typeof toastsUniqueIds[number]>{
    toastList: Set<T>
    show: (id: T) => void
    close: (id: T) => void
    closeAll: () => void
}

export const useToastStore = create<State>((set, get) => ({
    toastList: new Set(),
    show: (id) => {
        const { toastList } = get()
        const newToastList = new Set(toastList)
        newToastList.add(id)
        set({
            toastList: newToastList
        })
    },
    close: (id) => {
        const { toastList } = get()
        const newToastList = new Set(toastList)
        newToastList.delete(id)
        set({
            toastList: newToastList
        })
    },
    closeAll: () => {
        set({
            toastList: new Set()
        })
    }
}))