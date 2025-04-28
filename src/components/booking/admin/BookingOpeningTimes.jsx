import React, { useState } from 'react';
// Context
import { useBooking } from '../../../context/BookingContext';
import client from '../../../api/client';
import { EDIT_OPENING_TIMES_API } from '../../../utils/ApiRoutes';

const daysOfWeek = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

function BookingOpeningTimes() {
  const { openingTimes, setOpeningTimes } = useBooking();

  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({
    daysOfWeek: 1,
    open: true,
    start: '',
    end: '',
  });

  const handleEditClick = (day) => {
    console.log('day', day);
    const dayData = openingTimes[day];
    setFormData({
      daysOfWeek: dayData.dayOfWeek,
      open: dayData.open,
      start: dayData.start || '',
      end: dayData.end || '',
    });
    setEditingDay(day);
  };

  const handleSave = async () => {
    client
      .patch(EDIT_OPENING_TIMES_API, formData, false)
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((err) => {
        console.error('Edit opeings times failed', err);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <section className='grid w-full'>
      <div className='grid h-fit gap-y-2 w-full lg:container lg:mx-auto px-8 lg:px-24'>
        {Object.values(openingTimes).map((time) => (
          <div
            key={time.dayOfWeek}
            className='border bg-colour4 py-1 px-4 rounded flex justify-between items-center'
          >
            {console.log('time', time)}
            <div className='grid grid-flow-col gap-x-8'>
              <div className='font-semibold'>{daysOfWeek[time.dayOfWeek]}</div>
              {console.log('time.dayOfWeek', time.dayOfWeek)}

              {editingDay === time.dayOfWeek ? (
                <div className='mt-2 space-y-2'>
                  <div>
                    <label className='flex items-center'>
                      <span className='w-16'>Open:</span>
                      <input
                        type='checkbox'
                        name='open'
                        checked={formData.open}
                        onChange={handleChange}
                        className='ml-2'
                      />
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <span className='w-16'>Start:</span>
                    <input
                      type='time'
                      name='start'
                      value={formData.start}
                      onChange={handleChange}
                      className='ml-2 border rounded px-2 py-1'
                      disabled={!formData.open}
                    />
                  </div>
                  <div className='flex items-center'>
                    <span className='w-16'>End:</span>
                    <input
                      type='time'
                      name='end'
                      value={formData.end}
                      onChange={handleChange}
                      className='ml-2 border rounded px-2 py-1'
                      disabled={!formData.open}
                    />
                  </div>
                  <div className='flex space-x-2 mt-2'>
                    <button
                      onClick={handleSave}
                      className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDay(null)}
                      className='bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className='text-gray-600 bg-blue-200 mt-1'>
                  {time.open ? `${time.start} - ${time.end}` : 'Closed'}
                </div>
              )}
            </div>

            {editingDay !== time.dayOfWeek && (
              <button
                onClick={() => handleEditClick(time.dayOfWeek)}
                className='text-blue-500 underline hover:text-blue-700'
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookingOpeningTimes;
