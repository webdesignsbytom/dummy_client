import React from 'react';
// Images
import FacebookLogo from '../../assets/images/media_icons/facebook_fb_social_media_logo_icon_64x.png';
import InstagramLogo from '../../assets/images/media_icons/instagram_camera_social_media_netowrking_logo_icon_64x.png';
import GoogleLogo from '../../assets/images/media_icons/google_brand_branding_logo_network_icon_64x.png';
import AppleLogo from '../../assets/images/media_icons/apple_computers_white_logo_icon_64x.png';
import GithubLogo from '../../assets/images/media_icons/github_code_octopus_logo_icon_64x.png';
import XLogo from '../../assets/images/media_icons/x_twitter_social_media_white_logo_icon_64x.png';

function SocialMediaAuth({ func, text }) {
  return (
    <section>
      <div className='grid gap-2'>
        {/* Facebook Button */}
        <SocialMediaButton
          serviceName='Facebook'
          text={text}
          icon={FacebookLogo}
          func={() => func('facebook')}
          background={{ background: '#1877F2' }}
        />

        {/* Instagram Button with Gradient */}
        <SocialMediaButton
          serviceName='Instagram'
          text={text}
          icon={InstagramLogo}
          func={() => func('instagram')}
          background={{
            background:
              'linear-gradient(45deg, #fccc63, #fbad50, #cd486b, #4c68d7)',
          }}
        />

        {/* Google Button */}
        <SocialMediaButton
          serviceName='Google'
          text={text}
          icon={GoogleLogo}
          func={() => func('google')}
          background={{ background: '#1185F4' }}
        />

        {/* GitHub Button */}
        <SocialMediaButton
          serviceName='GitHub'
          text={text}
          icon={GithubLogo}
          func={() => func('github')}
          background={{ background: '#333' }}
        />

        {/* Apple Button */}
        <SocialMediaButton
          serviceName='Apple'
          text={text}
          icon={AppleLogo}
          func={() => func('apple')}
          background={{ background: '#000' }}
        />

        {/* X Button (Twitter) */}
        <SocialMediaButton
          serviceName='X'
          text={text}
          icon={XLogo}
          func={() => func('x')}
          background={{ background: '#000' }}
        />
      </div>
    </section>
  );
}

const SocialMediaButton = ({ serviceName, func, background, text, icon }) => {
  return (
    <button
      onClick={func}
      style={background}
      className='p-2 rounded-lg text-white max-w-xl'
    >
      <div className='grid grid-cols-reg w-full mx-auto gap-4 px-1'>
        <div className='grid items-center justify-center'>
          <img src={icon} alt={`${serviceName} icon`} className='w-6 h-6' />
        </div>
        <div>{`${text} ${serviceName}`}</div>
      </div>
    </button>
  );
};

export default SocialMediaAuth;
