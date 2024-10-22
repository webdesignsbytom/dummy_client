import React, { useState, useMemo } from 'react';
// Icons
import { FaSearch } from 'react-icons/fa';

const searchTerms = ['hello', 'world', 'cat', 'book', 'cheese'];

function SearchBarComponent() {
  const [items, setItems] = useState(searchTerms);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('searchQuery', searchQuery);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [items, searchQuery]) 

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (searchQuery === '') return;

    console.log('Search submitted with query: ', searchQuery);
  };

  return (
    <>
      <div className='bg-slate-400 p-2'>
        <div className='bg-white grid grid-cols-reg max-w-xl p-1 rounded-lg shadow-xl gap-1'>
          <div className='grid items-center justify-center px-1'>
            <div className='grid overflow-hidden min-w-max cursor-pointer'>
              <FaSearch onClick={handleSubmit} />
            </div>
          </div>
          <input
            type='search'
            placeholder='Search...'
            className='active:outline-none focus:outline-none min-w-10'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            value={searchQuery}
          />
        </div>
      </div>

      <div>
        {filteredItems.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </>
  );
}

export default SearchBarComponent;
