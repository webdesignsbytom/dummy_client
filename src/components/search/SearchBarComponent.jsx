import React, { useState, useMemo } from 'react';
// Icons
import { FaSearch } from 'react-icons/fa';

const searchTerms = ['hello', 'world', 'cat', 'book', 'cheese'];

function SearchBarComponent() {
  const [items, setItems] = useState(searchTerms);
  const [searchResults, setSearchResults] = useState([]); // Ensure this is an array
  const [searchQuery, setSearchQuery] = useState('');

  console.log('searchQuery', searchQuery);

  // Fix: Proper filtering
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Fix: Update searchResults properly
  const handleSearch = () => {
    setSearchResults(filteredItems); // Set filtered items as searchResults
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSubmit = () => {
    if (searchQuery === '') return;
    handleSearch();
    console.log('Search submitted with query: ', searchQuery);
  };

  return (
    <>
      <section className='grid bg-colour4'>
      <div className='grid px-2 py-2'>
        <div className='bg-colour1 grid grid-cols-reg max-w-xl p-1 rounded-lg shadow-xl gap-1'>
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
      </section>
      {/* <div>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => <div key={index}>{item}</div>)
        ) : (
          <p>No results found</p>
        )}
      </div> */}
    </>
  );
}

export default SearchBarComponent;
