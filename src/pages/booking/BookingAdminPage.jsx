import React from 'react';
// Constants
import {
  CompanyName,
} from '../../utils/Constants';
// Components
import BookingAdminPageMainContainer from '../../components/booking/admin/BookingAdminPageMainContainer';

function BookingAdminPage() {

  return (
    <>
      {/* Page */}
      <div className='grid min-h-screen bg-colour1 font-poppins overflow-hidden'>
        <div className='grid w-full'>
          {/* Header */}
          <header className='grid w-full'>
            <h1>{CompanyName} - Booking Admin</h1>
          </header>

          {/* Main */}
          <BookingAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default BookingAdminPage;
