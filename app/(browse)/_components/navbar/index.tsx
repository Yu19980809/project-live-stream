import Logo from './logo'
import Search from './search'
import Actions from './actions'

const Navbar = () => {
  return (
    <nav className="fixed top-0 flex justify-between items-center w-full h-20 px-2 lg:px-4 shadow-sm bg-[#252731] z-[49]">
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
}

export default Navbar
