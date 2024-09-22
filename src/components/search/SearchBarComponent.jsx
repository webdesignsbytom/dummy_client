import React from 'react';
// Icons
import { FaSearch } from 'react-icons/fa';

function SearchBarComponent() {
  return (
    <div className='bg-slate-400 p-2'>
      <div className='bg-white grid max-w-xl p-1 rounded-lg shadow-xl grid-cols-reg gap-1'>
        <div className='grid items-center justify-center px-1'>
          <div className='grid overflow-hidden'>
            <FaSearch />
          </div>
        </div>
        <input
          type='text'
          placeholder='Search...'
          className='active:outline-none focus:outline-none'
        />
      </div>
    </div>
  );
}

export default SearchBarComponent;
