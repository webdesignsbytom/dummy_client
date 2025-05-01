import React, { useState, useEffect, useRef } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  CANCEL_BOOKING_API,
  CONFIRM_BOOKING_API,
  DELETE_BOOKING_API,
  DENY_BOOKING_API,
  GET_BOOKING_ADMIN_API,
} from '../../../utils/ApiRoutes';
// Utils
import { filteredBookings } from '../../../utils/functions/BookingFunctions';
// Components
import LoadingSpinner from '../../utils/LoadingSpinner';
import BookingOpeningTimes from './BookingOpeningTimes';
import BookingAdminFilter from '../../utils/BookingAdminFilter';
import BookingItem from './BookingItem';

function BookingAdminPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();
  console.log('bookings', bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Confirm states
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);
  const [isDenyingBooking, setIsDenyingBooking] = useState(false);
  const [isCancellingBooking, setIsCancellingBooking] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);

  useEffect(() => {
    client
      .get(GET_BOOKING_ADMIN_API)
      .then((res) => {
        setBookings(res.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setLoading(false);
      });
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
        setIsConfirmingBooking(false);
        setIsCancellingBooking(false);
        setIsEditingBooking(false);
        setIsDeletingBooking(false);
        setIsDenyingBooking(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const toggleConfirmBooking = () => {
    setIsConfirmingBooking(true);
  };

  // Confirm a booking
  const confirmBookingHandler = async (bookingId) => {
    setIsSubmitting(true);
    client
      .patch(`${CONFIRM_BOOKING_API}/${bookingId}`, null, false)
      .then((res) => {
        console.log(res.data.message);
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, bookingApproved: true }
              : booking
          )
        );
        setIsConfirmingBooking(false);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsConfirmingBooking(false);
        setIsSubmitting(false);
      });
    setOpenMenuId(null);
  };

  const toggleDenyBooking = () => {
    setIsDenyingBooking(true);
  };

  // Deny a booking
  const denyBookingHandler = async (bookingId) => {
    setIsSubmitting(true);
    client
      .patch(`${DENY_BOOKING_API}/${bookingId}`, null, false)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, denied: true } : booking
          )
        );
        setIsDenyingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsDenyingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      });
  };

  const toggleCancelBooking = () => {
    setIsCancellingBooking(true);
  };

  // Cancel a booking
  const cancelBookingHandler = async (bookingId) => {
    setIsSubmitting(true);
    client
      .patch(`${CANCEL_BOOKING_API}/${bookingId}`, null, false)
      .then((res) => {
        console.log(res.data.message);
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, cancelled: true } : booking
          )
        );
        setIsCancellingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsCancellingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      });
  };

  const toggleDeleteBooking = () => {
    setIsDeletingBooking(true);
  };

  // Delete a booking
  const deleteBookingHandler = async (bookingId) => {
    setIsSubmitting(true);
    client
      .delete(`${DELETE_BOOKING_API}/${bookingId}`, false)
      .then((res) => {
        console.log(res.data.message);
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        setIsDeletingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      })
      .catch((err) => {
        console.error('Unable to delete booking data', err);
        setIsDeletingBooking(false);
        setIsSubmitting(false);
        setOpenMenuId(null);
      });
  };

  const toggleEditBooking = () => {
    setIsEditingBooking(true);
  };

  const editBookingHandler = (bookingId) => {
    console.log('Edit booking with ID:', bookingId);
    setIsEditingBooking(false);
  };

  const toggleMenu = (bookingId) => {
    setOpenMenuId(openMenuId === bookingId ? null : bookingId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedBooking({
      ...selectedBooking,
      [name]: value,
    });
  };

  return (
    <main role='main' className='grid gap-y-16 pb-16 h-full w-full'>
      {/* Times */}
      <BookingOpeningTimes />

      {/* Requests */}
      <section className='grid w-full'>
        <div className='grid grid-rows-reg gap-y-4 w-full px-8 lg:container lg:mx-auto bg-colour5 py-2'>
          {/* Booking filter */}
          <BookingAdminFilter
            handleFilterChange={handleFilterChange}
            filter={filter}
          />

          {/* Bookings */}
          <section className='grid h-full w-full bg-colour1'>
            {filteredBookings(bookings, filter).length === 0 ? (
              <div className='grid items-center justify-center'>
                <p>No bookings found for the selected filter.</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {filteredBookings(bookings, filter).map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={booking}
                    isCancellingBooking={isCancellingBooking}
                    isConfirmingBooking={isConfirmingBooking}
                    isDeletingBooking={isDeletingBooking}
                    isDenyingBooking={isDenyingBooking}
                    isEditingBooking={isEditingBooking}
                    handleChange={handleChange}
                    menuRef={menuRef}
                    openMenuId={openMenuId}
                    toggleMenu={toggleMenu}
                    confirmBookingHandler={confirmBookingHandler}
                    toggleConfirmBooking={toggleConfirmBooking}
                    isSubmitting={isSubmitting}
                    denyBookingHandler={denyBookingHandler}
                    toggleDenyBooking={toggleDenyBooking}
                    cancelBookingHandler={cancelBookingHandler}
                    toggleCancelBooking={toggleCancelBooking}
                    deleteBookingHandler={deleteBookingHandler}
                    toggleDeleteBooking={toggleDeleteBooking}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default BookingAdminPageMainContainer;
