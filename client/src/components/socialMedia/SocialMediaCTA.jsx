import React from 'react';
// Components
import SocialMediaPin from './SocialMediaPin';
// Data
import { socialMediaLinks } from '../../utils/data/SocialMediaData';

function SocialMediaCTA() {
  return (
    <section className='grid w-fit mx-auto'>
      <div className='grid grid-flow-col gap-2'>
        {socialMediaLinks.map((pin) => (
          <SocialMediaPin
            key={pin.serviceName}
            serviceName={pin.serviceName}
            icon={pin.icon}
            url={pin.url}
            ariaLabel={pin.ariaLabel}
            title={pin.title}
            className='text-white'
          />
        ))}
      </div>
    </section>
  );
}

export default SocialMediaCTA;
