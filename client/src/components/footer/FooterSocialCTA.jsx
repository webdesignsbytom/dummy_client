import React from 'react';
import { FaFacebookF, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
import SocialMediaPin from '../socialMedia/SocialMediaPin';
import {
  FACEBOOK_URL,
  GITHUB_URL,
  GOOGLE_URL,
  INSTAGRAM_URL,
} from '../../utils/Constants';

function FooterSocialCTA() {
  const navigateToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  const socialMediaLinks = [
    {
      serviceName: 'Facebook',
      icon: <FaFacebookF size={24} />,
      url: FACEBOOK_URL,
    },
    {
      serviceName: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: INSTAGRAM_URL,
    },
    {
      serviceName: 'Google',
      icon: <FaGoogle size={24} />,
      url: GOOGLE_URL,
    },
    {
      serviceName: 'GitHub',
      icon: <FaGithub size={24} />,
      url: GITHUB_URL,
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
