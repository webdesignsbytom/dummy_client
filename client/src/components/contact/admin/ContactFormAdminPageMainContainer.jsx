import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  GET_ALL_CONTACT_FROMS_API,
  DELETE_CONTACT_FORM_API,
  DELETE_ALL_CONTACT_FORM_API,
} from '../../../utils/ApiRoutes';
import { CompanyName } from '../../../utils/Constants';
// Components
import ConfirmModal from '../../modals/ConfirmModal';
import ContactFormItem from './ContactFormItem';

function ContactFormAdminPageMainContainer() {
  const [contactForms, setContactForms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = () => {
    client
      .get(GET_ALL_CONTACT_FROMS_API, false)
      .then((res) => {
        if (res?.data?.contactForms) {
          setContactForms(res.data.contactForms);
        } else {
          console.error('No contact forms found');
        }
      })
      .catch((err) => {
        console.error('Unable to retrieve contact form data', err);
      });
  };

  const confirmAction = ({ action, header, message }) => {
    setPendingAction(() => action);
    setModalContent({ header, message });
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (pendingAction) pendingAction();
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    confirmAction({
      header: 'Delete Contact Form',
      message: 'Are you sure you want to delete this contact form?',
      action: () => {
        client
          .delete(`${DELETE_CONTACT_FORM_API}/${id}`, false)
          .then(() => {
            setContactForms((prev) => prev.filter((form) => form.id !== id));
          })
          .catch((err) => {
            console.error('Failed to delete contact form', err);
          });
      },
    });
  };

  const handleDeleteAll = () => {
    confirmAction({
      header: 'Delete All Contact Forms',
      message:
        'Are you sure you want to delete all contact forms? This cannot be undone.',
      action: () => {
        client
          .delete(DELETE_ALL_CONTACT_FORM_API, false)
          .then(() => {
            setContactForms([]);
          })
          .catch((err) => {
            console.error('Failed to delete all contact forms', err);
          });
      },
    });
  };

  return (
    <main role='main' className='grid w-full h-full' aria-label='Admin contact form page'>
      <section className='grid w-full'>
        <div className='grid grid-rows-reg gap-y-4 w-full px-8 py-8 lg:container lg:mx-auto'>
          
          {/* Header */}
          <section
            className='grid w-full bg-colour5 px-2 md:px-4 lg:px-6 py-2'
            aria-label='Contact form admin header'
          >
            <div className='grid grid-flow-col items-center justify-between'>
              <h1 className='sm:text-lg md:text-xl lg:text-2xl font-bold'>
                Contact Forms
              </h1>
              {contactForms.length > 0 && (
                <>
                  <button
                    onClick={handleDeleteAll}
                    className='bg-red-500 hover:bg-red-700 text-colour1 font-bold py-2 px-4 rounded'
                    aria-describedby='delete-all-description'
                  >
                    Delete All
                  </button>
                  <span id='delete-all-description' className='sr-only'>
                    Deletes all stored contact form submissions permanently
                  </span>
                </>
              )}
            </div>
          </section>

          {/* Contact forms */}
          <section className='grid w-full p-1'  aria-label={`List of submitted contact forms for ${CompanyName}`}>
            {contactForms.length === 0 ? (
              <section
                className='grid items-center justify-center h-full w-full'
                role='status'
                aria-live='polite'
              >
                <p>No contact forms found.</p>
              </section>
            ) : (
              <ul className='grid gap-y-2'>
                {contactForms.map((form, index) => (
                  <li key={form.id}>
                    <ContactFormItem
                      id={index}
                      form={form}
                      handleDelete={handleDelete}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </section>

      {/* Confirm Modal */}
      {modalOpen && (
        <ConfirmModal
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
          header={modalContent.header}
          message={modalContent.message}
        />
      )}
    </main>
  );
}

export default ContactFormAdminPageMainContainer;
