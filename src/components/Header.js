import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { navItems } from "../constants/navigation";

function Header() {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3).split("%20").join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  return (
    <header className="fixed top-0 w-full h-16 bg-deep-navy bg-opacity-50 z-40">
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to="/">
          <img src={logo} alt="logo" width={130} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navItems.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-200 ${
                      isActive && "text-neutral-200 font-bold"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-6 px-2">
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="hidden lg:block">
              <FaSearch size={26} />
            </button>
          </form>
          {/* <div className="cursor-pointer active:scale-50 transition-all">
            <FaUser size={26} />
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
