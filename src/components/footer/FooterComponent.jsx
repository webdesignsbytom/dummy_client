import React from 'react';
import { NavLink } from 'react-router-dom';
// Constants
import { CompanyName, HOME_PAGE_URL } from '../../utils/Constants';
// Components
import FooterSocialCTA from './FooterSocialCTA';
// Images
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';
import { FooterLinksArray } from '../../utils/data/FooterData';

function FooterComponent() {
  return (
    <footer className='grid bg-alt-background w-full overflow-hidden font-poppins absolute bottom-0'>
      <div className='grid p-1'>
        <section className='grid justify-center text-center'>
          <div className='grid justify-center'>
            <NavLink to={HOME_PAGE_URL}>
              <img
                src={LogoWhite}
                alt={`${CompanyName} business logo - White Logo`}
                className='w-10 h-10 cursor-pointer active:scale-95'
                loading='lazy'
              />
            </NavLink>
          </div>
          <div>
            <span className='text-xl text-main-background'>{CompanyName}</span>
          </div>
        </section>

        <div className='grid grid-cols-2 px-4'>
          {/* Footer links */}
          <section className='grid'>
            <div>
              <ul>
                {FooterLinksArray.map((link, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={link.route}
                        aria-label={`${link.name} page navigation tab`}
                        className={`font-semibold`}
                        aria-current={({ isActive }) =>
                          isActive ? 'page' : undefined
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Social media links */}
          <FooterSocialCTA />
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
