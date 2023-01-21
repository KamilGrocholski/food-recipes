import { create } from 'zustand'

interface State {
    isSideNavOpen: boolean
    setIsSideNavOpen: (bool: boolean) => void

    isSearchModalOpen: boolean
    setIsSearchModalOpen: (bool: boolean) => void
}

const useUi = create<State>(set => ({
    isSideNavOpen: false,
    setIsSideNavOpen: (bool) => set(() => ({ isSideNavOpen: bool })),

    isSearchModalOpen: false,
    setIsSearchModalOpen: (bool) => set(() => ({ isSearchModalOpen: bool })) 
}))

export default useUi