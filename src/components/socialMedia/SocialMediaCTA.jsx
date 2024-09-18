import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Images
import FacebookLogo from '../../assets/images/media_icons/facebook_fb_social_media_logo_icon.png';
import InstagramLogo from '../../assets/images/media_icons/instagram_camera_social_media_netowrking_logo_icon.png';
import GoogleLogo from '../../assets/images/media_icons/google_brand_branding_logo_network_icon.png';
import AppleLogo from '../../assets/images/media_icons/apple_computers_black_logo_icon.png';
import GithubLogo from '../../assets/images/media_icons/github_code_octopus_logo_icon.png';
import XLogo from '../../assets/images/media_icons/x_twitter_social_media_black_logo_icon.png';

function SocialMediaCTA() {
  const navigateToSocialMedia = (service) => {
    console.log('ppp');
  };

  return (
    <section className='grid w-fit'>
      <div className='grid grid-flow-col gap-2'>
        {/* Facebook Button */}
        <SocialMediaPin
          serviceName='Facebook'
          icon={FacebookLogo}
          func={() => navigateToSocialMedia('facebook')}
          background={{ background: '#1877F2' }}
        />

        {/* Instagram Button with Gradient */}
        <SocialMediaPin
          serviceName='Instagram'
          icon={InstagramLogo}
          func={() => navigateToSocialMedia('instagram')}
          background={{
            background:
              'linear-gradient(45deg, #fccc63, #fbad50, #cd486b, #4c68d7)',
          }}
        />

        {/* Google Button */}
        <SocialMediaPin
          serviceName='Google'
          icon={GoogleLogo}
          func={() => navigateToSocialMedia('google')}
          background={{ background: '#4285F4' }}
        />

        {/* GitHub Button */}
        <SocialMediaPin
          serviceName='GitHub'
          icon={GithubLogo}
          func={() => navigateToSocialMedia('github')}
          background={{ background: '#333' }}
        />

        {/* Apple Button */}
        <SocialMediaPin
          serviceName='Apple'
          icon={AppleLogo}
          func={() => navigateToSocialMedia('apple')}
          background={{ background: '#000' }}
        />

        {/* X Button (Twitter) */}
        <SocialMediaPin
          serviceName='X'
          icon={XLogo}
          func={() => navigateToSocialMedia('x')}
          background={{ background: '#000' }}
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
