import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
// Icons
import { IoMdMenu } from 'react-icons/io';
// Images
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';
// Context
import { useUser } from '../../context/UserContext';
// Constants
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
  const [animationClass, setAnimationClass] = useState('');

  const animationInProgress = useRef(false);

  useEffect(() => {
    // Reset animation class when location changes
    setAnimationClass('');
  }, []);

  const togglePhoneNav = () => {
    // if (animationInProgress.current) {
    //   return;
    // }
    setIsPhoneNavOpen(!isPhoneNavOpen);
    // animationInProgress.current = true;

    // if (isPhoneNavOpen) {
    //   setAnimationClass('animate_close_nav');
    //   setTimeout(() => {
    //     setIsPhoneNavOpen(false);
    //     animationInProgress.current = false;
    //   }, 1200); // Duration of the closeNav animation
    // } else {
    //   setAnimationClass('animate_open_nav');
    //   setIsPhoneNavOpen(true);
    //   setTimeout(() => {
    //     animationInProgress.current = false;
    //   }, 1200); // Duration of the openNav animation
    // }
  };

  return (
    <nav
      role='navigation'
      aria-label='Main Navigation'
      className='relative grid bg-nav-background'
    >
      <div className='grid grid-cols-reg px-4 py-4'>
        <section>
          <div className='grid h-fit items-center justify-center'>
            <NavLink to={HOME_PAGE_URL}>
              <img
                src={LogoWhite}
                alt={`${CompanyName} business logo - White Logo`}
                className='w-10 h-10 cursor-pointer active:scale-95'
                loading='lazy'
              />
            </NavLink>
          </div>
        </section>

        <section className='grid justify-end'>
          {/* Mobile screen */}
          <section className='grid md:hidden items-center justify-end h-full'>
            <button
              onClick={togglePhoneNav}
              aria-label='Toggle navigation menu'
              className='grid w-fit h-fit items-center justify-center text-4xl text-white dark:text-dark-text-light active:brightness-90'
            >
              <IoMdMenu className='active:scale-90 duration-300' />
            </button>
          </section>

          {/* Large screen */}
          <ul className='hidden md:grid grid-flow-col gap-6 items-center text-orange-600'>
            <NavItem url={HOME_PAGE_URL} title={'Home'} />
            <NavItem url={LOGIN_PAGE_URL} title={'Login'} />
            <NavItem url={SIGN_UP_PAGE_URL} title={'SignUp'} />

            {/* Secure routes */}
            {user?.role === ('ADMIN' || 'DEVELOPER') && (
              <NavItem url={ADMIN_PAGE_URL} title={'Admin'} />
            )}
          </ul>
        </section>
      </div>

      {/* Phone navbar when active */}
      {isPhoneNavOpen && (
        <div
          className={`grid z-40 absolute top-[100%] bg-nav-background h-fit w-full pb-6`}
        >
          <ul className='grid gap-6 items-center justify-center text-center text-orange-600'>
            <NavItem url={HOME_PAGE_URL} title={'Home'} />
            <NavItem url={LOGIN_PAGE_URL} title={'Login'} />
            <NavItem url={SIGN_UP_PAGE_URL} title={'SignUp'} />

            {/* Secure routes */}
            {user?.role === ('ADMIN' || 'DEVELOPER') && (
              <NavItem url={ADMIN_PAGE_URL} title={'Admin'} />
            )}
          </ul>
        </div>
      )}
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
          return isActive ? { color: '#f8fafc' } : {};
        }}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navbar;
