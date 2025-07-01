import React from 'react';
// Components
import LoadingSpinner from '../../utils/LoadingSpinner';

function BookingItem({
  booking,
  isCancellingBooking,
  isConfirmingBooking,
  isDeletingBooking,
  isDenyingBooking,
  isEditingBooking,
  handleChange,
  menuRef,
  openMenuId,
  toggleMenu,
  confirmBookingHandler,
  toggleConfirmBooking,
  isSubmitting,
  denyBookingHandler,
  toggleDenyBooking,
  cancelBookingHandler,
  toggleCancelBooking,
  deleteBookingHandler,
  toggleDeleteBooking,
}) {
  return (
    <div
      className='grid grid-cols-rev gap-2 p-4 items-center border rounded bg-colour1 shadow'
    >
      {/* Data */}
      <section className='grid lg:grid-flow-col'>
        <div className='grid w-fit'>
          <strong>Date:</strong>
          {isEditingBooking ? (
            <input
              type='date'
              value={new Date(booking.date).toISOString().split('T')[0]}
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
              onChange={(e) => handleChange(parseInt(e.target.value))}
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
            <a href={`mailto:${booking.email}`}>{booking.email}</a>
          </p>
        </div>
        <div className='grid w-full'>
          <strong>Phone:</strong>
          <a href={`tel:${booking.phoneNumber}`}>{booking.phoneNumber}</a>
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
      <section ref={menuRef} className='relative grid items-center w-fit'>
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
  );
}

export default BookingItem;
