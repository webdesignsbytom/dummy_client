import React from 'react';
import { FaFacebookF, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
import SocialMediaPin from '../socialMedia/SocialMediaPin';
import {
  FACEBOOK_BUSINESS_URL,
  GITHUB_BUSINESS_URL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_BUSINESS_URL,
} from '../../utils/Constants';

function FooterSocialCTA() {
  const navigateToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  const socialMediaLinks = [
    {
      serviceName: 'Facebook',
      icon: <FaFacebookF size={24} />,
      url: FACEBOOK_BUSINESS_URL,
    },
    {
      serviceName: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: INSTAGRAM_BUSINESS_URL,
    },
    {
      serviceName: 'Google',
      icon: <FaGoogle size={24} />,
      url: GOOGLE_BUSINESS_URL,
    },
    {
      serviceName: 'GitHub',
      icon: <FaGithub size={24} />,
      url: GITHUB_BUSINESS_URL,
    },
  ];

  return (
    <section className='grid justify-center'>
      <div className='grid grid-flow-col w-fit gap-1'>
        {socialMediaLinks.map((social) => (
          <SocialMediaPin
            key={social.serviceName}
            serviceName={social.serviceName}
            icon={social.icon}
            func={() => navigateToSocialMedia(social.url)}
          />
        ))}
      </div>
    </section>
  );
}

export default FooterSocialCTA;
