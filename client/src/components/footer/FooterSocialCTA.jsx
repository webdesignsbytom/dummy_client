import React from 'react';
// Data
import SocialMediaPin from '../socialMedia/SocialMediaPin';
// Components
import { socialMediaLinks } from '../../utils/data/SocialMediaData';

function FooterSocialCTA() {
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
