import React from 'react';

function WarningModal({ onClose, onConfirm, header, message }) {
  return (
    <div className='fixed inset-0 z-50 bg-colour2 bg-opacity-40 flex items-center justify-center px-8'>
      <div className='bg-colour1 rounded-2xl shadow-lg w-full max-w-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>{header}</h2>
        <p className='text-colour7 mb-6'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-green-600 text-colour1 rounded hover:bg-green-700'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
