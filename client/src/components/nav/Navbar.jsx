import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa6';
// Images
import MainLogoImage from '../../assets/images/logos/byte-toast-studio-logo-web-developer-transparent-svg.svg';
// Context
import { useUser } from '../../context/UserContext';
// Constants
import { HOME_PAGE_URL } from '../../utils/Routes';
import { CompanyName } from '../../utils/Constants';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';
// Data
import { getNavLinkItemsArray } from '../../utils/data/NavData';
// Utils
import { removeToken } from '../../utils/user/token';

function Navbar() {
  const { user, setUser } = useUser();
  const navigateToPage = useNavigateToPage();
  const navLinkItemsArray = getNavLinkItemsArray(user);

  const [isPhoneNavOpen, setIsPhoneNavOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null); // track which dropdown is open on mobile

  const togglePhoneNav = () => setIsPhoneNavOpen((prev) => !prev);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser({});
    removeToken();
    navigateToPage(HOME_PAGE_URL, { replace: true });
  };

  const handleMobileDropdownToggle = (label) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className="relative bg-colour2 shadow-md h-fit"
    >
      <section className="grid grid-cols-reg px-4 py-4">
        <section>
          <NavLink to={HOME_PAGE_URL}>
            <img
              src={MainLogoImage}
              alt={`${CompanyName} business logo - White Logo`}
              className="min-w-10 w-10 h-10 cursor-pointer active:scale-95"
            />
          </NavLink>
        </section>

        <section className="grid justify-end">
          {/* Mobile menu button */}
          <button
            aria-label="Toggle navigation menu"
            onClick={togglePhoneNav}
            className="grid md:hidden w-fit h-fit items-center justify-center text-4xl text-white cursor-pointer"
          >
            <IoMdMenu className="active:scale-90 duration-300" />
          </button>

          {/* Desktop navigation */}
          <ul className="hidden lg:grid grid-flow-col gap-6 items-center text-orange-600">
            {navLinkItemsArray.map(({ path, label, subpages }) =>
              subpages ? (
                <li key={label} className="relative group">
                  <span
                    className="text-xl md:text-sm text-colour1 font-semibold font-titleFont hover:brightness-90 duration-200 active:scale-75 cursor-pointer grid grid-flow-col items-center gap-2"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {label}
                    <span className="grid items-center">
                      <FaChevronDown className="text-colour1" />
                    </span>
                  </span>

                  {/* Dropdown menu (desktop hover) */}
                  <ul
                    className="absolute left-0 top-full grid gap-2 bg-colour2 shadow-cardShadowBold rounded-md p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 min-w-32"
                    role="menu"
                    aria-label={`${label} submenu`}
                  >
                    {subpages.map(({ path: sp, label: sl }) => (
                      <div key={sl} className="grid border-b border-solid border-colour2 last:border-none">
                        <NavItem url={sp} title={sl} />
                      </div>
                    ))}
                  </ul>
                </li>
              ) : (
                <NavItem key={label} url={path} title={label} />
              )
            )}

            {user?.email && (
              <li>
                <button
                  className="text-xl md:text-sm text-colour1 font-semibold font-titleFont hover:brightness-90 duration-200 active:scale-75"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </section>
      </section>

      {/* Mobile navigation */}
      <section
        className={`phone-nav absolute top-full bg-colour2 left-0 w-full bg-nav-background transition-transform duration-300 ${
          isPhoneNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <ul className="grid gap-8 items-center justify-center text-center text-orange-600 py-10">
          {navLinkItemsArray.map(({ path, label, subpages }) =>
            subpages ? (
              <li key={label} className="grid gap-2">
                <button
                  onClick={() => handleMobileDropdownToggle(label)}
                  className="grid grid-flow-col gap-3 justify-center items-center text-xl md:text-lg text-colour1 font-semibold font-titleFont hover:brightness-90 duration-200 active:scale-75"
                  aria-haspopup="true"
                  aria-expanded={openMobileDropdown === label}
                  aria-controls={`mobile-submenu-${label}`}
                >
                  <span>{label}</span>
                  <span
                    className={`grid transition-transform duration-300 ${
                      openMobileDropdown === label ? 'rotate-180' : ''
                    }`}
                  >
                    <FaChevronDown />
                  </span>
                </button>

                {openMobileDropdown === label && (
                  <ul
                    id={`mobile-submenu-${label}`}
                    className="grid gap-4 bg-colour2 py-6 shadow-md shadow-colour2/50"
                    role="menu"
                    aria-label={`${label} submenu`}
                  >
                    {subpages.map(({ path: sp, label: sl }) => (
                      <NavItem key={sl} url={sp} title={sl} />
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <NavItem key={label} url={path} title={label} />
            )
          )}

          {user?.email && (
            <li>
              <button
                className="text-xl md:text-sm text-colour1 font-semibold font-titleFont hover:brightness-90 duration-200 active:scale-75"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </section>
    </nav>
  );
}

const NavItem = ({ url, title }) => (
  <li className="active:scale-90">
    <NavLink
      to={url}
      aria-label={`${title} page navigation tab`}
      className="text-xl md:text-sm text-colour1 font-semibold font-titleFont hover:brightness-90 duration-200 active:scale-75"
      aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
      style={({ isActive }) => (isActive ? { color: '#f8fafc' } : {})}
    >
      {title}
    </NavLink>
  </li>
);

export default Navbar;
