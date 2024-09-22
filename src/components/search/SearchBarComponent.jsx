import React, { useState } from 'react';
// Icons
import { FaSearch } from 'react-icons/fa';

function SearchBarComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('searchQuery', searchQuery);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Search submitted with query: ', searchQuery);
  };

  return (
    <div className='bg-slate-400 p-2'>
      <div className='bg-white grid grid-cols-reg max-w-xl p-1 rounded-lg shadow-xl gap-1'>
        <div className='grid items-center justify-center px-1'>
          <div className='grid overflow-hidden min-w-max cursor-pointer'>
            <FaSearch onClick={handleSubmit} />
          </div>
        </div>
        <input
          type='text'
          placeholder='Search...'
          className='active:outline-none focus:outline-none min-w-10'
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress} // Listening for Enter key
          value={searchQuery}
        />
      </div>
    </div>
  );
}

export default SearchBarComponent;
