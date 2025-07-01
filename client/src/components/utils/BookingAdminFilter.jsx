import React from 'react';

function BookingAdminFilter({ handleFilterChange, filter }) {
  return (
    <section className='grid grid-flow-col justify-between items-center py-4 px-4 bg-colour3 h-fit'>
      <label>Filter by:</label>
      <select onChange={handleFilterChange} value={filter}>
        <option value='all'>All Bookings</option>
        <option value='day'>Today</option>
        <option value='week'>This Week</option>
        <option value='month'>This Month</option>
        <option value='cancelled'>Cancelled</option>
        <option value='denied'>Denied</option>
        <option value='unconfirmed'>Unconfirmed</option>
      </select>
    </section>
  );
}

export default BookingAdminFilter;
