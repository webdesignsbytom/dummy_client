import React from 'react';
import { NavLink } from 'react-router-dom';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';
// Images
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';
// Constants
import { HOME_PAGE_URL, LOGIN_PAGE_URL, SIGN_UP_PAGE_URL } from '../../utils/Constants';

function Navbar() {
  const navigateToPage = useNavigateToPage();

  return (
    <nav className='grid bg-slate-700'>
      <div className='grid grid-cols-reg px-4 py-2'>
        <section>
          <div className='grid h-fit items-center justify-center'>
            <img
              src={LogoWhite}
              onClick={() => navigateToPage(HOME_PAGE_URL)}
              alt='Tech design by Tom logo'
              className='w-12 h-12 cursor-pointer active:scale-95'
              loading='lazy'
            />
          </div>
        </section>

        <section className='grid justify-end'>
          <ul className='grid grid-flow-col gap-2 items-center text-orange-600'>
            <NavItem url={HOME_PAGE_URL} title={'Home'} />
            <NavItem url={LOGIN_PAGE_URL} title={'Login'} />
            <NavItem url={SIGN_UP_PAGE_URL} title={'SignUp'} />
          </ul>
        </section>
      </div>
    </nav>
  );
}

const NavItem = ({ url, title }) => {
  return (
    <li>
      <NavLink
        to={url}
        style={({ isActive }) => {
          return isActive ? { color: 'white' } : {};
        }}
      >
        {title}
      </NavLink>{' '}
    </li>
  );
};

export default Navbar;
