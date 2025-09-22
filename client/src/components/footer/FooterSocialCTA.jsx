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
  const socialMediaLinks = [
    {
      serviceName: 'Facebook',
      icon: <FaFacebookF size={24} />,
      url: FACEBOOK_URL,
      ariaLabel: 'Open Fetlife profile in a new tab',
      title: 'Fetlife',
    },
    {
      serviceName: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: INSTAGRAM_URL,
      ariaLabel: 'Open Fetlife profile in a new tab',
      title: 'Fetlife',
    },
    {
      serviceName: 'Google',
      icon: <FaGoogle size={24} />,
      url: GOOGLE_URL,
      ariaLabel: 'Open Fetlife profile in a new tab',
      title: 'Fetlife',
    },
    {
      serviceName: 'GitHub',
      icon: <FaGithub size={24} />,
      url: GITHUB_URL,
      ariaLabel: 'Open Fetlife profile in a new tab',
      title: 'Fetlife',
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
            url={social.url}
            ariaLabel={social.ariaLabel}
            title={social.title}
          />
        ))}
      </div>
    </section>
  );
}

export default FooterSocialCTA;
