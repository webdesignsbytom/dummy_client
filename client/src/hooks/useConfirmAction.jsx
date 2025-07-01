import { useState } from 'react';

function useConfirmAction() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });

  const confirmAction = ({ action, header, message }) => {
    console.log('BBBBBBBB');
    setPendingAction(() => action);
    setModalContent({ header, message });
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (pendingAction) pendingAction();
    setModalOpen(false);
  };

  return {
    confirmAction,
    modalOpen,
    modalContent,
    handleModalConfirm,
    setModalOpen,
  };
}

export default useConfirmAction;
