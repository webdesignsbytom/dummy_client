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

    if (!start || !end) return <div>No available times for this day.</div>;

    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const availableTimes = [];

    for (let i = startHour; i <= endHour; i++) {
      const time = `${i < 10 ? '0' + i : i}:00`;
      availableTimes.push(time);
    }

    return (
      <section className='absolute w-full bg-gray-100'>
        <div>
          <div className='grid justify-between items-center grid-flow-col py-1 bg-blue-400 px-2'>
            <div>
              <h3>Available Times:</h3>
            </div>
            <div>
              <button
                className='my-auto flex items-center'
                onClick={closeDaySelection}
              >
                <GrFormClose />
              </button>
            </div>
          </div>
          <ul>
            {availableTimes.map((time) => (
              <li
                key={time}
                onClick={() => setTimeSelected(time)}
                className={`py-1 cursor-pointer hover:bg-gray-200 text-center`}
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
    <section className='relative'>
      {/* Time selector */}
      {showBookingTimes && renderAvailableTimes()}

      {/* Days */}
      <div className='grid grid-cols-7 gap-2 border-t border-l w-fit mx-auto'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            className='text-center font-semibold p-2 border-b border-r bg-gray-100'
          >
            {d}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className='border-b border-r' />;
          }

          // Get the day of the week for this date
          const date = new Date(year, month, day);
          const dayName = date.toLocaleString('default', {
            weekday: 'long',
          });

          // Check if this day is open
          const isOpen = openingTimes[dayName]?.open;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!isOpen}
              className={`h-16 max-h-16 max-w-20 border-b border-r flex items-center justify-center
              ${
                isOpen
                  ? selectedDay === day
                    ? 'bg-red-500 text-white' // selected and open → red
                    : 'bg-blue-400 hover:bg-blue-500 text-white' // open but not selected
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
