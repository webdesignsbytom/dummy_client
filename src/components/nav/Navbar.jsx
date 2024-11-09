import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';
import { useUser } from '../../context/UserContext';
import {
  ADMIN_PAGE_URL,
  CompanyName,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from '../../utils/Constants';

function Navbar() {
  const { user } = useUser();
  const [isPhoneNavOpen, setIsPhoneNavOpen] = useState(false);

  const togglePhoneNav = () => {
    setIsPhoneNavOpen((prev) => !prev);
  };

  return (
    <nav
      role='navigation'
      aria-label='Main Navigation'
      className='relative bg-nav-background shadow-md'
    >
      <div className='grid grid-cols-reg px-4 py-4'>
        <section>
          <NavLink to={HOME_PAGE_URL}>
            <img
              src={LogoWhite}
              alt={`${CompanyName} business logo - White Logo`}
              className='w-10 h-10 cursor-pointer active:scale-95'
            />
          </NavLink>
        </section>

        <section className='grid justify-end'>
          {/* Mobile screen */}
          <button
            aria-label='Toggle navigation menu'
            onClick={togglePhoneNav}
            className='grid md:hidden w-fit h-fit items-center justify-center text-4xl text-white cursor-pointer'
          >
            <IoMdMenu className='active:scale-90 duration-300' />
          </button>

          {/* Large screen */}
          <ul className='hidden md:grid grid-flow-col gap-6 items-center text-orange-600'>
            <NavItem url={HOME_PAGE_URL} title={'Home'} />
            <NavItem url={LOGIN_PAGE_URL} title={'Login'} />
            <NavItem url={SIGN_UP_PAGE_URL} title={'SignUp'} />

            {user?.role === ('ADMIN' || 'DEVELOPER') && (
              <NavItem url={ADMIN_PAGE_URL} title={'Admin'} />
            )}
          </ul>
        </section>
      </div>

      {/* Phone navbar */}
      <div
        className={`phone-nav absolute top-full left-0 w-full bg-nav-background transition-transform duration-300 ${
          isPhoneNavOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <ul className='grid gap-8 items-center justify-center text-center text-orange-600 py-10'>
          <NavItem url={HOME_PAGE_URL} title={'Home'} />
          <NavItem url={LOGIN_PAGE_URL} title={'Login'} />
          <NavItem url={SIGN_UP_PAGE_URL} title={'SignUp'} />

          {user?.role === ('ADMIN' || 'DEVELOPER') && (
            <NavItem url={ADMIN_PAGE_URL} title={'Admin'} />
          )}
        </ul>
      </div>
    </nav>
  );
}

const NavItem = ({ url, title }) => {
  return (
    <li className='active:scale-90'>
      <NavLink
        to={url}
        aria-label={`${title} page navigation tab`}
        className='text-xl md:text-lg font-semibold font-poppins hover:brightness-90 duration-200 active:scale-75'
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
        style={({ isActive }) => {
          return isActive ? { color: '#f8fafc' } : {};
        }}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navbar;
