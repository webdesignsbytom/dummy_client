import React from 'react';
import { NavLink } from 'react-router-dom';
// Constants
import { CompanyName, HOME_PAGE_URL } from '../../utils/Constants';
// Components
import FooterSocialCTA from './FooterSocialCTA';
// Images
import LogoWhite from '../../assets/images/logos/tech-design-tavistock-logo-white.svg';

function FooterComponent() {
  return (
    <footer className='grid bg-alt-background w-full overflow-hidden absolute bottom-0'>
      <div className='grid p-1'>
        <section>
          <div>
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
        <FooterSocialCTA />
      </div>
    </footer>
  );
}

export default FooterComponent;
