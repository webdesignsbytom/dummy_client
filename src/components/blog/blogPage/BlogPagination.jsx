import React from 'react';

const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
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
    <div className='flex justify-center items-center mt-8 lg:mt-16'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50'
      >
        Previous
      </button>
      <span className='mx-4'>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};

export default BlogPagination;
