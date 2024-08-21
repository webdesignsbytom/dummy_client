import React from 'react';
import { NavLink } from 'react-router-dom';
// Images
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';
// Constants
import {
  CompanyName,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from '../../utils/Constants';

function Navbar() {
  return (
    <nav role="navigation" aria-label="Main Navigation" className='grid bg-slate-700'>
      <div className='grid grid-cols-reg px-4 py-2'>
        <section>
          <div className='grid h-fit items-center justify-center'>
            <NavLink to={HOME_PAGE_URL}>
              <img
                src={LogoWhite}
                alt={`${CompanyName} business logo - White Logo`}
                className='w-12 h-12 cursor-pointer active:scale-95'
                loading='lazy'
              />
            </NavLink>
          </div>
        </section>

        <section className='grid justify-end'>
          <ul className='grid grid-flow-col gap-6 items-center text-orange-600'>
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
    <li className='active:scale-90'>
      <NavLink
        to={url}
        aria-label={`${title} page navigation tab`}
        className={`text-lg font-semibold font-poppins hover:brightness-90 duration-200 active:scale-75`}
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
        style={({ isActive }) => {
          return isActive ? { color: 'white' } : {};
        }}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navbar;
