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
} from '../../../utils/Constants';

function BookingAdminPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();

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

  const isSameWeek = (date1, date2) => {
    const startOfWeek = new Date(date2);
    startOfWeek.setDate(date2.getDate() - date2.getDay());
    const endOfWeek = new Date(date2);
    endOfWeek.setDate(date2.getDate() + (6 - date2.getDay()));
    return date1 >= startOfWeek && date1 <= endOfWeek;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'cancelled' && booking.cancelled) return true;
    if (filter === 'denied' && booking.denied) return true;
    if (filter === 'unconfirmed' && !booking.bookingApproved) return true;

    const bookingDate = new Date(booking.date);
    const today = new Date();

    if (filter === 'day' && bookingDate.toDateString() === today.toDateString())
      return true;
    if (filter === 'week' && isSameWeek(bookingDate, today)) return true;
    if (
      filter === 'month' &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    )
      return true;

    return false;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const toggleConfirmBooking = () => {
    setIsConfirmingBooking(true);
  };

  // Confirm a booking
  const confirmBookingHandler = async (bookingId) => {
    client
      .patch(`${CONFIRM_BOOKING_API}/${bookingId}`)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, bookingApproved: true }
              : booking
          )
        );
        setIsConfirmingBooking(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsConfirmingBooking(false);
      });
  };

  const toggleDenyBooking = () => {
    setIsDenyingBooking(true);
  };

  // Deny a booking
  const denyBookingHandler = async (bookingId) => {
    client
      .patch(`${DENY_BOOKING_API}/${bookingId}`)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, denied: true } : booking
          )
        );
        setIsDenyingBooking(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsDenyingBooking(false);
      });
  };

  const toggleCancelBooking = () => {
    setIsCancellingBooking(true);
  };

  // Cancel a booking
  const cancelBookingHandler = async (bookingId) => {
    console.log('XXXXXXXXXXXX');
    client
      .patch(`${CANCEL_BOOKING_API}/${bookingId}`)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        setIsCancellingBooking(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsCancellingBooking(false);
      });
  };

  const toggleDeleteBooking = () => {
    setIsDeletingBooking(true);
  };

  // Delete a booking
  const deleteBookingHandler = async (bookingId) => {
    client
      .delete(`${DELETE_BOOKING_API}/${bookingId}`)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
        setIsDeletingBooking(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsDeletingBooking(false);
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

  return (
    <main role='main' className='grid w-full'>
      <section className='grid w-full'>
        <div className='grid w-full px-8 lg:container lg:mx-auto bg-colour5'>
          <section className='grid grid-flow-col justify-between items-center py-4'>
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

          {/* Bookings */}
          <section>
            {filteredBookings.length === 0 ? (
              <p>No bookings found for the selected filter.</p>
            ) : (
              <div className='space-y-4'>
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className='grid grid-cols-rev gap-2 p-4 items-center border rounded bg-colour1 shadow'
                  >
                    {/* Data */}
                    <section className='grid lg:grid-flow-col'>
                      <div className='grid w-fit'>
                        <strong>Date:</strong>
                        <p className='text-sm w-fit'>
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <strong>Time:</strong>
                        <p className='text-sm'>
                          {new Date(booking.time * 1000).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <strong>Name:</strong>
                        <p className='text-sm'>{booking.fullName}</p>
                      </div>
                      <div className='grid w-full'>
                        <strong>Email:</strong>
                        <p className='text-sm'>{booking.email}</p>
                      </div>
                      <div>
                        <strong>Phone:</strong>
                        <p className='text-sm'>{booking.phoneNumber}</p>
                      </div>
                      <div>
                        <strong>Status:</strong>
                        <p
                          className={`text-sm ${
                            booking.bookingApproved
                              ? booking.cancelled
                                ? 'text-red-600 font-semibold'
                                : booking.denied
                                ? 'text-yellow-500 font-semibold'
                                : 'text-green-600 font-semibold'
                              : 'text-blue-600 font-semibold'
                          }`}
                        >
                          {booking.bookingApproved
                            ? booking.cancelled
                              ? 'Cancelled'
                              : booking.denied
                              ? 'Denied'
                              : 'Confirmed'
                            : 'Unconfirmed'}
                        </p>
                      </div>
                    </section>

                    {/* Settings button */}
                    <section
                      className='relative grid items-center w-fit'
                      ref={menuRef}
                    >
                      <button
                        onClick={() => toggleMenu(booking.id)}
                        className='text-gray-600 hover:text-black rounded-full shadow-md h-8 w-8'
                      >
                        &#8942;
                      </button>
                      {openMenuId === booking.id && (
                        <div className='absolute right-0 items-center mt-2 w-40 bg-white border rounded shadow z-10'>
                          <ul className='flex flex-col text-sm'>
                            {!booking.bookingApproved && (
                              <li>
                                <button
                                  onClick={
                                    isConfirmingBooking
                                      ? () => confirmBookingHandler(booking.id)
                                      : toggleConfirmBooking()
                                  }
                                  className={`block ${
                                    isConfirmingBooking ? 'bg-red-500' : ''
                                  } w-full px-4 py-2 text-left hover:bg-green-100`}
                                >
                                  {isConfirmingBooking ? 'Confirm!' : 'Confirm'}
                                </button>
                              </li>
                            )}
                            {!booking.denied && !booking.bookingApproved && (
                              <li>
                                <button
                                  onClick={
                                    isDenyingBooking
                                      ? () => denyBookingHandler(booking.id)
                                      : toggleDenyBooking()
                                  }
                                  className={`block ${
                                    isDenyingBooking ? 'bg-blue-500' : ''
                                  } w-full px-4 py-2 text-left hover:bg-orange-100`}
                                >
                                  {isDenyingBooking ? 'Confirm!' : 'Deny'}
                                </button>
                              </li>
                            )}
                            {!booking.cancelled && (
                              <li>
                                <button
                                  onClick={
                                    isCancellingBooking
                                      ? () => cancelBookingHandler(booking.id)
                                      : toggleCancelBooking()
                                  }
                                  className={`block ${
                                    isCancellingBooking ? 'bg-yellow-500' : ''
                                  } w-full px-4 py-2 text-left hover:bg-yellow-100`}
                                >
                                  {isCancellingBooking ? 'Confirm!' : 'Cancel'}
                                </button>
                              </li>
                            )}
                            <li>
                              <button
                                onClick={
                                  isEditingBooking
                                    ? () => editBookingHandler(booking.id)
                                    : toggleEditBooking()
                                }
                                className={`block ${
                                  isEditingBooking ? 'bg-pink-500' : ''
                                } w-full px-4 py-2 text-left hover:bg-blue-100`}
                              >
                                {isEditingBooking ? 'Confirm!' : 'Edit'}
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={
                                  isDeletingBooking
                                    ? () => deleteBookingHandler(booking.id)
                                    : toggleDeleteBooking
                                }
                                className={`block ${
                                  isDeletingBooking ? 'bg-purple-500' : ''
                                } w-full px-4 py-2 text-left hover:bg-blue-100`}
                              >
                                {isDeletingBooking ? 'Confirm!' : 'Delete'}
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </section>
                  </div>
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
