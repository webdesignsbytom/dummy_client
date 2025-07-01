import React from 'react';
// Icons
import { FaSearch } from 'react-icons/fa';

function SearchBarComponent({ searchQuery, setSearchQuery, placeholder }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <section className='grid bg-colour9'>
      <div className='grid px-2 py-2'>
        <div className='bg-colour1 grid grid-cols-reg max-w-xl p-1 rounded-lg shadow-xl gap-1'>
          <div className='grid items-center justify-center px-1'>
            <div className='grid overflow-hidden min-w-max cursor-pointer'>
              <FaSearch />
            </div>
          </div>
          <input
            type='search'
            placeholder={placeholder}
            className='active:outline-none focus:outline-none min-w-10'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            value={searchQuery}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchBarComponent;
