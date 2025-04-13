import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import BookingAdminPageMainContainer from '../../components/booking/admin/BookingAdminPageMainContainer';
import Navbar from '../../components/nav/Navbar';

function BookingAdminPage() {
  return (
    <>
      {/* Page */}
      <div className='grid min-h-screen bg-colour1 font-poppins overflow-hidden'>
        <div className='grid w-full'>
          {/* Navigation */}
          <Navbar />

          {/* Header */}
          <header className='grid w-full'>
            <div className='grid w-full px-8 lg:container lg:mx-auto'>
              <article className='grid text-center'>
                <h1>{CompanyName} - Booking Admin</h1>
              </article>
            </div>
          </header>

          {/* Main */}
          <BookingAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default BookingAdminPage;
