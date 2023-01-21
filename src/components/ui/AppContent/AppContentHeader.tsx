import Link from "next/link"
import useUi from "../../../store/ui.store"

const AppContentHeader = () => {

  const setIsSideNavOpen = useUi(state => state.setIsSideNavOpen)

  return (
    <header className='w-full sticky top-0 h-fit z-40 mb-12'>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <button onClick={() => setIsSideNavOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></button>
        </div>
        <div className="navbar-center">
          <Link href='/'>
            <span className="btn btn-ghost normal-case text-xl text-secondary">Recipes</span>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppContentHeader