import React from 'react';
// Images
import FacebookLogo from '../../assets/images/media_icons/facebook_fb_social_media_black_logo_icon_48px.png';
import InstagramLogo from '../../assets/images/media_icons/instagram_camera_social_media_netowrking_logo_icon_48px.png';
import GoogleLogo from '../../assets/images/media_icons/google_brand_branding_logo_network_black_icon_48px.png';
import GithubLogo from '../../assets/images/media_icons/github_code_octopus_black_logo_icon_48px.png';
import SocialMediaPin from '../socialMedia/SocialMediaPin';
// Components

function FooterSocialCTA() {
  const navigateToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  const socialMediaLinks = [
    {
      serviceName: 'Facebook',
      icon: FacebookLogo,
      url: 'https://www.facebook.com',
    },
    {
      serviceName: 'Instagram',
      icon: InstagramLogo,
      url: 'https://www.instagram.com',
    },
    {
      serviceName: 'Google',
      icon: GoogleLogo,
      url: 'https://www.google.com',
    },
    {
      serviceName: 'GitHub',
      icon: GithubLogo,
      url: 'https://www.github.com',
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
