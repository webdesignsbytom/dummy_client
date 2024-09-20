import React from 'react'
// Constants
import { CompanyName } from '../../utils/Constants';

function SocialMediaPin({ serviceName, func, icon }) {
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

export default SocialMediaPin