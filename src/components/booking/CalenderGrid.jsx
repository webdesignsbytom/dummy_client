import React from 'react';
// Icons
import { GrFormClose } from 'react-icons/gr';

function CalenderGrid({
  showBookingTimes,
  selectedDay,
  calendarDays,
  year,
  month,
  openingTimes,
  handleDayClick,
  closeDaySelection,
  setTimeSelected,
}) {
  const renderAvailableTimes = () => {
    if (!selectedDay) return null;

    const selectedDate = new Date(year, month, selectedDay);
    const dayName = selectedDate.toLocaleString('default', { weekday: 'long' });
    const { start, end } = openingTimes[dayName];

    if (!start || !end)
      return <div role='status'>No available times for this day.</div>;

    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const availableTimes = [];

    for (let i = startHour; i <= endHour; i++) {
      const time = `${i < 10 ? '0' + i : i}:00`;
      availableTimes.push(time);
    }

    return (
      <section
        className='absolute w-full bg-gray-100'
        aria-labelledby='available-times-heading'
      >
        <div>
          <div className='grid justify-between items-center grid-flow-col py-1 bg-blue-400 px-2'>
            <h3
              id='available-times-heading'
              className='text-white text-lg font-semibold'
            >
              Available Times
            </h3>
            <button
              className='my-auto flex items-center'
              onClick={closeDaySelection}
              aria-label='Close available times selection'
            >
              <GrFormClose />
            </button>
          </div>
          <ul
            aria-label={`Available booking times for ${selectedDate.toDateString()}`}
          >
            {availableTimes.map((time) => (
              <li
                key={time}
                onClick={() => setTimeSelected(time)}
                className='py-1 cursor-pointer hover:bg-gray-200 text-center'
                role='button'
                tabIndex='0'
                aria-pressed='false'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setTimeSelected(time);
                }}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  return (
    <section className='relative' aria-label='Booking calendar'>
      {showBookingTimes && renderAvailableTimes()}

      <div
        className='grid grid-cols-7 gap-2 border-t border-l w-fit mx-auto'
        role='grid'
        aria-labelledby='calendar-grid-heading'
      >
        <h2 id='calendar-grid-heading' className='sr-only'>
          Select a booking day
        </h2>

        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            className='text-center font-semibold p-2 border-b border-r bg-gray-100'
            role='columnheader'
          >
            {d}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) {
            return (
              <div key={index} className='border-b border-r' role='gridcell' />
            );
          }

          const date = new Date(year, month, day);
          const dayName = date.toLocaleString('default', { weekday: 'long' });
          const isOpen = openingTimes[dayName]?.open;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPast = date < today;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!isOpen || isPast}
              className={`h-16 max-h-16 max-w-20 border-b border-r flex items-center justify-center
              ${
                !isOpen || isPast
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : selectedDay === day
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-400 hover:bg-blue-500 text-white'
              }`}
              role='gridcell'
              aria-selected={selectedDay === day}
              aria-label={`${dayName}, ${day}, ${
                !isOpen || isPast ? 'unavailable' : 'available'
              }`}
            >
              <span>{day}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalenderGrid;
