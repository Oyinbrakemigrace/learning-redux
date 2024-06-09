import React from "react";
import { MobileNavigation } from "../constants/navigation";
import { NavLink } from "react-router-dom";

function MobileNav() {
  return (
    <section className="lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full text-neutral-400 px-2">
      <div className="flex items-center justify-between h-full">
        {MobileNavigation.map((nav, index) => {
          return (
            <NavLink
              to={nav.href}
              key={nav.label + "mobileNavigation"}
              className={({ isActive }) =>
                `px-3 h-full flex flex-col justify-center items-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div>{nav.icon}</div>
              <p>{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default MobileNav;
