import React from 'react';

const BlogPaginationCircleButtons = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='grid grid-cols-3 justify-center items-center gap-4 mt-8 lg:mt-16 w-fit'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='w-[32px] h-[32px] bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer hover:brightness-90'
      ></button>
      <div className='w-[32px] h-[32px] bg-gray-200 rounded-full grid items-center justify-center'>
        <span className='font-semibold'>{`${currentPage}`}</span>
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='w-[32px] h-[32px] bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer hover:brightness-90'
      ></button>
    </div>
  );
};

export default BlogPaginationCircleButtons;
