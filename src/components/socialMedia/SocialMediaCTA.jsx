import React from 'react';
// Constants
import {
  FACEBOOK_SERVICE,
  INSTAGRAM_SERVICE,
  GOOGLE_SERVICE,
  GITHUB_SERVICE,
  APPLE_SERVICE,
  X_SERVICE,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  GOOGLE_URL,
  GITHUB_URL,
  APPLE_URL,
  X_URL,
} from '../../utils/Constants'; 
// Images
import FacebookLogo from '../../assets/images/media_icons/facebook_fb_social_media_logo_icon_64px.png';
import InstagramLogo from '../../assets/images/media_icons/instagram_camera_social_media_netowrking_logo_icon_64px.png';
import GoogleLogo from '../../assets/images/media_icons/google_brand_branding_logo_network_icon_64px.png';
import AppleLogo from '../../assets/images/media_icons/apple_computers_black_logo_icon_64px.png';
import GithubLogo from '../../assets/images/media_icons/github_code_octopus_logo_icon_64px.png';
import XLogo from '../../assets/images/media_icons/x_twitter_social_media_black_logo_icon_64px.png';
// Components
import SocialMediaPin from './SocialMediaPin';

function SocialMediaCTA() {
  const navigateToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  const socialMediaPins = [
    {
      serviceName: 'Facebook',
      icon: FacebookLogo,
      service: FACEBOOK_SERVICE,
      url: FACEBOOK_URL,
      background: { background: '#1877F2' },
    },
    {
      serviceName: 'Instagram',
      icon: InstagramLogo,
      service: INSTAGRAM_SERVICE,
      url: INSTAGRAM_URL,
      background: {
        background:
          'linear-gradient(45deg, #fccc63, #fbad50, #cd486b, #4c68d7)',
      },
    },
    {
      serviceName: 'Google',
      icon: GoogleLogo,
      service: GOOGLE_SERVICE,
      url: GOOGLE_URL,
      background: { background: '#4285F4' },
    },
    {
      serviceName: 'GitHub',
      icon: GithubLogo,
      service: GITHUB_SERVICE,
      url: GITHUB_URL,
      background: { background: '#333' },
    },
    {
      serviceName: 'Apple',
      icon: AppleLogo,
      service: APPLE_SERVICE,
      url: APPLE_URL,
      background: { background: '#000' },
    },
    {
      serviceName: 'X',
      icon: XLogo,
      service: X_SERVICE,
      url: X_URL,
      background: { background: '#1DA1F2' },
    },
  ];

  return (
    <section className='grid w-fit'>
      <div className='grid grid-flow-col gap-2'>
        {socialMediaPins.map((pin) => (
          <SocialMediaPin
            key={pin.serviceName}
            serviceName={pin.serviceName}
            icon={pin.icon}
            func={() => navigateToSocialMedia(pin.url)}
            background={pin.background}
          />
        ))}
      </div>
    </section>
  );
}

export default SocialMediaCTA;
