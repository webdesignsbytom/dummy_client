import React from 'react';
import SocialMediaPin from './SocialMediaPin';
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  GOOGLE_URL,
  GITHUB_URL,
  APPLE_URL,
  X_URL,
} from '../../utils/Constants';

// React Icons
import { FaFacebookF, FaInstagram, FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function SocialMediaCTA() {
  const navigateToSocialMedia = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socialMediaPins = [
    {
      serviceName: 'Facebook',
      icon: <FaFacebookF size={20} aria-hidden="true" focusable="false" />,
      url: FACEBOOK_URL,
      ariaLabel: 'Open Facebook in a new tab',
      title: 'Facebook',
    },
    {
      serviceName: 'Instagram',
      icon: <FaInstagram size={20} aria-hidden="true" focusable="false" />,
      url: INSTAGRAM_URL,
      ariaLabel: 'Open Instagram in a new tab',
      title: 'Instagram',
    },
    {
      serviceName: 'Google',
      icon: <FaGoogle size={20} aria-hidden="true" focusable="false" />,
      url: GOOGLE_URL,
      ariaLabel: 'Continue with Google',
      title: 'Google',
    },
    {
      serviceName: 'GitHub',
      icon: <FaGithub size={20} aria-hidden="true" focusable="false" />,
      url: GITHUB_URL,
      ariaLabel: 'Open GitHub in a new tab',
      title: 'GitHub',
    },
    {
      serviceName: 'Apple',
      icon: <FaApple size={20} aria-hidden="true" focusable="false" />,
      url: APPLE_URL,
      ariaLabel: 'Open Apple in a new tab',
      title: 'Apple',
    },
    {
      serviceName: 'X',
      icon: <FaXTwitter size={20} aria-hidden="true" focusable="false" />,
      url: X_URL,
      ariaLabel: 'Open X (Twitter) in a new tab',
      title: 'X (Twitter)',
    },
  ];

  return (
    <section className="grid w-fit mx-auto">
      <div className="grid grid-flow-col gap-2">
        {socialMediaPins.map((pin) => (
          <SocialMediaPin
            key={pin.serviceName}
            serviceName={pin.serviceName}
            icon={pin.icon}
            url={pin.url}
            ariaLabel={pin.ariaLabel}
            title={pin.title}
            className="text-white"
          />
        ))}
      </div>
    </section>
  );
}

export default SocialMediaCTA;
