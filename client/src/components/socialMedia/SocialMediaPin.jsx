import React from 'react';

function SocialMediaPin({ serviceName, icon, url, ariaLabel, title, className = '' }) {
  return (
    <a
      type="link"
      href={url}
      target='_blank'
      rel='noreferrer'
      aria-label={ariaLabel || `Open ${serviceName}`}
      title={title || serviceName}
      className={`p-2 rounded-lg grid items-center justify-center ${className}`}
    >
      <div className="grid items-center justify-center">
        {icon}
      </div>
    </a>
  );
}

export default SocialMediaPin;
