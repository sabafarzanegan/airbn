import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8 border-b mb-6">
      <Logo />
      <NavSearch />
      <DarkMode />
      <LinksDropdown />
    </nav>
  );
}

export default Navbar;
