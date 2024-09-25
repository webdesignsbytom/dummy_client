import React from 'react';
// Icons
import { FaArrowCircleUp } from 'react-icons/fa';

function BackToTopButton() {
  return (
    <div className='grid rounded-full w-16 h-16 items-center justify-center'>
      <span>
        <FaArrowCircleUp />
      </span>
    </div>
  );
}

export default BackToTopButton;
