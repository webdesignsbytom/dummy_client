import React from 'react';

function SocialMediaPin({ serviceName, func, icon }) {
  return (
    <button onClick={func} className=''>
      <div className='grid items-center justify-center'>{icon}</div>
    </button>
  );
}

export default SocialMediaPin;
