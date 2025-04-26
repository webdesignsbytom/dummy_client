import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  GET_ALL_CALLBACK_FROMS_API,
  DELETE_CALLBACK_FORM_API,
  DELETE_ALL_CALLBACK_FORM_API,
} from '../../../utils/ApiRoutes';

function CallbackFormAdminPageMainContainer() {
  const [callbackForms, setCallbackForms] = useState([]);

  useEffect(() => {
    fetchCallbackForms();
  }, []);

  const fetchCallbackForms = () => {
    client
      .get(GET_ALL_CALLBACK_FROMS_API, false)
      .then((res) => {
        if (res?.data?.callbackForms) {
          setCallbackForms(res.data.callbackForms);
        } else {
          console.error('No callback forms found');
        }
      })
      .catch((err) => {
        console.error('Unable to retrieve callback form data', err);
      });
  };

  const handleDelete = async (id) => {
    client
      .delete(`${DELETE_CALLBACK_FORM_API}/${id}`, false)
      .then(() => {
        setCallbackForms((prev) => prev.filter((form) => form.id !== id));
      })
      .catch((err) => {
        console.error('Failed to delete callback form', err);
      });
  };

  const handleDeleteAll = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete all callback forms? This cannot be undone.'
      )
    ) {
      return;
    }

    client
      .delete(DELETE_ALL_CALLBACK_FORM_API, false)
      .then(() => {
        setCallbackForms([]);
      })
      .catch((err) => {
        console.error('Failed to delete all callback forms', err);
      });
  };

  return (
    <main role="main" className="grid w-full h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Callback Forms</h1>
        {callbackForms.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete All
          </button>
        )}
      </div>

      {callbackForms.length === 0 ? (
        <p>No callback forms found.</p>
      ) : (
        <div className="grid gap-4">
          {callbackForms.map((form) => (
            <div
              key={form.id}
              className="border p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Name:</strong> {form.fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {form.phoneNumber}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Submitted:</strong>{' '}
                  {new Date(form.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(form.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default CallbackFormAdminPageMainContainer;
