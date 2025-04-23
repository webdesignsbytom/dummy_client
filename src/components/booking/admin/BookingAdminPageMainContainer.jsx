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

function BookingAdminPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();

  const [selectedBooking, setSelectedBooking] = useState(null);

  // Confirm states
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);
  const [isDenyingBooking, setIsDenyingBooking] = useState(false);
  const [isCancellingBooking, setIsCancellingBooking] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);

  console.log('bookings', bookings);

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
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsDenyingBooking(false);
        setIsSubmitting(false);
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
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setIsCancellingBooking(false);
        setIsSubmitting(false);
      });
  };

  const toggleDeleteBooking = () => {
    setIsDeletingBooking(true);
  };

  // Delete a booking
  const deleteBookingHandler = async (bookingId) => {
    setIsSubmitting(true);
    client.delete(`${DELETE_BOOKING_API}/${bookingId}`, false).then((res) => {
      console.log(res.data.message);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      setIsDeletingBooking(false);
      setIsSubmitting(false);
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
    <main role='main' className='grid h-full w-full'>
      <section className='grid w-full'>
        <div className='grid grid-rows-reg gap-y-4 w-full px-8 lg:container lg:mx-auto bg-colour5 py-2'>
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

          {/* Bookings */}
          <section className='grid h-full w-full bg-colour1'>
            {filteredBookings(bookings, filter).length === 0 ? (
              <div className='grid items-center justify-center'>
                <p>No bookings found for the selected filter.</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {filteredBookings(bookings, filter).map((booking) => (
                  <div
                    key={booking.id}
                    className='grid grid-cols-rev gap-2 p-4 items-center border rounded bg-colour1 shadow'
                  >
                    {/* Data */}
                    <section className='grid lg:grid-flow-col'>
                      <div className='grid w-fit'>
                        <strong>Date:</strong>
                        {isEditingBooking ? (
                          <input
                            type='date'
                            value={
                              new Date(booking.date).toISOString().split('T')[0]
                            }
                            onChange={(e) => handleChange(e.target.value)}
                            className='border rounded p-1 ml-2'
                          />
                        ) : (
                          <p className='text-sm w-fit'>
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {isEditingBooking ? (
                        <div>
                          <strong>Time:</strong>
                          <select
                            value={booking.time}
                            onChange={(e) =>
                              handleChange(parseInt(e.target.value))
                            }
                            className='border rounded p-1 ml-2'
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={i}>
                                {i < 10 ? `0${i}:00` : `${i}:00`}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <strong>Time:</strong>
                          <p className='text-sm'>{booking.time}:00</p>
                        </div>
                      )}

                      <div>
                        <strong>Name:</strong>
                        <p className='text-sm'>{booking.fullName}</p>
                      </div>
                      <div className='grid w-full'>
                        <strong>Email:</strong>
                        <p className='text-sm'>
                          <a href={`mailto:${booking.email}`}>
                            {booking.email}
                          </a>
                        </p>
                      </div>
                      <div className='grid w-full'>
                        <strong>Phone:</strong>
                        <a href={`tel:${booking.phoneNumber}`}>
                          {booking.phoneNumber}
                        </a>
                      </div>
                      <div>
                        <strong>Status:</strong>
                        <p
                          className={`text-sm ${
                            booking.cancelled
                              ? 'text-red-600 font-semibold'
                              : booking.denied
                              ? 'text-yellow-500 font-semibold'
                              : booking.bookingApproved
                              ? 'text-green-600 font-semibold'
                              : 'text-blue-600 font-semibold'
                          }`}
                        >
                          {booking.cancelled
                            ? 'Cancelled'
                            : booking.denied
                            ? 'Denied'
                            : booking.bookingApproved
                            ? 'Confirmed'
                            : 'Unconfirmed'}
                        </p>
                      </div>
                    </section>

                    {/* Settings button */}
                    <section
                      ref={menuRef}
                      className='relative grid items-center w-fit'
                    >
                      <button
                        onClick={() => toggleMenu(booking.id)}
                        className='text-gray-600 hover:text-black rounded-full shadow-md h-8 w-8'
                      >
                        &#8942;
                      </button>
                      {openMenuId === booking.id && (
                        <div
                          ref={menuRef}
                          className='absolute right-0 items-center mt-2 w-40 bg-white border rounded shadow z-10'
                        >
                          <ul className='flex flex-col text-sm'>
                            {!booking.bookingApproved && !booking.cancelled && (
                              <li>
                                <button
                                  onClick={() => {
                                    if (isConfirmingBooking) {
                                      confirmBookingHandler(booking.id);
                                    } else {
                                      toggleConfirmBooking();
                                    }
                                  }}
                                  className={`block ${
                                    isConfirmingBooking ? 'bg-red-500' : ''
                                  } w-full flex justify-center px-4 py-2 text-left hover:bg-green-100`}
                                >
                                  {isSubmitting ? (
                                    <LoadingSpinner xs={true} />
                                  ) : isConfirmingBooking ? (
                                    'Confirm!'
                                  ) : (
                                    'Confirm'
                                  )}
                                </button>
                              </li>
                            )}

                            {!booking.denied &&
                              !booking.bookingApproved &&
                              !booking.cancelled && (
                                <li>
                                  <button
                                    onClick={() => {
                                      if (isDenyingBooking) {
                                        denyBookingHandler(booking.id);
                                      } else {
                                        toggleDenyBooking();
                                      }
                                    }}
                                    className={`block ${
                                      isDenyingBooking ? 'bg-red-500' : ''
                                    } w-full flex justify-center px-4 py-2 text-left hover:bg-orange-100`}
                                  >
                                    {isSubmitting ? (
                                      <LoadingSpinner xs={true} />
                                    ) : isDenyingBooking ? (
                                      'Confirm!'
                                    ) : (
                                      'Deny'
                                    )}
                                  </button>
                                </li>
                              )}

                            {!booking.cancelled && booking.bookingApproved && (
                              <li>
                                <button
                                  onClick={() => {
                                    if (isCancellingBooking) {
                                      cancelBookingHandler(booking.id);
                                    } else {
                                      toggleCancelBooking();
                                    }
                                  }}
                                  className={`block ${
                                    isCancellingBooking ? 'bg-red-500' : ''
                                  } w-full flex justify-center px-4 py-2 text-left hover:bg-yellow-100`}
                                >
                                  {isSubmitting ? (
                                    <LoadingSpinner xs={true} />
                                  ) : isCancellingBooking ? (
                                    'Confirm!'
                                  ) : (
                                    'Cancel'
                                  )}
                                </button>
                              </li>
                            )}

                            {/* <li>
                              <button
                                onClick={() => {
                                  if (isEditingBooking) {
                                    editBookingHandler(booking.id);
                                  } else {
                                    toggleEditBooking();
                                  }
                                }}
                                className={`block ${
                                  isEditingBooking ? 'bg-red-500' : ''
                                } w-full flex justify-center px-4 py-2 text-left hover:bg-red-300`}
                              >
                                {isSubmitting ? (
                                  <LoadingSpinner xs={true} />
                                ) : isEditingBooking ? (
                                  'Confirm!'
                                ) : (
                                  'Edit'
                                )}
                              </button>
                            </li> */}

                            <li>
                              <button
                                onClick={() => {
                                  if (isDeletingBooking) {
                                    deleteBookingHandler(booking.id);
                                  } else {
                                    toggleDeleteBooking();
                                  }
                                }}
                                className={`block ${
                                  isDeletingBooking ? 'bg-red-500' : ''
                                } w-full flex justify-center px-4 py-2 text-left hover:bg-red-300`}
                              >
                                {isSubmitting ? (
                                  <LoadingSpinner xs={true} />
                                ) : isDeletingBooking ? (
                                  'Confirm!'
                                ) : (
                                  'Delete'
                                )}
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
