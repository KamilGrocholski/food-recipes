import { create } from 'zustand'

interface State {
    isSideNavOpen: boolean
    setIsSideNavOpen: (bool: boolean) => void
}

const useUi = create<State>(set => ({
    isSideNavOpen: true,
    setIsSideNavOpen: (bool) => set(() => ({ isSideNavOpen: bool }))
}))

export default useUi