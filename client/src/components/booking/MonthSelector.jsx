import React from 'react'
// Icons
import {
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
  } from 'react-icons/hi';

function MonthSelector({ handlePrevMonth, isPrevDisabled, previousMonth, toggleMonthList, displayMonth, year, showMonthList, handleSelectMonth, handleNextMonth, month, nextMonth }) {
  return (
    <section className='grid grid-cols-a1a gap-x-1 items-center'>
    {/* Back month */}
    <div>
      <button
        onClick={handlePrevMonth}
        disabled={isPrevDisabled}
        className={`flex items-center gap-1 p-2 rounded ${
          isPrevDisabled
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:bg-gray-200'
        }`}
      >
        <HiOutlineChevronDoubleLeft />
        <span>{previousMonth}</span>
      </button>
    </div>

    {/* Current Month */}
    <div className='relative text-xl font-bold my-4 text-center'>
      <button
        onClick={toggleMonthList}
        className='focus:outline-none'
      >
        {displayMonth} <span className='pl-2'>{year}</span>
      </button>

      {/* Month list */}
      {showMonthList && (
        <div className='absolute left-1/2 -translate-x-1/2 mt-2 min-w-60 bg-white border rounded shadow grid lg:grid-cols-3 gap-2 p-2 z-10'>
          {Array.from({ length: 12 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleSelectMonth(i)}
              className={`p-2 rounded hover:bg-gray-200 ${
                i === month ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {new Date(year, i, 1).toLocaleString('default', {
                month: 'short',
              })}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Next month */}
    <div className='text-right'>
      <button
        onClick={handleNextMonth}
        className='flex items-center gap-1 p-2 rounded hover:bg-gray-200'
      >
        <span>{nextMonth}</span>
        <HiOutlineChevronDoubleRight />
      </button>
    </div>
  </section>
  )
}

export default MonthSelector