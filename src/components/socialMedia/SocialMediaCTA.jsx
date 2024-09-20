import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
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

function SocialMediaCTA() {
  const navigateToSocialMedia = (service) => {
    let url = '';

    switch (service) {
      case FACEBOOK_SERVICE:
        url = FACEBOOK_URL;
        break;
      case INSTAGRAM_SERVICE:
        url = INSTAGRAM_URL;
        break;
      case GOOGLE_SERVICE:
        url = GOOGLE_URL;
        break;
      case GITHUB_SERVICE:
        url = GITHUB_URL;
        break;
      case APPLE_SERVICE:
        url = APPLE_URL;
        break;
      case X_SERVICE:
        url = X_URL;
        break;
      default:
        console.log('Unsupported service');
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <section className='grid w-fit'>
      <div className='grid grid-flow-col gap-2'>
        <SocialMediaPin
          serviceName='Facebook'
          icon={FacebookLogo}
          func={() => navigateToSocialMedia(FACEBOOK_SERVICE)}
          background={{ background: '#1877F2' }}
        />

        <SocialMediaPin
          serviceName='Instagram'
          icon={InstagramLogo}
          func={() => navigateToSocialMedia(INSTAGRAM_SERVICE)}
          background={{
            background:
              'linear-gradient(45deg, #fccc63, #fbad50, #cd486b, #4c68d7)',
          }}
        />

        <SocialMediaPin
          serviceName='Google'
          icon={GoogleLogo}
          func={() => navigateToSocialMedia(GOOGLE_SERVICE)}
          background={{ background: '#4285F4' }}
        />

        <SocialMediaPin
          serviceName='GitHub'
          icon={GithubLogo}
          func={() => navigateToSocialMedia(GITHUB_SERVICE)}
          background={{ background: '#333' }}
        />

        <SocialMediaPin
          serviceName='Apple'
          icon={AppleLogo}
          func={() => navigateToSocialMedia(APPLE_SERVICE)}
          background={{ background: '#000' }}
        />

        <SocialMediaPin
          serviceName='X'
          icon={XLogo}
          func={() => navigateToSocialMedia(X_SERVICE)}
          background={{ background: '#1DA1F2' }}
        />
      </div>
    </section>
  );
}

const SocialMediaPin = ({ serviceName, func, icon }) => {
  return (
    <button onClick={func} className=''>
      <div className='grid items-center justify-center'>
        <img
          src={icon}
          alt={`${serviceName} webpage link icon for ${CompanyName}`}
          className='w-6 h-6'
        />
      </div>
    </button>
  );
};

export default SocialMediaCTA;
