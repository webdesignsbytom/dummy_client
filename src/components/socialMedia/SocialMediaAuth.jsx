import React from 'react';
// Images
import FacebookLogo from '../../assets/images/media_icons/facebook_logo.png';
import InstagramLogo from '../../assets/images/media_icons/facebook_logo.png';
import GoogleLogo from '../../assets/images/media_icons/facebook_logo.png';
import AppleLogo from '../../assets/images/media_icons/facebook_logo.png';
import GithubLogo from '../../assets/images/media_icons/facebook_logo.png';
import XLogo from '../../assets/images/media_icons/facebook_logo.png';

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
          background={{ background: '#4285F4' }}
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
          background={{ background: '#1DA1F2' }}
        />
      </div>
    </section>
  );
}

const SocialMediaButton = ({ serviceName, func, background, text, icon }) => {
  return (
    <button onClick={func} style={background} className='p-2 rounded-lg text-white'>
      <div><div>{`${text} ${serviceName}`}</div><div><img src={icon} alt={`${serviceName} icon`} /></div></div>
    </button>
  );
};

export default SocialMediaAuth;
