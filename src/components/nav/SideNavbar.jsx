import React, { useRef } from 'react';
import { CompanyName } from '../../utils/Constants';

function SideNavbar() {
  const toggleRef = useRef();
  const navRef = useRef();

  const toggleSidebar = () => {
    toggleRef.current.classList.toggle('rotate');
    navRef.current.classList.toggle('close');
  };

  return (
    <nav
      id='sidenav_container'
      ref={navRef}
      className={`grid border-r-2 border-solid border-border-main-dark`}
    >
      <ul>
        <li>
          <div className='grid grid-cols-rev p-1 items-center'>
            <span className='logo pl-2'>{CompanyName}</span>
            <button
              onClick={toggleSidebar}
              id='toggle-btn'
              ref={toggleRef}
              className='bg-none rounded-full hover:bg-hover-colour-dark mx-auto p-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 -960 960 960'
                width='24px'
                fill='#e8eaed'
              >
                <path d='m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z' />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavbar;