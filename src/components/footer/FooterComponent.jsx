import React from 'react';
import { NavLink } from 'react-router-dom';
// Constants
import {
  CompantTagLine,
  CompanyName,
  CompanyPhoneNumber,
  ContactEmailAddress,
  HOME_PAGE_URL,
} from '../../utils/Constants';
// Components
import FooterSocialCTA from './FooterSocialCTA';
// Images
import { FooterLinksArray } from '../../utils/data/FooterData';
import { MainServicesArray } from '../../utils/data/CompanyData';

function FooterComponent() {
  return (
    <footer className='grid bg-alt-background w-full overflow-hidden py-6 md:py-12 px-6 md:px-20 font-poppins'>
      <div className='grid md:grid-cols-3 mx-auto gap-6 bg-white px-2 md:px-10 py-8 w-full'>
        {/* Logo section */}
        <section className='grid h-fit my-auto gap-4 py-2 w-full'>
          <div className='grid items-center justify-center'>
            <h4 className='grid md:hidden h-fit w-fit border-colour5 border-solid border-2 rounded-lg px-4 py-1 overflow-hidden'>
              {/* Company Logo */}
              <div className='flex w-fit h-fit items-center'>
                <div className='leading-3 grid items-center text-2xl h-fit font-medium text-colour5'>
                  <div className='pl-2'>BYTE</div>
                  <div>TOAST</div>
                </div>
                <div className=''>
                  <span className='text-2xl'>STUDIO</span>
                </div>
              </div>
            </h4>
            <h4 className='hidden md:grid h-fit w-fit border-colour5 border-solid border-2 rounded-lg px-2 py-1.5 overflow-hidden'>
              {/* Company Logo */}
              <div className='flex w-fit h-fit items-center'>
                <div className='leading-6 grid items-center text-3xl h-fit font-medium text-colour5'>
                  <div className='pl-2'>BYTE</div>
                  <div>TOAST</div>
                </div>
                <div className=''>
                  <span className='text-6xl'>STUDIO</span>
                </div>
              </div>
            </h4>
          </div>
          <div className='text-center'>
            <p className='text-sm'>{CompantTagLine}</p>
          </div>
          <FooterSocialCTA />
        </section>

        {/* Footer links */}
        <section className='grid grid-cols-2 px-2 gap-2 w-full'>
          <div className='grid grid-rows-reg w-full md:justify-center text-center'>
            <div className='text-left w-full'>
              <h6>Quick Links</h6>
              <div className='border-b-2 border-solid border-colour5 pt-2 mb-2'></div>
            </div>
            <ul className='text-left w-full'>
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

          <div className='grid grid-rows-reg justify-center text-center'>
            <div className='text-left'>
              <h6>Services</h6>
              <div className='border-b-2 border-solid border-colour5 pt-2 mb-2'></div>
            </div>
            <ul className='text-left'>
              {MainServicesArray.map((service) => {
                return (
                  <li key={service.label} className={`font-semibold`}>
                    {service.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Social media links */}
        <section className='grid grid-rows-reg gap-2 w-fit px-2'>
          <div className='text-left'>
            <h6>Contact</h6>
            <div className='border-b-2 border-solid border-colour5 pt-2 mb-2'></div>
          </div>

          <div className='grid gap-1 h-fit'>
            <div>
              <a href={`mailto:${ContactEmailAddress}`}>
                <p>
                  <span className='font-semibold'>Email: </span>
                  {ContactEmailAddress}
                </p>
              </a>
            </div>
            <div>
              <a href={`tel:${CompanyPhoneNumber}`}>
                <p>
                  <span className='font-semibold'>Phone: </span>+
                  {CompanyPhoneNumber} (UK)
                </p>
              </a>
            </div>
            <div>
              <p>
                <span className='font-semibold'>Location: </span> Tavistock,
                Devon, United Kingdom
              </p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default FooterComponent;
